import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { TopicShowPage } from '../topic-show/topic-show';


@IonicPage()
@Component({
  selector: 'page-topic-new',
  templateUrl: 'topic-new.html',
})
export class TopicNewPage {
  URL_da_API: string = "/herokuapi/";
  title: string;
  content: string;
  user_id: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public platform: Platform,
    public http: Http) {

    if (this.platform.is("cordova")){
      this.URL_da_API = "https://hackaton-api.herokuapp.com/"
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopicNewPage');
  }

  createTopic(){
    let topic = {
      title: this.title,
      content: this.content, 
      user_id: 1,
      category_id: 1 
    }
    
    this.http.post(this.URL_da_API + "topics", topic)
      .subscribe(data => {
        this.navCtrl.push(TopicShowPage, { topic: data.json() });
        return data;
      }, error => {
        console.log(error);
      });
  }
}
