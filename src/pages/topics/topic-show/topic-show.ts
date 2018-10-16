import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Http, Response } from "@angular/http";
import { TopicEditPage } from '../topic-edit/topic-edit';


@IonicPage()
@Component({
  selector: 'page-topic-show',
  templateUrl: 'topic-show.html',
})
export class TopicShowPage {
  URL_da_API: string = "/herokuapi/";
  topic: Response;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    if (this.platform.is("cordova")){
      this.URL_da_API = "https://hackaton-api.herokuapp.com/"
    }

    this.topic = navParams.get('topic');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopicShowPage');
  }

  goToEdit(){
    this.navCtrl.push(TopicEditPage, { topic: this.topic });
  }

}
