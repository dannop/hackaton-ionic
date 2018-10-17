import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-complete-signup',
  templateUrl: 'complete-signup.html',
})
export class CompleteSignupPage {
  completeForm: FormGroup;
  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder, 
    public navParams: NavParams,
    ){
      this.completeForm = this.formBuilder.group({
        FirstName: [''],
        LastName: [''],
        Photo: ['']
  });
}
signup()
{
  this.navCtrl.push(HomePage);
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad CompleteSignupPage');
  }

}
