import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-cliente-profile',
  templateUrl: './cliente-profile.component.html',
  styleUrls: ['./cliente-profile.component.scss'],
})
export class ClienteProfileComponent implements OnInit {


  @Input() cliente: Cliente;
  constructor() { }

  ngOnInit() {}

}
