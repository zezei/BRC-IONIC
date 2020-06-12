import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GuiService {

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController) { }

  async alertaInformativa(message: string){
    const alert = await this.alertCtrl.create({
      message,
      buttons: ['OK']
    })

    alert.present()
  }

  async alertToast(message: string){
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      position: 'top'
    })
    toast.present()
  }
}
