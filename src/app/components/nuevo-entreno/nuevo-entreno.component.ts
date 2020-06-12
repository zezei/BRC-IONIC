import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { PopoverController } from '@ionic/angular';
import {  Microciclo } from 'src/app/interfaces/interfaces';
import { GuiService } from 'src/app/services/gui.service';

@Component({
  selector: 'app-nuevo-entreno',
  templateUrl: './nuevo-entreno.component.html',
  styleUrls: ['./nuevo-entreno.component.scss'],
})
export class NuevoEntrenoComponent implements OnInit {

  @Input() copiarEntreno = false;
  @Input() microciclo: Microciclo;
  @Input() clienteId;
  minDate: Date;
  maxDate: Date;
  minDateStr: string = ''
  maxDateStr: string = ''
  fechaEntreno: any;
  constructor(public adminService: AdminService, private popoverCtrl: PopoverController, private guiService: GuiService) {

   }


  ngOnInit() {
    this.minDate = new Date(this.microciclo.fecha_inicio._seconds *1000)
    this.maxDate= new Date(this.microciclo.fecha_fin._seconds *1000)
    this.minDateStr = this.getDateParsed(this.minDate);
    this.maxDateStr = this.getDateParsed(this.maxDate)

    console.log(this.minDate)
    console.log(this.maxDate)
  }

  getDateParsed(date: Date){
    const mes = date.getMonth() + 1;
    let mesString;

    if (mes < 10){
      mesString = '0' + mes;
    }else{
      mesString = mes;
    }

    const dia = date.getDate();
    let diaString;
    if (dia < 10){
      diaString = '0' + dia;
    }
    else{
      diaString = dia;
    }

    const fecha = `${date.getFullYear()}-${mesString}-${diaString}`
    console.log(fecha)
    return fecha;
  }

  crear(){
    if (this.copiarEntreno){
      this.popoverCtrl.dismiss(this.fechaEntreno);
      return;
    }
    const exito = this.adminService.crearEntrenmiento(this.fechaEntreno, this.microciclo, this.clienteId);
    if (exito){
      this.guiService.alertToast("Se agrego un nuevo entrenamiento")
      this.popoverCtrl.dismiss()
    }
    else{
      this.guiService.alertToast("No se pudo crear el entreno")
    }
  }

  cerrar(){
    this.popoverCtrl.dismiss()
  }
}
