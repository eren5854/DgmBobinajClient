import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ImageModel } from '../../models/image.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LightgalleryModule } from 'lightgallery/angular';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import lgZoom from 'lightgallery/plugins/zoom';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [FormsModule, CommonModule, LightgalleryModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements AfterViewInit {
  @ViewChild('lightGallery') lightGallery: any;

  images: ImageModel[] = [];
  galleries: ImageModel[] = [];
  imgUrl = "";

  constructor(private http: HttpService) {
    this.getImage();
    this.imgUrl = http.imgUrl;
  }

  getImage() {
    this.http.get("Galeries/GetAllByIsActive", (res) => {
      this.images = res.data;
      this.images.forEach((image) => {
        if (image.galeryEnum === 0) {
          this.galleries.push(image);
        }
      });

      // Galeri verileri yüklendikten sonra LightGallery'yi başlat
      if (this.lightGallery) {
        this.lightGallery.refresh();  // Galeri öğelerini yeniden başlat
      }
    });
  }

  settings = {
    counter: false,
    plugins: [lgZoom]
  };

  onBeforeSlide = (detail: BeforeSlideDetail): void => {
    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };

  ngAfterViewInit() {
    if (this.lightGallery) {
      this.lightGallery.refresh(); // Galeri öğelerini yüklendikten sonra yenile
    }
  }
}
