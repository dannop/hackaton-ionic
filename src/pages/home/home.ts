import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { UsersPage } from '../users/users';
import { AuthService } from '../../services/auth.service';


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

  logout() {
    this.menuCtrl.close();
    this.auth.signOut();
    this.navCtrl.setRoot(HomePage);
  }

}
