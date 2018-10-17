import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { UsersPage } from '../users/users';
import { AuthService } from '../../services/auth.service';
import { TopicsPage } from '../topics/topics';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController, 
    public menuCtrl: MenuController,
    private auth: AuthService) {

  }

  openUsers(){
    this.navCtrl.push(UsersPage);
  }

  openTopics(){
    this.navCtrl.push(TopicsPage);
  }

  logout() {
    this.menuCtrl.close();
    this.auth.signOut();
    this.navCtrl.setRoot(HomePage);
  }

}
