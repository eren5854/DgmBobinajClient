import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  callToast(message: string, icon: SweetAlertIcon = "success"){
    const Toast = Swal.mixin({
        toast: true,
        title: message,
        position: 'bottom-end',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
    });
    Toast.fire(message, '', icon)
  }
}
export type SweetAlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question'