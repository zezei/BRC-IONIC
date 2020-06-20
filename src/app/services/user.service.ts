import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';
import { Plan, Microciclo } from '../interfaces/interfaces';


const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class UserService{


  planesVigentes: Plan[] = [];
  microcicloSeleccionado: Microciclo;
  constructor(private http: HttpClient, private commonService: CommonService) {
    console.log(this.commonService.decodedUser)
  }




  // getPersonalInfo(){
  //   console.log("BUcando data cliente")
  //   this.http.get(`${URL}/full_data_cliente/${this.commonService.decodedUser.uid}`)
  //   .subscribe(data=>console.log(data))
  // }

  getPlanesVigentes() {
    return new Promise( resolve=>{
      this.http.get(`${URL}/usuario/${this.commonService.decodedUser.dni}/planes_vigentes`).subscribe(data => {
        if (data['ok']){
          this.planesVigentes = data['planesVigentes']
          console.log(this.planesVigentes)
          resolve(true)

        }
        else{
          resolve(false)
        }
   
       });

    })
  }
}
