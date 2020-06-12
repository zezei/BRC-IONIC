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
  constructor(private auth: AngularFireAuth, private http: HttpClient, private storage: Storage, private navCtrl: NavController) { }


  login(username: string, password: string) {
    return new Promise((resolve) => {
      this.auth.signInWithEmailAndPassword(username, password).then(async data => {
        this.token = await data.user.getIdToken();
        this.http.post(`${URL}/login?token=${this.token}`, '').subscribe((dataLogin: any) => {
          console.log(dataLogin)
          if (dataLogin.ok) {
            this.guardarToken(this.token)
            this.userAdmin = dataLogin.user.adminUser;
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

  }
  async verificarAdminToken(): Promise<boolean>{
    await this.cargarToken();
    if (!this.token){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }
    return new Promise<boolean>( resolve=>{

      this.http.get(`${URL}/getAdminUser?token=${this.token}`)
      .subscribe( (data:any)=>{
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
}
