import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-discover',
  templateUrl: 'discover.html',
})
export class DiscoverPage {
  URL_da_API: string = "/herokuapi/";
  user: any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    private http: Http,
    private platform: Platform) {
    if (this.platform.is("cordova")){
      this.URL_da_API = "https://hackaton-api.herokuapp.com/"
    }

    this.storage.get('user').then((val) => {this.user = val; });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscoverPage');
  }

}
