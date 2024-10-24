import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  imgUrl = "https://localhost:7023/Images/"
  // imgUrl = ;
  url:string = "https://localhost:7023/api/";
  // url:string = "https://domain.com/api/"
  constructor(
    private http: HttpClient,
    private swal: SwalService
  ){}

  get(api: string, callBack: (res:any) => void){
    this.http.get(`${this.url}${api}`).subscribe({
      next: (res: any) => {
        callBack(res);
      },
      error: (err: HttpErrorResponse) => {
        if (!err.error.isSuccess) {
          console.log(err.error.errorMessages);
        }
        else{
          console.log(err);
        }
      }
    });
  }
  
  post(api: string, body:any,callBack: (res:any)=> void) {
    this.http.post(`${this.url}${api}`, body).subscribe({
      next: (res: any) => {
        callBack(res);
        this.swal.callToast(res.data, 'success');
      },
      error: (err: HttpErrorResponse) => {
        if (!err.error.isSuccess) {
          console.log(err.error.errorMessages);
          console.log(err.error.errors);
          
          this.swal.callToast(err.error.errorMessages[0], 'warning');
        }
        else{
          console.log(err);
        }
      }
    });
  }
}
