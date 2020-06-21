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

  constructor(private activatedRoute: ActivatedRoute, private adminService: AdminService) { }

  ngOnInit() {
    

    const clienteId = this.activatedRoute.snapshot.paramMap.get('clienteId')
    const planId = this.activatedRoute.snapshot.paramMap.get('id')

    this.adminService.getPlanCliente(clienteId,planId).subscribe(data=>{
      if (data['ok']){
        this.plan = data['plan'];
        console.log(this.plan)
      }
    })
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
