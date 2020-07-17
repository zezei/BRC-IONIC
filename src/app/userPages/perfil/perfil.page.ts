import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx/';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {


  entrenos: any[] = [];
  constructor(public userService: UserService, private iab: InAppBrowser, private commonService: CommonService) { }

  ngOnInit() {
    this.userService.getPersonalInfo(this.commonService.decodedUser.uid);
  }

  vincular(){
    const browser = this.iab.create(`https://www.strava.com/oauth/authorize?client_id=26310&redirect_uri=http://localhost:5000/planesbrc/us-central1/api/strava_token?cliente=${this.userService.cliente.uid}&response_type=code&scope=activity:write`,'_system');
    browser.on('exit').subscribe(data=>console.log(data))
  }

  async obtenerMisUltimosEntrenos(){
    this.entrenos = await this.userService.getStravaActivities();
    console.log(this.entrenos)
  }
}
