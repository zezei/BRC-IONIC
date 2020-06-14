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
    this.navCtrl.navigateForward(`admin/tabs/tab1/cliente/${this.plan.cliente}/planes/${this.plan.id}`)
    // console.log(this.plan)
  }
}
