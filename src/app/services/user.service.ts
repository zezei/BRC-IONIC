import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';
import { Plan, Microciclo, Cliente } from '../interfaces/interfaces';


const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class UserService{


  planesVigentes: Plan[] = [];
  cliente: Cliente;
  microcicloSeleccionado: Microciclo;
  constructor(private http: HttpClient, private commonService: CommonService) {
    console.log(this.commonService.decodedUser)
  }




  getPersonalInfo(uid){
    console.log("BUcando data cliente")
    this.http.get(`${URL}/personal_info/${uid}`)
    .subscribe(data=>{
      this.cliente = data['cliente']
      console.log(data)

    }
    )
  }

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

  getStravaActivities(){
    return new Promise<any[]>( resolve=>{
      this.http.post(`https://www.strava.com/oauth/token?client_id=26310&client_secret=bacaf01b8567d3c7bcaf9a003043e2b206e14ddb&refresh_token=${this.cliente.strava_code}&grant_type=refresh_token`,'').subscribe((data:any)=>{
        this.http.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${data.access_token}`).subscribe((dataa: any[])=>resolve(dataa));
        this.http.get(`https://www.strava.com/api/v3/activities/2543825480?access_token=${data.access_token}`).subscribe(dataaa=>console.log(dataaa));
        // this.http.post(`https://www.strava.com/api/v3/activities?name=BRC&type=Run&distance=3000&elapsed_time=3600&start_date_local=2013-10-20T19:20:30+01:00&access_token=${data.access_token}`,'').subscribe(dato=>console.log(dato))
      })

      //`https://www.strava.com/api/v3/activities/${act}?access_token=${data.access_token}`

    })
  }


}
