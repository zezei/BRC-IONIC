import { Component, OnInit } from '@angular/core';
import { Plan, Entrenamiento } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-hoy',
  templateUrl: './hoy.page.html',
  styleUrls: ['./hoy.page.scss'],
})
export class HoyPage implements OnInit {


  planesVigentes: Plan[] = []
  entrenamientoDiario: Entrenamiento;
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
  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userService.getPlanesVigentes().subscribe(data=>{
      this.planesVigentes.push(...data['planesVigentes'])
      const today = new Date();
      for (let i = 0; i < this.planesVigentes.length; i++) {
        const plan = this.planesVigentes[i];
        for (let j = 0; j < plan.microciclos.length; j++) {
          const microciclo = plan.microciclos[j];

          let entrenamientoDiario = microciclo.entrenamientos.find(entreno=> new Date(entreno.fecha._seconds*1000).getDate() ===  today.getDate())
          if (entrenamientoDiario !== undefined){
            this.entrenamientoDiario = entrenamientoDiario;
            console.log(this.entrenamientoDiario)
            break;
          }

          
        }
        
      }
      console.log(this.planesVigentes)
    })
  }

}
