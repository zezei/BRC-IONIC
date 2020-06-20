import { Component, OnInit, Input } from '@angular/core';
import { Circuito } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-circuito-user',
  templateUrl: './circuito-user.component.html',
  styleUrls: ['./circuito-user.component.scss'],
})
export class CircuitoUserComponent implements OnInit {

  @Input() circuito: Circuito;
  constructor() { }

  ngOnInit() {
    console.log(this.circuito)
  }

}
