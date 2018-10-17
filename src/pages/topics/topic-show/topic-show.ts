import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Http } from "@angular/http";
import { TopicEditPage } from '../topic-edit/topic-edit';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-topic-show',
  templateUrl: 'topic-show.html',
})
export class TopicShowPage {
  URL_da_API: string = "/herokuapi/";
  topic: any;
  user: any;

  comments: any = [];
  content: string;

  likes: any = [];
  dislikes: any = [];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public platform: Platform,
    public http: Http,
    public storage: Storage,
    public toastCtrl: ToastController) {
    if (this.platform.is("cordova")){
      this.URL_da_API = "https://hackaton-api.herokuapp.com/"
    }
    this.user = this.navParams.get('user');
    this.topic = this.navParams.get('topic');
  }

  ionViewWillLoad(){
    //this.storage.get('user').then((val) => {this.user = val; });
    
    console.log(this.user, this.topic);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopicShowPage');
    this.getComments();
    this.getLike();
    this.getDislike();
  }

  getComments(){
    this.http.get(this.URL_da_API+"topics/" + this.topic.id + "/comments")
    .subscribe(dados => {
      this.comments = dados.json();
      return dados;
    }, e => {
      console.log(e);
    });
  }

  createComment(){
    let comment = { 
      comment: {
        content: this.content, 
        user_id: this.user.id,
        topic_id: this.topic.id 
      }
    }

    this.http.post(this.URL_da_API + "topics/" + this.topic.id + "/comments", comment)
    .subscribe(data => {
      this.navCtrl.push(TopicShowPage, { topic: this.topic, user: this.user });
      return data;
    }, error => {
      console.log(error);
    });
  }

  destroyComment(id: string){
    this.http.delete(this.URL_da_API+"topics/" + this.topic.id + "/comments/" + id)
      .subscribe(dados => {
        const index = this.comments.findIndex(est => est.id === parseInt(id));
        this.comments.splice(index, 1);
        return dados;
      }, e => {
      console.log(e);
    });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Atualizado com sucesso!',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  getLike(){
    this.http.get(this.URL_da_API+"topics/" + this.topic.id + "/show_like/" + this.user.id)
    .subscribe(dados => {
      this.likes = dados.json();
      return dados;
    }, e => {
      console.log(e);
    });
  }

  createLike(){
    let like = { 
      user_id: this.user.id,
      topic_id: this.topic.id 
    }

    this.http.patch(this.URL_da_API + "topics/" + this.topic.id + "/like/" + this.user.id, like)
    .subscribe(data => {
      this.navCtrl.push(TopicShowPage, { topic: this.topic, user: this.user });
      this.presentToast();
      return data;
    }, error => {
      console.log(error);
    });
  }

  getDislike(){
    this.http.get(this.URL_da_API+"topics/" + this.topic.id + "/show_dislike/" + this.user.id)
    .subscribe(dados => {
      this.dislikes = dados.json();
      return dados;
    }, e => {
      console.log(e);
    });
  }

  createDislike(){
    let dislike = { 
      user_id: this.user.id,
      topic_id: this.topic.id 
    }

    this.http.patch(this.URL_da_API + "topics/" + this.topic.id + "/dislike/" + this.user.id, dislike)
    .subscribe(data => {
      console.log(data.json());
      this.navCtrl.push(TopicShowPage, { topic: this.topic, user: this.user });
      this.presentToast();
      return data;
    }, error => {
      console.log(error);
    });
  }

  goToEdit(){
    this.navCtrl.push(TopicEditPage, { topic: this.topic });
  }

}
