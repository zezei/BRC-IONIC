import { Component, OnInit, Input } from '@angular/core';
import { Entrenamiento, ContiunoVariable, ParteEntreno, BloqueCV } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-contiuno-variable',
  templateUrl: './contiuno-variable.component.html',
  styleUrls: ['./contiuno-variable.component.scss'],
})
export class ContiunoVariableComponent implements OnInit {


  @Input() contiunoVariable: ContiunoVariable = {};
  cantBloques: Number;
  constructor() { }

  ngOnInit() {
  }

  addBloque(){
    let nuevoBloque: BloqueCV = {}
    this.contiunoVariable.bloques.push(nuevoBloque)

  }

}
