import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Slides } from 'ionic-angular';//注入轮播
import { ViewChild } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('mySlider') slider:Slides;

  autoPlay(){
    this.slider.startAutoplay();
  }

  //页面进入时启动自动播放
  ionViewDidEnter(){
    this.slider.startAutoplay();
  }
  //页面离开时停止自动播放
  ionViewDidLeave(){
    this.slider.stopAutoplay();
  }

  constructor(public navCtrl: NavController) {

  }



  //


}
