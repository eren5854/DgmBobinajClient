import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { from } from 'rxjs';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root'
})
export class EmailJsService {

  constructor(
    private swal: SwalService

  ) { }
  sendEmail(form: any) {
    return emailjs
    .send('service_nvawwax', 'template_f1cvh77', form, {
      publicKey: 'XMhRIDA9NRJdqCFtZ',
    })
    .then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text);
        // this.swal.callToast("Mail gönderildi", 'success');
      },
      (err) => {
        console.log('FAILED...', err);
        this.swal.callToast(err.text, 'error');
      },
    );
  }
}
