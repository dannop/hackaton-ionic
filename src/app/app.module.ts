import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { UsersPage } from '../pages/users/users';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config';

import { NgxErrorsModule } from '@ultimate/ngxerrors';

import { SignupPageModule } from '../pages/signup/signup.module';
import { PipesModule } from '../pipes/pipes.module';
import { TopicsPageModule } from '../pages/topics/topics.module';
import { PerfilPageModule } from '../pages/perfil/perfil.module';

import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    UsersPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgxErrorsModule,
    SignupPageModule,
    PipesModule,
    TopicsPageModule,
    PerfilPageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    UsersPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    AngularFireAuth,
    ImagePicker,
    Base64
  ]
})
export class AppModule {}
