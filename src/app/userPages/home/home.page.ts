import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Plan, Microciclo } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  planesVigentes: Plan[] = [];
  slidesOpt = {
    slidesPerView: 1,
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

semanasOpt = {
  slidesPerView: 3.5,
  spaceBetween: 10,

}

today = new Date();
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getEntrenoDiario().subscribe(data=>{
      this.planesVigentes.push(...data['planesVigentes'])
      console.log(this.planesVigentes)
    });
  }
  getMicroActual(microciclo: Microciclo){
    let fecha_inicio = new Date(microciclo.fecha_inicio._seconds*1000)
    let fecha_fin = new Date(microciclo.fecha_fin._seconds*1000)

    return (this.today >= fecha_inicio && this.today < fecha_fin)
  }

  getFechaFin(microciclo: Microciclo){
    console.log(new Date(microciclo.fecha_fin._seconds))
    return new Date(microciclo.fecha_fin._seconds*1000)
  }

}
