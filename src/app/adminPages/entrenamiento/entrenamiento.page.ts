import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Entrenamiento } from 'src/app/interfaces/interfaces';
import { IonSlides } from '@ionic/angular';
import { GuiService } from 'src/app/services/gui.service';

@Component({
  selector: 'app-entrenamiento',
  templateUrl: './entrenamiento.page.html',
  styleUrls: ['./entrenamiento.page.scss'],
})
export class EntrenamientoPage implements OnInit {
  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;

  clienteId;
  planId;
  microcicloId;
  tipoParte = 'ec'
  entrenoId;
  entreno: Entrenamiento;
  slidesOpt = {
    slidesPerView: 1,
    spaceBetween: 10,
    arrows: true,
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
  constructor(private activatedRoute: ActivatedRoute, private adminSerivce: AdminService, private guiService: GuiService) { }

  async ngOnInit() {
    this.clienteId = this.activatedRoute.snapshot.paramMap.get('clienteId');
    this.planId = this.activatedRoute.snapshot.paramMap.get('planId');
    this.microcicloId = this.activatedRoute.snapshot.paramMap.get('microId');
    this.entrenoId = this.activatedRoute.snapshot.paramMap.get('entrenoId');
    this.entreno = await this.adminSerivce.obtenerEntrenamiento(this.clienteId, this.planId, this.microcicloId, this.entrenoId)
    this.slides.lockSwipes(true);

  }

  mostrarEC() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);

  }

  mostrarPP() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);

  }
  mostrarVC(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(2);
    this.slides.lockSwipes(true);
  }

  async actualizarEntreno(event){
    const exito = await this.adminSerivce.actualizarEntrenamiento(this.clienteId,this.planId, this.microcicloId, this.entrenoId, this.entreno);
    if (exito){
      this.guiService.alertToast("El entreno se actualizo correctamente")
    }
  }

}
