import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../shared/services/cart.service';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isUserAuthenticated: boolean = false;
  CartCount?:number;

  constructor(private authService: AuthenticationService,
    private router: Router,
    private CartService: CartService) { }

  userName?: string;

  async assignAuthentication(res: boolean) {
    this.isUserAuthenticated = res;
  }

  async getCartCount(){
     this.CartService.getAllByUserId(Number(localStorage.getItem('userId'))).subscribe(res=>{
      this.CartCount = res.length;  
    })
  }

  logout() {
    this.authService.logout();
    this.authService.checkIfAuthenticated();
    this.isUserAuthenticated = false;
    this.router.navigate(["/"]);
    this.userName = localStorage.getItem("userName") ? localStorage.getItem("userName")?.toString() : '';
  }

  ngOnInit(): void {
    this.authService.checkIfAuthenticated();
    this.authService.authChanged
      .subscribe(async res => {
        await this.assignAuthentication(res);
        await this.getCartCount();
        this.userName = localStorage.getItem("userName") ? localStorage.getItem("userName")?.toString() : '';
      })
  }

}


