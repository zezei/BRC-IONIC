import { Component, OnInit, Input } from '@angular/core';
import { Entrenamiento, ContiunoVariable } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-contiuno-variable',
  templateUrl: './contiuno-variable.component.html',
  styleUrls: ['./contiuno-variable.component.scss'],
})
export class ContiunoVariableComponent implements OnInit {


  @Input() contiunoVariable: ContiunoVariable;
  constructor() { }

  ngOnInit() {}

}
