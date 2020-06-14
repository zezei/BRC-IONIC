import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { Cliente, Plan } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { NuevoPlanModalComponent } from 'src/app/components/nuevo-plan-modal/nuevo-plan-modal.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {


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
        slidesPerView: 3,
      },
    }
}

  cliente: Cliente = {};
  loading: boolean = true;
  constructor(private adminService: AdminService, private activatedRoute: ActivatedRoute, private modalCtrl: ModalController) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    this.adminService.getCliente(id).subscribe(data=>{
      if (data['ok']){
        this.cliente = data['clienteData']
        this.loading = false;
      }
    })



  }

  async openNuevoPlan() {
    const modal = await this.modalCtrl.create({
      component: NuevoPlanModalComponent,
      cssClass: 'customAlert',
      componentProps: {
        cliente: this.cliente
      }
    });
    await modal.present();

  }
  
}
