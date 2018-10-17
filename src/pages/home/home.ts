import { Component } from '@angular/core';
import { NavController, MenuController, Platform } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { TopicsPage } from '../topics/topics';
import { PerfilPage } from '../perfil/perfil';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { FavoritesPage } from '../favorites/favorites';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  URL_da_API: string = "/herokuapi/";
  users: any = [];
  user: any;

  constructor(
    public navCtrl: NavController, 
    public menuCtrl: MenuController,
    private auth: AuthService,
    private platform: Platform,
    private http: Http,
    private storage: Storage) {
      if (this.platform.is("cordova")){
        this.URL_da_API = "https://hackaton-api.herokuapp.com/"
      }
  }

  ionViewWillLoad(){
    this.getUserInUsers();
    this.storage.set('user', this.user);
  }

  getUserInUsers(){
    this.http.get(this.URL_da_API + "users/")
      .subscribe(data => {
        this.users = data.json();
        for (let _p= 0; _p < this.users.length; _p++) {
          if ( this.users[_p].email == this.auth.getEmail() ){  
            this.user = this.users[_p];
          }
        }
      }, e => {
        console.log(e);
      });
  }

  openFavorites(){
    this.navCtrl.push(FavoritesPage, { user: this.user });
  }

  openTopics(){
    this.navCtrl.push(TopicsPage);
  }

  openPerfil(){
    this.navCtrl.push(PerfilPage, { user: this.user });
  }

  logout() {
    this.menuCtrl.close();
    this.storage.clear();
    this.auth.signOut();
    this.navCtrl.setRoot(HomePage);
  }

}
