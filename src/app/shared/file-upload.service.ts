import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private endpoint = 'https://5i8kyr37sg.execute-api.us-east-1.amazonaws.com/default/s3-upload'
  
  constructor(private http: HttpClient) { }

  async uploadFile(payload: any): Promise<any> {
    let response = await this.http.post(this.endpoint, payload).toPromise()
    return response
  }
}
