import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';


const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private http: HttpClient, private commonService: CommonService) {
    console.log(this.commonService.decodedUser)
   }


  // getPersonalInfo(){
  //   console.log("BUcando data cliente")
  //   this.http.get(`${URL}/full_data_cliente/${this.commonService.decodedUser.uid}`)
  //   .subscribe(data=>console.log(data))
  // }

  getPlanesVigentes(){
    return this.http.get(`${URL}/usuario/123/planes_vigentes`)
  }
}
