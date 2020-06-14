import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Entrenamiento } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-entrenamiento',
  templateUrl: './entrenamiento.page.html',
  styleUrls: ['./entrenamiento.page.scss'],
})
export class EntrenamientoPage implements OnInit {

  clienteId;
  planId;
  microcicloId;
  entrenoId;
  entreno: Entrenamiento;
  slidesOpt = {
    slidesPerView: 1,
    spaceBetween: 10,
    // breakpoints: {
    //   640: {
    //     slidesPerView: 2,
    //   },
    //   768: {
    //     slidesPerView: 2,
    //   },
    //   1024: {
    //     slidesPerView: 2,
    //   },
    // }
}
  constructor(private activatedRoute: ActivatedRoute, private adminSerivce: AdminService) { }

  async ngOnInit() {
    this.clienteId = this.activatedRoute.snapshot.paramMap.get('clienteId');
    this.planId = this.activatedRoute.snapshot.paramMap.get('planId');
    this.microcicloId = this.activatedRoute.snapshot.paramMap.get('microId');
    this.entrenoId = this.activatedRoute.snapshot.paramMap.get('entrenoId');
    this.entreno = await this.adminSerivce.obtenerEjerciciosCompletos(this.clienteId, this.planId, this.microcicloId, this.entrenoId)
    console.log(this.entreno)
  }

}
