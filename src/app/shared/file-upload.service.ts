import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  endpoints = {
    s3upload: 'https://5i8kyr37sg.execute-api.us-east-1.amazonaws.com/default/s3-upload',
    presignedUrl: 'https://ea0tz0tjv8.execute-api.us-east-1.amazonaws.com/default/s3-presigned-url'
  }
  private uploadEndpoint = 'https://5i8kyr37sg.execute-api.us-east-1.amazonaws.com/default/s3-upload'

  constructor(private http: HttpClient) { }

  async getSignedUrl(filename: string) {

  }
  async uploadFileThroughLambda(payload: any, type: FileUploadType): Promise<any> {
    let endpoint = this.getEndpoint(type)
    console.log('uploading to endpoint: ', endpoint, payload)
    let response = await this.http.post(endpoint, payload).toPromise()
    return response
  }

  async uploadFileDirect(payload: any, url: string, contentType: string): Promise<any> {
    const headers = new HttpHeaders({'Content-Type': contentType})
    return await this.http.put(url, payload, {headers, reportProgress: true}).toPromise()
  }

  async getPresignedUrl(filename: string, fileType: FileUploadType, contentType: string): Promise<any> {
    const endpoint = `${this.endpoints.presignedUrl}?type=${fileType.toString()}&name=${filename}&contentType=${contentType}`
    return await this.http.get(endpoint).toPromise()
  }

  private getEndpoint(fileType: FileUploadType) {
    switch (fileType) {
      case FileUploadType.Image:
        
        break;
    
      default:
        break;
    }
    return `${this.endpoints.s3upload}?type=${fileType.toString()}`
  }
}
