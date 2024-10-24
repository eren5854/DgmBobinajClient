import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { CommentModel } from '../../models/comment.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './comment-item.component.html',
  styleUrl: './comment-item.component.css'
})
export class CommentItemComponent {
  id: string = "";

  // Comment modeliniz, rate alanını number olarak alacak
  commentModel: CommentModel = new CommentModel();

  constructor(
    private http: HttpService,
    private activated: ActivatedRoute,
    private router: Router
  ) {
    this.activated.params.subscribe((res: any) => {
      this.id = res.id;
      console.log(res.id);
      if (this.id === "" || this.id === null) {
        router.navigateByUrl("");
      }
    });
  }

  updateComment() {
    // Seçilen rate değerini number türüne çeviriyoruz
    const rateValue = parseInt((<HTMLSelectElement>document.getElementById('rate')).value, 10);

    // Comment modeline id ve rate değerini atıyoruz
    if (!isNaN(rateValue)) {
      this.commentModel.id = this.id;
      this.commentModel.rate = rateValue;

      // HTTP post isteğiyle yorumu güncelliyoruz
      this.http.post("Comments/Update", this.commentModel, (res) => {
        console.log(res);
      });
    } else {
      console.error("Lütfen geçerli bir rate değeri seçiniz.");
    }
  }
}
