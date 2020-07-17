import { Component, OnInit, Input } from '@angular/core';
import { Plan, Microciclo } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-running-plan',
  templateUrl: './running-plan.component.html',
  styleUrls: ['./running-plan.component.scss'],
})
export class RunningPlanComponent implements OnInit {


  @Input() plan: Plan;
  showGraph: boolean = false;
  datosMicroA = []
  datosMicroB = []
  datosMicroC = []
  datosMicroD = []


  datos = [
    {
      "name": "A",
      "value": 8,

    },
    {
      "name": "B",
      "value": 20,
    },
    {
      "name": "C",
      "value": 16,

    },
    {
      "name": "D",
      "value": 10,
    },
  ]
  constructor() { }

  ngOnInit() {

    for (let i = 0; i < this.plan.microciclos.length; i++) {
      let micro = this.plan.microciclos[i];
      for (let j = 0; j < micro.entrenamientos.length; j++) {
        const entreno = micro.entrenamientos[j];
        micro.volTotal += entreno.volTotalEstimado;
      }
      console.log(micro.volTotal)
    }

  }

  showGraphs(){
    this.showGraph = !this.showGraph;

  }

  showResumen(){

  }

  showMicrocicloProgrmado(microciclo: Microciclo){
    microciclo.seleccionado = !microciclo.seleccionado;
  }
  showMicrocicloReal(microciclo: Microciclo){

  }

  getDatosTiempo(){
    let datos = [
      {
        "name": "A",
        "value": 8,
  
      },
      {
        "name": "B",
        "value": 20,
      },
      {
        "name": "C",
        "value": 16,
  
      },
      {
        "name": "D",
        "value": 10,
      },
    ]
    return datos;
  }

  getDatosDistancia(){
    let datos = [
      {
        "name": "A",
        "value": 8,
  
      },
      {
        "name": "B",
        "value": 20,
      },
      {
        "name": "C",
        "value": 16,
  
      },
      {
        "name": "D",
        "value": 10,
      },
    ]
    return datos;
  }

  getDatosDesnivel(){
    let datos = [
      {
        "name": "A",
        "value": 8,
  
      },
      {
        "name": "B",
        "value": 20,
      },
      {
        "name": "C",
        "value": 16,
  
      },
      {
        "name": "D",
        "value": 10,
      },
    ]
    return datos;
  }

  getDatosUA(){
    let datos = [
      {
        "name": "A",
        "value": 8,
  
      },
      {
        "name": "B",
        "value": 20,
      },
      {
        "name": "C",
        "value": 16,
  
      },
      {
        "name": "D",
        "value": 10,
      },
    ]
    return datos;
  }
}
