import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Http } from "@angular/http";
import { TopicEditPage } from '../topic-edit/topic-edit';


@IonicPage()
@Component({
  selector: 'page-topic-show',
  templateUrl: 'topic-show.html',
})
export class TopicShowPage {
  URL_da_API: string = "/herokuapi/";
  topic: any;

  comments: any = [];
  content: string;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public platform: Platform,
    public http: Http) {
    if (this.platform.is("cordova")){
      this.URL_da_API = "https://hackaton-api.herokuapp.com/"
    }

    this.topic = navParams.get('topic');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopicShowPage');
    this.getComments();
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
        user_id: 1,
        topic_id: this.topic.id 
      }
    }

    this.http.post(this.URL_da_API + "topics/" + this.topic.id + "/comments", comment)
    .subscribe(data => {
      this.navCtrl.push(TopicShowPage, { topic: this.topic });
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

  createLike(){
    let like = { 
      user_id: 1,
      topic_id: this.topic.id 
    }

    this.http.post(this.URL_da_API + "topics/" + this.topic.id + "/likes", like)
    .subscribe(data => {
      this.navCtrl.push(TopicShowPage, { topic: this.topic });
      return data;
    }, error => {
      console.log(error);
    });
  }

  createDislike(){
    let dislike = { 
      user_id: 1,
      topic_id: this.topic.id 
    }

    this.http.post(this.URL_da_API + "topics/" + this.topic.id + "/dislikes", dislike)
    .subscribe(data => {
      this.navCtrl.push(TopicShowPage, { topic: this.topic });
      return data;
    }, error => {
      console.log(error);
    });
  }

  goToEdit(){
    this.navCtrl.push(TopicEditPage, { topic: this.topic });
  }

}
