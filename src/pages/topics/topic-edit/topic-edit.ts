import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { TopicShowPage } from '../topic-show/topic-show';
import { Http, Response } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-topic-edit',
  templateUrl: 'topic-edit.html',
})
export class TopicEditPage {
  URL_da_API: string = "/herokuapi/";
  topic: Response;
  resposta: Response;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public platform: Platform,
    public http: Http) {
    if (this.platform.is("cordova")){
      this.URL_da_API = "https://hackaton-api.herokuapp.com/"
    }

    this.topic = navParams.get('topic');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopicEditPage');
  }

  updateTopic(id: string){
    this.http.put(this.URL_da_API+"topics/"+id, this.topic)
      .subscribe(data => {
        this.resposta = data.json();
        this.navCtrl.push(TopicShowPage, { parceiro: this.resposta });
        return data;
      }, error => {
        console.log(error);
      });
  }
}
