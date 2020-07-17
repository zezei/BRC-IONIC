import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vinculado',
  templateUrl: './vinculado.page.html',
  styleUrls: ['./vinculado.page.scss'],
})
export class VinculadoPage implements OnInit {

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let uid = this.activatedRoute.snapshot.paramMap.get('uid')
    this.userService.getPersonalInfo(uid);
  }

}
