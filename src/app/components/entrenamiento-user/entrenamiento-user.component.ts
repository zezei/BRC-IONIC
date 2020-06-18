import { Component, OnInit, Input } from '@angular/core';
import { ParteEntreno, Circuito } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-entrenamiento-user',
  templateUrl: './entrenamiento-user.component.html',
  styleUrls: ['./entrenamiento-user.component.scss'],
})
export class EntrenamientoUserComponent implements OnInit {

  @Input() parte: ParteEntreno[];
  circuito: Circuito = {};
  slidesOpt = {
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 3,
      },
    }
  }
  constructor() { }

  ngOnInit() {
    console.log(this.parte)
    this.circuito = this.parte[0].circuito;
  }

}
