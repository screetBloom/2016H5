import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { ViewChild } from '@angular/core';
//import { Slides } from 'ionic-angular';//注入轮播



@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  //@ViewChild('mySlider') slider:Slides;

  constructor(public navCtrl: NavController){

  }//con

}
