import { Component, OnInit, Input } from '@angular/core';
import { Circuito } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-circuito',
  templateUrl: './circuito.component.html',
  styleUrls: ['./circuito.component.scss'],
})
export class CircuitoComponent implements OnInit {


  @Input() circuito: Circuito;
  constructor() { }

  ngOnInit() {
    console.log(this.circuito)
  }

}
