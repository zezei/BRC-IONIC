import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Feedback } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-running-feedback',
  templateUrl: './running-feedback.component.html',
  styleUrls: ['./running-feedback.component.scss'],
})
export class RunningFeedbackComponent implements OnInit {

  rpeSlideOpts = {
    slidesPerView: 6,
    breakpoints: {
      640: {
        slidesPerView: 4.6,
      },
      768: {
        slidesPerView: 6,
      },
      1024: {
        slidesPerView: 6,
      },
    }
  }

  climaSlideOpts = {
    slidesPerView: 3
  }
  feedBack: Feedback = {};
  constructor(public commonService: CommonService) { }

  ngOnInit() {}

  seleccionarRpe(rpe){
    this.feedBack.rpe = rpe.valor;
    this.commonService.rpes.forEach(rpe=>rpe.seleccionado=false)
    rpe.seleccionado = true;
  }

  seleccionarClima(clima){
    this.feedBack.clima = clima.valor;
    this.commonService.climas.forEach(clima=>clima.seleccionado=false)
    clima.seleccionado = true;
  }

}
