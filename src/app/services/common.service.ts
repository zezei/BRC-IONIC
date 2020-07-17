import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { Cliente } from '../interfaces/interfaces';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CommonService {


  
  token = '';
  userAdmin: boolean = false;
  decodedUser: any;

  climas = [
    {
      valor: 1,
      imagen: 'assets/imgs/frio.png',
      seleccionado: false
    },
    {
      valor: 2,
      imagen: 'assets/imgs/soleado-lluvia.png',
      seleccionado: false
    },
    {
      valor: 3,
      imagen: 'assets/imgs/soleado.png',
      seleccionado: false
    },
  ]
  rpes = [
    {
      valor: 1,
      imagen: 'assets/imgs/1.png',
      seleccionado: false
    },
    {
      valor: 2,
      imagen: 'assets/imgs/2.svg',
      seleccionado: false
    },
    {
      valor: 3,
      imagen: 'assets/imgs/3.png',
      seleccionado: false
    },
    {
      valor: 4,
      imagen: 'assets/imgs/4.png',
      seleccionado: false
    },
    {
      valor: 5,
      imagen: 'assets/imgs/5.png',
      seleccionado: false
    },
    {
      valor: 6,
      imagen: 'assets/imgs/6.png',
      seleccionado: false
    },
  ]

  cliente: Cliente;
  constructor(private auth: AngularFireAuth, private http: HttpClient, private storage: Storage, private navCtrl: NavController) { }


  login(username: string, password: string) {
    return new Promise((resolve) => {
      this.auth.signInWithEmailAndPassword(username, password).then(async data => {
        this.token = await data.user.getIdToken();
        this.http.post(`${URL}/login?token=${this.token}`, '').subscribe((dataLogin: any) => {
          console.log(dataLogin)
          if (dataLogin.ok) {
            this.decodedUser = dataLogin.user;
            this.guardarToken(this.token)
            this.userAdmin = dataLogin.user.adminUser;
            console.log("Inicio session correcto")
            resolve(true)
          }
          else {
            resolve(false)
          }
        })
      }).catch(err=> {
        resolve(false)}
        )

    })
  }

  async guardarToken(token: string){
    this.token = token;
    await this.storage.set('token', token);

  }

  async cargarToken(){
    this.token = await this.storage.get('token') || null;
    console.log(this.token)

  }
  async verificarAdminToken(): Promise<boolean>{
    await this.cargarToken();
    if (!this.token){
      console.log("No hay token")
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }
    return new Promise<boolean>( resolve=>{

      this.http.get(`${URL}/getAdminUser?token=${this.token}`)
      .subscribe( (data:any)=>{
        console.log(data)
        if (data.ok){
          resolve(true)
        }
        else{
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }
      })
    })
  }

  async verificarUserToken(): Promise<boolean>{
    await this.cargarToken();
    if (!this.token){
      console.log("No hay token")
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }
    return new Promise<boolean>( resolve=>{

      this.http.get(`${URL}/getUser?token=${this.token}`)
      .subscribe( (data:any)=>{
        console.log(data)
        if (data.ok){
          this.decodedUser = data.user;
          resolve(true)
        }
        else{
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }
      })
    })
  }

  getStravaActivities(fechaInicio, fechaFin){
    return new Promise<any[]>( resolve=>{
      this.http.post(`https://www.strava.com/oauth/token?client_id=26310&client_secret=bacaf01b8567d3c7bcaf9a003043e2b206e14ddb&refresh_token=${this.cliente.strava_code}&grant_type=refresh_token`,'').subscribe((data:any)=>{
        // this.http.get(`https://www.strava.com/api/v3/athlete/activities?before=${fechaInicio}&after=${fechaFin}&access_token=${data.access_token}`).subscribe((dataa: any[])=>resolve(dataa));
        this.http.get(`https://www.strava.com/api/v3/athlete/activities?after=${fechaInicio}&before=${fechaFin}&access_token=${data.access_token}`).subscribe((dataa: any[])=>resolve(dataa));

        // this.http.get(`https://www.strava.com/api/v3/activities/2543825480?access_token=${data.access_token}`).subscribe(dataaa=>console.log(dataaa));
      })

      //`https://www.strava.com/api/v3/activities/${act}?access_token=${data.access_token}`

    })
  }



}
