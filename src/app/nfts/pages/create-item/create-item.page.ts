import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploadService, FileUploadType } from 'src/app/shared/file-upload.service';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';

interface NFTAttribute {
  key: string
  value: string
}

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.page.html',
  styleUrls: ['./create-item.page.scss'],
})
export class CreateItemPage implements OnInit, AfterViewInit {

  itemImage
  imageSrc
  imageFile: File
  controls

  newItemForm = new FormGroup({
    image: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl(),
  })

  collections = [
    'My Fancy Collection',
    'Other Collection'
  ]

  properties: NFTAttribute[] = [
    {
      key: '',
      value: ''
    }
  ]

  constructor(
    private router: Router,
    private uploadService: FileUploadService,
    private alert: GlobalAlertService,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.controls = this.newItemForm.controls
  }

  onCollectionItemSelected() {
    this.navigateToCreateCollection()
  }

  onMediaSelected(event) {
    const reader = new FileReader()
    if (event.target && event.target.files && event.target.files.length) {
      [this.imageFile] = event.target.files
      reader.onload = () => {
        this.imageSrc = reader.result
        this.newItemForm.patchValue({
          image: reader.result
        })
      }
      reader.readAsDataURL(this.imageFile)
    }
  }

  onRemoveImage() {
    this.imageSrc = null
    this.imageFile = null
  }

  async onSubmit() {
    if (this.newItemForm.invalid) {
      // show alert
      console.log('invalid form: ', this.newItemForm)
      return
    }

    await this.createNFT()

    console.log('submitted')
  }

  navigateToCreateCollection() {
    this.router.navigate(['/market', 'create', 'collection'])
  }


  private async createNFT() {
    try {
      let uploadedUrl = await this.uploadImage()
      

      // let json = this.createPayload(response.url)
      // let metadataUri = await this.uploadMetadata(json)
      // console.log('metadata uploaded to ', metadataUri)
      // await this.mintToken(metadataUri)
    } catch (error) {
      console.log(error)
      this.alert.shwoErrorAlert('Error', error.message || error.errmsg || 'An error occured: ' + error.stack)
    }
  }

  private async uploadImage() {
    console.log('uploading image')
    if (!this.imageFile) {
      return
    }
    let presignedResult = await this.uploadService.getPresignedUrl(this.imageFile.name, FileUploadType.Image, this.imageFile.type)
    console.log('response from signing url = ', presignedResult)
    
    console.log('imagefile = ', this.imageFile)
    let uploadResult = await this.uploadService.uploadFileDirect(this.imageFile, presignedResult.url, this.imageFile.type)
    console.log('Upload result = ', uploadResult)
    return uploadResult.url
  }

  private createPayload(imageUrl: string) {
    let json = {
      name: this.newItemForm.get('name').value,
      description: this.newItemForm.get('description').value,
      image: imageUrl,
      attributes: []
    }
    return JSON.stringify(json)
  }

  private async uploadMetadata(json: any) {
    console.log('uploading metadata')
    const response = await this.uploadService.uploadFileThroughLambda(json, FileUploadType.Metadata)
    return response.url
  }

  private async mintToken(metadataUri: string) {
    console.log('minting token')
  }

}
