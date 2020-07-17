import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from 'src/app/interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {


  @Input() clientes: Cliente[];
  textoBusqueda: string = '';
  constructor(private navCtrl: NavController, private commonService: CommonService) { }

  ngOnInit() {
  }


  onSearchChange(event) {
    this.textoBusqueda = event.detail.value;    

  }

  verCliente(cliente: Cliente){
    this.commonService.cliente = cliente;
    this.navCtrl.navigateForward(`admin/tabs/tab1/cliente/${cliente.id}`)
  }
}
