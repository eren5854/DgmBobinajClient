import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonList } from '@ionic/angular';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {
  isScreenSizeUnder768px = false;
  selectedCardIndex: number = 0;

  selectCard(index: number) {
    this.selectedCardIndex = index; // Tıklanan kartın dizinini güncelle
  }
}
