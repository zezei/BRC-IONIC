import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Plan } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-plan-stats-card',
  templateUrl: './plan-stats-card.component.html',
  styleUrls: ['./plan-stats-card.component.scss'],
})
export class PlanStatsCardComponent implements OnInit, OnChanges {


  @Input() plan: Plan;


  // view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = false;
  legendPos: string = 'below';
  showYAxisLabel: boolean = false;

  colorScheme = 'nightLights';

  single: any[] = [
    {
      "name": "Programados",
      "value": 26,

    },
    {
      "name": "Completos",
      "value": 20,
    },
  ];


  constructor() {
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


  ngOnChanges(change: SimpleChanges){
    if (change.plan){
      console.log("cambio de plan")
      this.entrenosCompletosProgramados()
    }
  }
  ngOnInit() {
    this.entrenosCompletosProgramados()
  }

  entrenosCompletosProgramados(){
    let cantidadEntrenosProgramados = 0;
    let cantidadEntrenosCompletos = 0;

    for (let i = 0; i < this.plan.microciclos.length; i++) {
      const micro = this.plan.microciclos[i];
      console.log(micro)
      cantidadEntrenosProgramados += micro.entrenamientos.length;
      for (let j = 0; j < micro.entrenamientos.length; j++) {
        const entreno = micro.entrenamientos[j];
        if(entreno.completo){
          cantidadEntrenosCompletos+= 1
        }
        
      }
    }
    this.single = [
      {
        "name": "1",
        "value": cantidadEntrenosProgramados,
  
      },
      {
        "name": "2",
        "value": cantidadEntrenosCompletos,
      },
      {
        "name": "a",
        "value": 12,
  
      },
      {
        "name": "B",
        "value": 13,
      },
    ];
  }

  verMas(){
    
  }

  
}
