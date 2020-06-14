import { Component, OnInit, Input } from '@angular/core';
import { Entrenamiento } from 'src/app/interfaces/interfaces';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-entrenamiento',
  templateUrl: './entrenamiento.component.html',
  styleUrls: ['./entrenamiento.component.scss'],
})
export class EntrenamientoComponent implements OnInit {

  @Input() entreno: Entrenamiento;


  constructor(private adminService: AdminService) { }

  ngOnInit() {
 
    
    console.log(this.entreno)
  }

}
