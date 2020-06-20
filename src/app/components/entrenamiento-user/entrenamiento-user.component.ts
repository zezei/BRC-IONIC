import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ParteEntreno, Circuito, Entrenamiento } from 'src/app/interfaces/interfaces';
import { IonSlides, IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-entrenamiento-user',
  templateUrl: './entrenamiento-user.component.html',
  styleUrls: ['./entrenamiento-user.component.scss'],
})
export class EntrenamientoUserComponent implements OnInit {

  @Input() entreno: Entrenamiento;
  circuito: Circuito = {};
  @ViewChild('parteSlide', { static: true }) slides: IonSlides;
  @ViewChild('entrenamientoSegment', {static:true}) segment:any;

  tipoParte = 'ec';
  parteOpts = {
    slidesPerView: 1,
  }
  constructor() { }

  ngOnInit() {
    console.log(this.entreno)
    this.slides.lockSwipes(true)
  }

  mostrarEC() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);

  }

  mostrarPP() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);

  }
  mostrarVC(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(2);
    this.slides.lockSwipes(true);
  }

}
