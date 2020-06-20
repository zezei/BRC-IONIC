import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  token = '';
  userAdmin: boolean = false;
  decodedUser: any;
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
}
