import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { TopicShowPage } from '../topics/topic-show/topic-show';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  URL_da_API: string = "/herokuapi/";
  favorites: any = [];
  user: any;
  topic: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public storage: Storage) {
  }


  ionViewWillLoad(){
    this.storage.get('user').then((val) => {this.user = val; });
    this.user = this.navParams.get('user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
    this.getFavorites();
  }

  getFavorites(){
    this.http.get(this.URL_da_API+"users/" + this.user.id + "/liked_topics")
    .subscribe(dados => {
      this.favorites = dados.json();
      return dados;
    }, e => {
      console.log(e);
    });
  }

  getTopic(id: string){
    this.http.get(this.URL_da_API+"topics/"+id)
      .subscribe(dados => {
        this.topic = dados.json();
        this.navCtrl.push(TopicShowPage, { topic: this.topic });
    return dados;
      }, e => {
      console.log(e);
    });
  }

}