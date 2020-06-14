import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Plan } from 'src/app/interfaces/interfaces';
import { GuiService } from 'src/app/services/gui.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {
  slidesOpt = {
    slidesPerView: 1.1,
    spaceBetween: 10,
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
    }
}
  plan: Plan;
  actualizando = false;

  constructor(private adminService: AdminService, private activatedRoute: ActivatedRoute, private guiService: GuiService) { }

  ngOnInit() {
    const clienteId = this.activatedRoute.snapshot.paramMap.get('clienteId')
    const planId = this.activatedRoute.snapshot.paramMap.get('id')

    this.adminService.getPlanCliente(clienteId,planId).subscribe(data=>{
      if (data['ok']){
        this.plan = data['plan'];
      }
    })

  }


  async actualizarDatosPlan(){
    this.actualizando = true;

    const exito = await this.adminService.avtualizarDatosPlan(this.plan);
    if (exito){
      this.guiService.alertToast("El plan se actualizo exitosamente")
      this.actualizando = false;

      
    }
    else{
      this.guiService.alertToast("Error al actualizar el plan")
      this.actualizando = false;

    }
  }
}
