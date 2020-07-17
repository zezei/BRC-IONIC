import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Plan, Microciclo } from 'src/app/interfaces/interfaces';
import { CommonService } from 'src/app/services/common.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx/';
import { IonSlides, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  planesVigentes: Plan[] = [];

  avatarSlidesOpt={
    slidesPerView: 3,

  }
  slidesOpt = {
    slidesPerView: 1,
    spaceBetween: 10,

  }

  semanasOpt = {
    slidesPerView: 4,
  }

  value = '';
  today = new Date();
  @ViewChild('mainSlide') mainSlide: IonSlides; 
  constructor(public userService: UserService, private commonService: CommonService, private navCtrl: NavController, private iab: InAppBrowser) { }

  async ngOnInit() {
    await this.commonService.verificarUserToken()
    await this.userService.getPlanesVigentes()
    this.planesVigentes = this.userService.planesVigentes.slice()
    this.planesVigentes[0].seleccionado = true;
    this.mainSlide.lockSwipes(true)
  }
  getMicroActual(microciclo: Microciclo) {
    let fecha_inicio = new Date(microciclo.fecha_inicio._seconds * 1000)
    let fecha_fin = new Date(microciclo.fecha_fin._seconds * 1000)

    return (this.today >= fecha_inicio && this.today < fecha_fin)
  }

  getFechaFin(microciclo: Microciclo) {
    console.log(new Date(microciclo.fecha_fin._seconds))
    return new Date(microciclo.fecha_fin._seconds * 1000)
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
    this.mainSlide.lockSwipes(false);
    this.mainSlide.slideTo(index);
    this.mainSlide.lockSwipes(true)
    this.planesVigentes.forEach(plan=> plan.seleccionado =false);
    plan.seleccionado = true;

  }


  verSemana(microciclo: Microciclo){
    this.userService.microcicloSeleccionado = microciclo;
    this.navCtrl.navigateForward('users/tabs/home/semana', {animated: true})
  }

  getStrava(){
    const browser = this.iab.create(`https://www.strava.com/oauth/authorize?client_id=26310&redirect_uri=http://localhost:5000/planesbrc/us-central1/api/strava_token?cliente=${this.commonService.decodedUser.uid}&response_type=code&scope=activity:read_all`,'_system');
    this.userService.getStravaActivities()
  }
}
