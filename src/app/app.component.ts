import {Component, OnInit} from '@angular/core';
import {CatelogueService} from "./service/catelogue.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "./service/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 public categories:any;
 public currentCategories:any;



  constructor(private catService:CatelogueService, private  router:Router, private authService:AuthenticationService) {}

  ngOnInit(): void {
    this.authService.loadAuthenticatedUserFromLocalStorage();
    this.getCategories();


  }

  private getCategories() {
    this.catService.getResource("/categories")
      .subscribe(data=>{
        this.categories = data;
      },err => {
        console.log(err);
      })
  }


  getProductByCat(c:any) {
    this.currentCategories;
    this.router.navigateByUrl('products/2/'+c.id);
  }

  onSelectedProducts() {
    this.currentCategories=undefined;
    this.router.navigateByUrl("/products/1/0");
  }

  onProductsPromo(){
    this.currentCategories=undefined;
    this.router.navigateByUrl("/products/3/0");
  }

  onProductsDispo(){
    this.currentCategories=undefined;
    this.router.navigateByUrl("/products/4/0");
  }

  onLogout(){
    this.authService.removeTokenFromLocalStorage();
    this.router.navigateByUrl('/login');
  }
}
