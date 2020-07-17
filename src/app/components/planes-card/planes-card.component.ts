import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Plan } from 'src/app/interfaces/interfaces';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-planes-card',
  templateUrl: './planes-card.component.html',
  styleUrls: ['./planes-card.component.scss'],
})
export class PlanesCardComponent implements OnInit {


  avatarSlidesOpt={
    slidesPerView: 3,

  }

  planSeleccionado: Plan = {};
  @Input() planesVigentes: Plan[];
  @Output() cambiarPlan: EventEmitter<Plan> = new EventEmitter<Plan>();
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.planSeleccionado = this.planesVigentes[0];
    this.planSeleccionado.seleccionado = true;
  }


  getImg(tipo: string) {
    switch (tipo) {
      case 'Trail Running':
        return 'trail.svg'
      case 'Amplitud de movimiento':
        return 'movimiento.svg'
      case 'Funcional':
        return 'funcional.svg'
      default:
        break;
    }
  }

  seleccionarPlan(plan: Plan, index: number){

    this.planesVigentes.forEach(plan=> plan.seleccionado =false);
    plan.seleccionado = true;
    this.planSeleccionado = plan;
    this.cambiarPlan.emit(this.planSeleccionado)

  }

  verPlan(){
    if (this.planSeleccionado.tipo !== 'Trail Running'){

      this.navCtrl.navigateForward(`admin/tabs/tab1/cliente/${this.planSeleccionado.cliente}/planes/${this.planSeleccionado.id}`)
    }
    else{
      this.navCtrl.navigateForward(`admin/tabs/tab1/cliente/${this.planSeleccionado.cliente}/planesRunning/${this.planSeleccionado.id}`,{animated: true})

    }
    // console.log(this.plan)
  }
  }

