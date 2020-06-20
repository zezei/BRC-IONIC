import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  // loginUser = {
  //   email: 'catgolondrinas@gmail.com',
  //   password: 'triston35817100'
  // };

  loginUser = {
    email: 'test@test.com',
    password: 'test123'
  };
  iniciandoSesion = false;
  constructor(private commonService: CommonService, private navCtrl: NavController) { }

  ngOnInit() {
  }

  async login(formLogin: NgForm){
    this.iniciandoSesion = true;
    if (formLogin.invalid){return;}
    const exito = await this.commonService.login(this.loginUser.email, this.loginUser.password)
    if (exito){
      if (this.commonService.userAdmin){
        this.navCtrl.navigateRoot('admin/tabs/tab1', {animated: true})
        this.iniciandoSesion = false;
      }
      else{
        this.navCtrl.navigateRoot('users/tabs/home', {animated: true})
        this.iniciandoSesion = false;

        console.log("redireccionar a user page")
      }
    }
    else{
      console.log("Usuario o password incorrecto")
    }
  }

}
