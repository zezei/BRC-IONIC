import { Component, OnInit, Input } from '@angular/core';
import { Plan } from 'src/app/interfaces/interfaces';
import { AdminService } from 'src/app/services/admin.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements OnInit {

  @Input() plan:Plan;
  constructor(private adminService: AdminService, private navCtrl: NavController) { }

  ngOnInit() {
    console.log(this.plan)
    
  }

  detallePlan(){
    if (this.plan.tipo !== 'Trail Running'){

      this.navCtrl.navigateForward(`admin/tabs/tab1/cliente/${this.plan.cliente}/planes/${this.plan.id}`)
    }
    else{
      this.navCtrl.navigateForward(`admin/tabs/tab1/cliente/${this.plan.cliente}/planesRunning/${this.plan.id}`,{animated: true})

    }
    // console.log(this.plan)
  }
}
