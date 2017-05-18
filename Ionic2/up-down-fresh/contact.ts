import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  //
  items = [];

  constructor() {
    for (let i = 0; i < 10; i++) {
      this.items.push( this.items.length );
    }
  }
  //上拉刷新
  doRefresh(refresher) {
    console.log('开始上拉刷新', refresher);

    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        this.items.push( this.items.length );
      }
      console.log('上拉刷新结束');
      refresher.complete();
    }, 1000);
  }

  //下拉刷新
  doInfinite(infiniteScroll) {
    console.log('开始下拉刷新');

    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        this.items.push( this.items.length );
      }

      console.log('下拉刷新结束');
      infiniteScroll.complete();
    }, 1000);
  }



}
