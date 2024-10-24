import { Component, AfterViewInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { LayoutModel } from '../../models/layout.model';
import { LinkModel } from '../../models/link.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MiniServiceModel } from '../../models/mini-service.model';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, RouterLink],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements AfterViewInit {
  layoutModel: LayoutModel = new LayoutModel();
  links: LinkModel[] = [];
  miniServices: MiniServiceModel[] = [];
  whatsappNumber = "";

  imgUrl = "";

  constructor(private http: HttpService) {
    this.getAllLayout();
    this.getLink();
    this.getMiniService();
    this.getInformation();
    this.imgUrl = http.imgUrl;
  }

  ngAfterViewInit() {
    this.initializeMenuToggle();
  }

  initializeMenuToggle() {
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");
    const menuBtnIcon = menuBtn!.querySelector("i");

    menuBtn!.addEventListener("click", (e) => {
      navLinks!.classList.toggle("open");
      const isOpen = navLinks!.classList.contains("open");
      menuBtnIcon!.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
    });

    navLinks!.addEventListener("click", (e) => {
      navLinks!.classList.remove("open");
      menuBtnIcon!.setAttribute("class", "ri-menu-line");
    });
  }

  getAllLayout() {
    this.http.get("Layouts/GetAllByIsActive", (res) => {
      this.layoutModel = res.data[0];
    });
  }

  getLink() {
    this.http.get("Links/GetAllByIsActive", (res) => {
      this.links = res.data;
    });
  }

  getMiniService() {
    this.http.get("MiniServices/GetAllByIsActive", (res) => {
      this.miniServices = res.data;
    });
  }

  getInformation() {
    this.http.get("Informations/GetAllByIsActive", (res) => {
      this.whatsappNumber = res.data[0].phone;
    });
  }
}
