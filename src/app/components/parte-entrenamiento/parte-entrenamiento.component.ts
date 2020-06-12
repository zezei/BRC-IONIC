import { Component, OnInit, Input } from '@angular/core';
import { EjerciciosCompletos } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-parte-entrenamiento',
  templateUrl: './parte-entrenamiento.component.html',
  styleUrls: ['./parte-entrenamiento.component.scss'],
})
export class ParteEntrenamientoComponent implements OnInit {


  @Input() parte;
  constructor() { }

  ngOnInit() {
    console.log(this.parte)
  }

}
