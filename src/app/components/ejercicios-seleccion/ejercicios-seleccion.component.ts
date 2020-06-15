import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IonSegment, ModalController } from '@ionic/angular';
import { Ejercicio } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-ejercicios-seleccion',
  templateUrl: './ejercicios-seleccion.component.html',
  styleUrls: ['./ejercicios-seleccion.component.scss'],
})
export class EjerciciosSeleccionComponent implements OnInit {
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
  @ViewChild(IonSegment, {static:true}) segment: IonSegment;
  nombreEjercicioSearch: string = '';
  ejerciciosSeleccionados = [];
  ejercicios: Ejercicio[] = []
  constructor(public adminService: AdminService, private modalCtrl: ModalController) { }

  async ngOnInit() {
    console.log("iniciando")
    this.ejercicios = await this.adminService.getEjercicios()
    this.segment.value = 'todos'
  }

  seleccionar(){
    const ejerciciosSeleccionados = this.adminService.ejercicios.filter(ejercicio => ejercicio.seleccionado === true)
    var nuevoArray = ejerciciosSeleccionados.slice()
    this.adminService.ejercicios.forEach(ejercicio=>
      {
        ejercicio.seleccionado = false;
        ejercicio.intensidad = '';
        ejercicio.repeticiones = null;

      })
    console.log(ejerciciosSeleccionados)
    this.modalCtrl.dismiss([...nuevoArray])
  }

  mostarEstado(ejercicio: Ejercicio){
    console.log(ejercicio)
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

  onSearchChange(event) {
    this.textoBusqueda = event.detail.value;    

  }

}
