import { Component, OnInit, ViewChild } from '@angular/core';
import { Plan, Entrenamiento } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';
import { IonSlides } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-hoy',
  templateUrl: './hoy.page.html',
  styleUrls: ['./hoy.page.scss'],
})
export class HoyPage implements OnInit {


  planesVigentes: Plan[] = []
  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;

  entrenamientoDiario: Entrenamiento[] = [];
  avatarSlidesOpt = {
    slidesPerView: 3,
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

  tipoPlanes = [];
  constructor(private userService: UserService, private commonService: CommonService) { }

  async ngOnInit() {
    await this.commonService.verificarUserToken()
    await this.userService.getPlanesVigentes()
    this.planesVigentes.push(...this.userService.planesVigentes);

    const today = new Date();
    for (let i = 0; i < this.planesVigentes.length; i++) {
      const plan = this.planesVigentes[i];
      for (let j = 0; j < plan.microciclos.length; j++) {
        const microciclo = plan.microciclos[j];

        let entrenamientoDiario = microciclo.entrenamientos.find(entreno => new Date(entreno.fecha._seconds * 1000).getDate() === today.getDate())
        if (entrenamientoDiario !== undefined) {
          if (plan.tipo === 'Trail Running') {
            this.tipoPlanes.push({ valor: plan.tipo, img: 'trail.svg', selccionado: false })
          }
          if (plan.tipo === 'Amplitud de movimiento') {
            this.tipoPlanes.push({ valor: plan.tipo, img: 'movimiento.svg', selccionado: false })
          }
          if (plan.tipo === 'Funcional') {
            this.tipoPlanes.push({ valor: plan.tipo, img: 'funcional.svg', selccionado: false })
          }
          this.entrenamientoDiario.push(entrenamientoDiario);
          console.log(this.entrenamientoDiario)
          break;
        }


      }

    }
    if (this.tipoPlanes.length > 0) {
      this.tipoPlanes[0].selccionado = true;
    }
    this.slides.lockSwipes(true);

    console.log(this.planesVigentes)

  }

  seleccionarPlan(tipo, i) {
    this.tipoPlanes.forEach(planTipo => planTipo.selccionado = false)
    tipo.selccionado = true
    this.slides.lockSwipes(false);
    this.slides.slideTo(i);
    this.slides.lockSwipes(true);
  }
}
