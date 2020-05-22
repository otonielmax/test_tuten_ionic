import { User } from './../auth/user';
import { BookingsService } from './../services/bookings.service';
import { Component } from '@angular/core';
import { Storage } from  '@ionic/storage';
import { Booking } from '../services/booking';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  searchTerm: string = "";
  bookings: Booking[] = [];
  filterBookings = [];
  filter: string;
  sortAsc: boolean = false;
  user: User;

  constructor(private bookingService: BookingsService, private storage: Storage, private authService: AuthService, private router: Router) {    
    
  }

  ngOnInit() {
    this.storage.get("USER_DATA").then((val) => {
      console.log(val);
      this.user = val;
      this.loadAllBookings();
    });    
  }

  private loadAllBookings() {
    this.bookingService.getAll(this.user)
    .subscribe((res)=>{
      console.log(res);
      this.bookings = res;
      //this.assignCopy();
      this.filterItems();
    });               
  }

  assignCopy(){
    this.filterBookings = Object.assign([], this.bookings);
  }

  filterItem(value){
    if(!value || value === ''){
      this.assignCopy();
    } // when nothing has typed
    this.filterBookings = Object.assign([], this.bookings).filter(
      item => {
        console.log(item);
        console.log(this.filter);
        console.log(value);
        console.log(item.bookingId.toString().toLowerCase().indexOf(value.toLowerCase()) > -1);
        item.bookingId.toString().toLowerCase().indexOf(value.toLowerCase()) > -1;
      }      
    )
  }

  filterItems() {
    this.filterBookings = this.bookings.filter(item => {
      return item.bookingId.toString().toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }

  sortPrice() {
      this.sortAsc = !this.sortAsc;
      if (this.sortAsc) {
          this.filterBookings.sort((a, b) => a.bookingPrice -  b.bookingPrice);
      }
      else {
          this.filterBookings.sort((a, b) => b.bookingPrice - a.bookingPrice);
      }
  }

  logout() {
    this.authService.logout()
    .then(() => {
      this.router.navigateByUrl('login');
    });
  }
}
