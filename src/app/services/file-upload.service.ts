import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlConstants } from '../commons/UrlConstants';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  createrheader() {
    return {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json'
    };
  }

  constructor(private httpClient: HttpClient) { }

  postFile(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload, fileToUpload.name);
    return this.httpClient.post(UrlConstants.BASE_SERVER+'/upload', formData,);
  }

}
