import { Component, OnInit } from '@angular/core';
import { Plan, Microciclo } from 'src/app/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-running-plan',
  templateUrl: './running-plan.page.html',
  styleUrls: ['./running-plan.page.scss'],
})
export class RunningPlanPage implements OnInit {


  plan: Plan;
  microciclosSeleccionados: Microciclo[] = [];
  semanasOpt = {
    slidesPerView: 4,
  }

  planAnterior: Plan;
  constructor(private activatedRoute: ActivatedRoute, private adminService: AdminService) { }

  ngOnInit() {
    

    const clienteId = this.activatedRoute.snapshot.paramMap.get('clienteId')
    const planId = this.activatedRoute.snapshot.paramMap.get('id')

    this.adminService.getPlanCliente(clienteId,planId).subscribe(data=>{
      if (data['ok']){
        this.plan = data['plan'];
        for (let i = 0; i < this.plan.microciclos.length; i++) {
          const micro = this.plan.microciclos[i];
          micro.seleccionado = this.getMicroActual(micro)
          if (micro.seleccionado){
            this.microciclosSeleccionados.push(micro);
          }
          console.log(micro.seleccionado)
          
        }
        this.adminService.getPlanAnterior(this.plan.cliente, this.plan.tipo, this.plan.nro-1).subscribe(data=>{
          this.planAnterior = data['plan']
        })
        console.log(this.plan)
      }
    })
  }


  getMicroActual(microciclo: Microciclo) {
    const today = new Date()
    let fecha_inicio = new Date(microciclo.fecha_inicio._seconds * 1000)
    let fecha_fin = new Date(microciclo.fecha_fin._seconds * 1000)

    return (today >= fecha_inicio && today < fecha_fin)
  }
  verSemana(microciclo: Microciclo){
    if (!microciclo.seleccionado){
      microciclo.seleccionado = true;
      this.microciclosSeleccionados.unshift(microciclo)
    }
    else{
      microciclo.seleccionado = false;
      this.microciclosSeleccionados = this.microciclosSeleccionados.filter(micro=>micro.id !== microciclo.id)
    }

  }
}
