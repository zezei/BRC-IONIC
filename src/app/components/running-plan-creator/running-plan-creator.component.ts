import { Component, OnInit, Input } from '@angular/core';
import { Plan, Cliente } from 'src/app/interfaces/interfaces';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-running-plan-creator',
  templateUrl: './running-plan-creator.component.html',
  styleUrls: ['./running-plan-creator.component.scss'],
})
export class RunningPlanCreatorComponent implements OnInit {


  @Input() planAnterior: Plan;
  @Input() planActual: Plan;
  @Input() cliente: Cliente;
  mostarAnterior: boolean =false;
  mostrarActual: boolean = true;
  constructor(private adminService: AdminService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // this.adminService.getPlanAnterior(this.planActual.cliente, this.planActual.tipo, this.planActual.nro-1).subscribe( data=>{
    //   console.log(data)
    //   this.planActual = data['plan']
    // })
  }

  showPlanAnterior(){
    this.mostarAnterior = !this.mostarAnterior;
    //Exapnd card content
  }

  showPlanActual(){
    this.mostrarActual = !this.mostrarActual;

  }
}
