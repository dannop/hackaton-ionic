import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';
import { Http } from '@angular/http';

@Component({
	selector: 'as-page-signup',
	templateUrl: './signup.html'
})
export class SignupPage {
	URL_da_API: string = "/herokuapi/";

	signupError: string;
	form: FormGroup;

	constructor(
		fb: FormBuilder,
		public http: Http,
    	private navCtrl: NavController,
		private auth: AuthService,
		private platform: Platform
	) {
		if (this.platform.is("cordova")){
			this.URL_da_API = "https://hackaton-api.herokuapp.com/"
		  }

		this.form = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});
  }

  signup() {
		let data = this.form.value;
		let credentials = {
			email: data.email,
			password: data.password
		};

		this.railsSignup();

		this.auth.signUp(credentials).then(
			() => this.navCtrl.setRoot(HomePage),
			error => this.signupError = error.message
		);

	}

	railsSignup(){
		let data = this.form.value;
		let credentials = {
			first_name: "",
			last_name: "",
			level: 1,
			email: data.email
		};	

		this.http.post(this.URL_da_API + "users", credentials)
		.subscribe(data => {
			return data;
		}, error => {
			console.log(error);
		});
	}
}
