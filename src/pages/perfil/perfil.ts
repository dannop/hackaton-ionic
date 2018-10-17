import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  URL_da_API: string = "/herokuapi/";
  user: any;
  response: any;
  imgPreview = 'assets/imgs/Logo.png';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: Storage,
    private imagePicker: ImagePicker,
    private base64: Base64,
    private platform: Platform,
    private http: Http) {
      if (this.platform.is("cordova")){
        this.URL_da_API = "https://hackaton-api.herokuapp.com/"
      }
  }

  ionViewWillLoad(){
    this.storage.get('user').then((val) => {this.user = val; });
    this.user = this.navParams.get('user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  getPhoto() {
    let options = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imgPreview = results[i];
        this.base64.encodeFile(results[i]).then((base64File: string) => {
          this.user.image.url = base64File;
        }, (err) => {
          console.log(err);
        });
      }
      console.log(this.user);
    }, (err) => { });
  }

  updateUser(id: string){
    this.http.put(this.URL_da_API+"users/"+id, this.user)
      .subscribe(data => {
        this.response = data.json();
        this.navCtrl.push(HomePage);
        return data;
      }, error => {
        console.log(error);
      });
  }


}
