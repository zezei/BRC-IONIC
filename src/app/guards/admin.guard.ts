import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {
  constructor(private commonService: CommonService) {}
  canLoad(): Observable<boolean> | Promise<boolean> | boolean{
    
    return this.commonService.verificarAdminToken();
  }
}
