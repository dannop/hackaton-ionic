import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Http, Response } from "@angular/http";
import { TopicShowPage } from './topic-show/topic-show';
import { TopicNewPage } from './topic-new/topic-new';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-topics',
  templateUrl: 'topics.html',
})
export class TopicsPage {
  URL_da_API: string = "/herokuapi/";
  topics: any = [];
  topic: Response;
  user: any;

  descending: boolean = false;
  order: number;
  column: string = 'title';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public platform: Platform,
    public storage: Storage) {
      if (this.platform.is("cordova")){
        this.URL_da_API = "https://hackaton-api.herokuapp.com/"
      }
  }

  ionViewWillLoad(){
    //this.storage.get('user').then((val) => {this.user = val; });
    this.user = this.navParams.get('user');
    console.log(this.user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopicsPage');
    this.getTopics();
    this.sort();
  }

  getTopics(){
    this.http.get(this.URL_da_API+"topics/")
    .subscribe(dados => {
      this.topics = dados.json();
      return dados;
    }, e => {
      console.log(e);
    });
  }

  getTopic(id: string){
    this.http.get(this.URL_da_API+"topics/"+id)
      .subscribe(dados => {
        this.topic = dados.json();
        this.navCtrl.push(TopicShowPage, { user: this.user, topic: this.topic });
    return dados;
      }, e => {
      console.log(e);
    });
  }

  destroyTopic(id: string){
    this.http.delete(this.URL_da_API+"topics/"+id)
      .subscribe(dados => {
        const index = this.topics.findIndex(est => est.id === parseInt(id));
        this.topics.splice(index, 1);
        console.log(dados);
    return dados;
      }, e => {
      console.log(e);
    });
  }

  goToNew(){
    this.navCtrl.push(TopicNewPage);
  }

  showSearchbar() {
    let searchbar = document.getElementsByClassName("searchbar-topics")[0];
    let botaosearch = document.getElementsByClassName("botao-searchbar")[0];
    let searchbarcontainer = document.getElementsByClassName("searchbar-container")[0];
    if (searchbar.classList.contains("hidden")) {
      searchbar.classList.remove("hidden");
      searchbarcontainer.classList.remove("hidden-container");
      botaosearch.classList.add("hidden");
    }

    else {
      searchbar.classList.add("hidden");
      searchbarcontainer.classList.add("hidden-container");
      botaosearch.classList.remove("hidden");
    }
  }

  filtroAlfabetico() {
    this.column = 'title';
    this.sort();
  }

  sort() {
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

}
