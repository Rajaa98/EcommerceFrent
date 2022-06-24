import { Component, OnInit } from '@angular/core';
import {CatelogueService} from "../service/catelogue.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {AuthenticationService} from "../service/authentication.service";
import {Product} from "../model/product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products: any;
  public editPhoto: boolean | undefined;
  public currentProduct: any;
  public selectedFiles: any;
  public progress: number | undefined;
  currentFileUpload: any;
  public currentTime: number | undefined;
  public title: string | undefined
  public timestamp:number |undefined

  constructor(public catService: CatelogueService, private route: ActivatedRoute, private router: Router,public authService:AuthenticationService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let url = val.url;
        console.log(url)

        // @ts-ignore
        let p1 = this.route.snapshot.params.p1;
        if (p1 == 1) {
          this.title = "selection ";
          this.getProducts('/products/search/selectedProducts');
        } else if (p1 == 2) {
          // @ts-ignore
          let idCat = this.route.snapshot.params.p2;
          this.title = "Produit de la categories " + idCat;
          this.getProducts('/categories/' + idCat + '/products')
        } else if (p1 == 3) {

          this.title = "Produits en promontion";
          // @ts-ignore
          let idCat = this.route.snapshot.params.p2;
          this.getProducts('/products/search/promoProducts')
        } else if (p1 == 4) {
          this.title = "produits en Disponibles"
          this.getProducts('/products/search/dispoProducts')
        } else if (p1 == 5) {
          this.title = "Rechercher"
          this.getProducts('/products/search/dispoProducts')
        }
      }
    });

  }

  private getProducts(url: any) {
    this.catService.getResource(url)
      .subscribe(data => {
        this.products = data;
      }, err => {
        console.log(err)
      })
  }

  onEditPhoto(p: any) {
    this.currentProduct = p;
    this.editPhoto = true;
  }

  onSelectedFile(event: any) {
    this.selectedFiles=event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        // @ts-ignore
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        //this.currentTime = Date.now();
        this.timestamp=Date.now();
      }
    }, err => {
      alert("Problème de chargement");
    })


    this.selectedFiles = undefined
  }

  getTS(){
    return this.timestamp;
  }

  public isAdmin(){
    return this.authService.isAdmin();
  }


  onAddProductToCaddy(p:Product) {

  }



  onProductDetails(p:Product) {
    let url = btoa(p._links.product.href)
    this.router.navigateByUrl("product-detail/"+url)
  }


}
