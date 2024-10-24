import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, IonList } from '@ionic/angular';
import { DescriptionModel } from '../../models/description.model';
import { HttpService } from '../../services/http.service';
import { ImageModel } from '../../models/image.model';
import { WorkDateModel } from '../../models/work-date.model';
import { InformationModel } from '../../models/information.model';
import { CommentModel } from '../../models/comment.model';
import { ContactModel } from '../../models/contact.model';
import { EmailJsService } from '../../services/email-js.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {
  isScreenSizeUnder768px = true;
  selectedCardIndex: number = 0;

  imgUrl = "";

  descriptions: DescriptionModel[] = [];
  about: DescriptionModel = new DescriptionModel();
  services: DescriptionModel[] = [];
  operations: DescriptionModel[] = [];
  operationModel0: DescriptionModel = new DescriptionModel();
  operationModel1: DescriptionModel = new DescriptionModel();
  operationModel2: DescriptionModel = new DescriptionModel();
  operationModel3: DescriptionModel = new DescriptionModel();
  operationModel4: DescriptionModel = new DescriptionModel();

  images: ImageModel[] = [];
  galleries: ImageModel[] = [];
  referances: ImageModel[] = [];
  workDates: WorkDateModel[] = [];
  informationModel: InformationModel = new InformationModel();
  comments: CommentModel[] = [];
  contactModel: ContactModel = new ContactModel();

  constructor(
    private http: HttpService,
    private emailService: EmailJsService,
  ) {
    this.getDescriptionModel();
    this.getImage();
    this.getWorkDate();
    this.getInformation();
    this.getComment();
    this.checkWindowSize();
    this.imgUrl = http.imgUrl;
  }

  selectCard(index: number) {
    this.selectedCardIndex = index; // Tıklanan kartın dizinini güncelle
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkWindowSize();
  }

  checkWindowSize(): void {
    if (window.innerWidth < 768) {
      this.isScreenSizeUnder768px = true
    } else {
      this.isScreenSizeUnder768px = false;
    }
  }

  getDescriptionModel() {
    this.http.get("DescriptionModels/GetAllByIsActive", (res) => {
      this.descriptions = res.data;

      this.descriptions.forEach((description) => {
        if (description.modelEnum === 0) {
          this.about = description;
        }
        if (description.modelEnum === 1) {
          this.services.push(description); // Veriyi services dizisine ekle
        }
        if (description.modelEnum === 2) {
          this.operations.push(description);
          // Model enum 2 olanları sırasıyla kaydet
          if (this.operations.length - 1 === 0) {
            this.operationModel0 = description;
          } else if (this.operations.length - 1 === 1) {
            this.operationModel1 = description;
          } else if (this.operations.length - 1 === 2) {
            this.operationModel2 = description;
          } else if (this.operations.length - 1 === 3) {
            this.operationModel3 = description;
          } else if (this.operations.length - 1 === 4) {
            this.operationModel4 = description;
          }
        }
      });
      console.log(this.operations);
      console.log(this.operationModel4);

    });
  }

  getImage() {
    this.http.get("Galeries/GetAllByIsActive", (res) => {
      this.images = res.data;
      this.images.forEach((image) => {
        if (image.galeryEnum === 0) {
          this.galleries.push(image);
        }
        if (image.galeryEnum === 1) {
          this.referances.push(image);
        }
      })
    });
  }

  getWorkDate() {
    this.http.get("WorkDates/GetAll", (res) => {
      this.workDates = res.data;
    })
  }

  getInformation() {
    this.http.get("Informations/GetAllByIsActive", (res) => {
      this.informationModel = res.data[0];
    })
  }

  getComment() {
    this.http.get("Comments/GetAllByIsActive", (res) => {
      this.comments = res.data;
      console.log(this.comments);
    })
  }

  createContact() {
    this.sendEmail();
    setTimeout(() => {
      this.http.post("Contacts/Create", this.contactModel, (res) => {
        console.log(res);
        setTimeout(() => {
          location.reload();
        }, 3000);
      })
    }, 5000);
  }

  sendEmail() {
    this.emailService.sendEmail(this.contactModel);
  }

  
}
