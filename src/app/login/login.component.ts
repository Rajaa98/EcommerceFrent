import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
  }

  onLogin(dataForm:any){
    this.authService.login(dataForm.username,dataForm.password);
    if(this.authService.isAuthenticated){
      this.authService.saveAuthenticatedUsr();
      this.router.navigateByUrl('');
    }
  }


}
