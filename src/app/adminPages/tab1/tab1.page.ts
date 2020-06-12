import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Cliente } from 'src/app/interfaces/interfaces';
import { AlertController } from '@ionic/angular';
import { GuiService } from 'src/app/services/gui.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{


  clientes: Cliente[] = [];
  constructor(private adminService: AdminService, private alertCtrl: AlertController, private guiService: GuiService) {}

  ngOnInit(){
    this.adminService.getClientes().subscribe(data=>{
      if (data['ok']){
        this.clientes.push(...data['clientes'])
      }
    })
    this.adminService.nuevoCliente.subscribe((cliente:Cliente)=>this.clientes.unshift(cliente))
  }

  logOut(){

  }

  async agregarCliente(){
    const alert = await this.alertCtrl.create({
      header: 'Crear un cliente nuevo',
      message: 'Complete los datos',
      cssClass: 'customAlert',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Ingrese un nombre',
          
        },
        {
          name: 'apellido',
          type: 'text',
          placeholder: 'Ingrese un apellido',
          
        },
        {
          name: 'dni',
          type: 'number',
          placeholder: 'Ingrese un DNI',
          
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Ingrese un Email',
          
        },
        {
          name: 'telefono',
          type: 'number',
          placeholder: 'Ingrese un Telefono',
          
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'brc-buttons',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, 
        {
          text: 'Guardar',
          cssClass: 'brc-buttons',
          handler: async (data) => {
            if (data.nombre.length > 0 ){
              let cliente: Cliente = data;
              const exito = await this.adminService.crearCliente(cliente);
              if (exito){
                this.guiService.alertToast("El cliente se creo con exito")
              }
              else{
                this.guiService.alertToast("No se pudo crear el cliente")
              }
            }
            else{
              return;
            }
          }
        }]
        });

    await alert.present();
  } 

}
