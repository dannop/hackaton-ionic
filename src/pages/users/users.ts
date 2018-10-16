import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  URL_da_API: string = "/herokuapi/";
  users: any =[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    public http: Http
    ) {
    if (this.platform.is("cordova")){
      this.URL_da_API = "https://hackaton-api.herokuapp.com/"
    }
  }

  ionViewDidLoad() {
    this.getUsers();
  }

  getUsers(){
    this.http.get(this.URL_da_API+"users/")
    .subscribe(dados => {
      this.users = dados.json();
      console.log(this.users);
    }, e => {
      console.log(e);
    });
  }

}
