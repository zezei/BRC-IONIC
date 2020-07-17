import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-running-microciclo-graph',
  templateUrl: './running-microciclo-graph.component.html',
  styleUrls: ['./running-microciclo-graph.component.scss'],
})
export class RunningMicrocicloGraphComponent implements OnInit {


  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = false;
  legendPos: string = 'below';
  showYAxisLabel: boolean = false;

  colorScheme = 'nightLights';

  @Input() datos: any[] = [];
  constructor() { }

  ngOnInit() {}

}
