import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export enum FileUploadType {
  Review = 'review',
  Image = 'image',
  Metadata = 'metadata'
}

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private endpoint = 'https://5i8kyr37sg.execute-api.us-east-1.amazonaws.com/default/s3-upload'
  
  endpoints = {
    reviews: '',
    images: '',
    metadata: '',
  }
  constructor(private http: HttpClient) { }

  async uploadFile(payload: any, type: FileUploadType): Promise<any> {
    let endpoint = this.getEndpoint(type)
    let response = await this.http.post(endpoint, payload).toPromise()
    return response
  }

  private getEndpoint(fileType: FileUploadType) {
    switch (fileType) {
      case FileUploadType.Image:
        return ''
      case FileUploadType.Metadata:
        return ''
      case FileUploadType.Review:
        return 'https://5i8kyr37sg.execute-api.us-east-1.amazonaws.com/default/s3-upload'
      default:
        return ''
    }
  }
}
