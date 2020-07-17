import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Microciclo } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-microciclos-card-detail',
  templateUrl: './microciclos-card-detail.component.html',
  styleUrls: ['./microciclos-card-detail.component.scss'],
})
export class MicrociclosCardDetailComponent implements OnInit, OnChanges {

  @Input() microciclos: Microciclo[];
  today = new Date()
  semanasOpt = {
    slidesPerView: 4,
  }

  microSeleccionado: Microciclo;
  constructor() { }

  ngOnInit() {
    console.log(this.microciclos)
    this.microciclos.forEach(microciclo => {
      let actual = this.getMicroActual(microciclo);
      if (actual){
        microciclo.seleccionado = true;
        this.microSeleccionado = microciclo;
        return;
      }
      
    });
  }

  ngOnChanges(change: SimpleChanges){
    console.log(change)
    if (change.microciclos){
      this.microciclos.forEach(microciclo => {
        let actual = this.getMicroActual(microciclo);
        if (actual){
          microciclo.seleccionado = true;
          this.microSeleccionado = microciclo;

          return;
        }
    })
  }
}

  getMicroActual(microciclo: Microciclo) {
    let fecha_inicio = new Date(microciclo.fecha_inicio._seconds * 1000)
    let fecha_fin = new Date(microciclo.fecha_fin._seconds * 1000)

    return (this.today >= fecha_inicio && this.today < fecha_fin)
  }
  
  seleccionar(microciclo: Microciclo){
    for (let i = 0; i < this.microciclos.length; i++) {
      const micro = this.microciclos[i];
      micro.seleccionado = false;
    }
    microciclo.seleccionado = true;
    this.microSeleccionado = microciclo;
  }

}
