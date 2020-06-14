import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Ejercicio } from 'src/app/interfaces/interfaces';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  categorias = [
    {
      categoria: 'CORE',
      subcategorias: ["ANTIFLEXION", "ANTIEXTENSION", "ANTIROTACION", "COMBINADO"]
    }, {
      categoria: 'MMII',
      subcategorias: ["BILATERAL", "UNILATERAL", "COMBINADO"]
    },
    {categoria:'MMSS',
    subcategorias:["BILATERAL", "UNILATERAL", "COMBINADO"]
    }, 
    {
      categoria: 'COMBINADOS',
      subcategorias: ["BILATERAL", "UNILATERAL", "CONTRALATERAL"]
    },
    {
      categoria: 'COORDINACION',
      subcategorias: ["ESTABILIDAD", "CAMBIOS DE DIRECCION", "EQUILIBRIO", "RITMO", "ORIENTACION ESPACIAL"]
    }
  ]

  textoBusqueda = ''
  ejercicios: Ejercicio[] = []
  @ViewChild(IonSegment, {static:true}) segment: IonSegment;
  nombreEjercicioSearch: string = '';
  constructor(private adminService: AdminService) { }


  ngOnInit() {
    this.adminService.getEjercicios().subscribe(data => {
      this.ejercicios = data['ejerciciosData']
      console.log(this.ejercicios)
      this.segment.value = 'todos'
      
    })
  }

  onSearchChange(event) {
    this.textoBusqueda = event.detail.value;    

  }

  segmentChanged(event){
    const valorSegmento = event.detail.value;
    console.log(valorSegmento)
    if (valorSegmento === 'todos'){
      this.nombreEjercicioSearch = '';
      return;
    }
    this.nombreEjercicioSearch = valorSegmento;
    
  }

  mostrarImagen(ejercicio){

  }

  openEjercicioPopover(ejercicio){

  }

  removerEjercicio(ejercicio){
    
  }

}
