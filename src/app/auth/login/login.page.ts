import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loading: any;

  constructor(private authService: AuthService, private router: Router, public loadingCtrl: LoadingController) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('home');
    }
  }

  login(form){
    this.presentLoading();
    this.authService.login(form.value).subscribe((res)=>{
      this.dismissLoading();
      this.router.navigateByUrl('home');
    });
  }

  async presentLoading() {    
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor espere...'
    });
  
    this.loading.present();
  }

  dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }    
  }

}
