import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { TopicShowPage } from '../topics/topic-show/topic-show';


@IonicPage()
@Component({
  selector: 'page-discover',
  templateUrl: 'discover.html',
})
export class DiscoverPage {
  URL_da_API: string = "/herokuapi/";
  user: any;
  topic: any = {};

  likes: any = [];
  like: any;
  
  dislikes: any = [];
  dislike: any;

  comments: any = [];
  comment: any;
  content: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    private http: Http,
    private platform: Platform) {
    if (this.platform.is("cordova")){
      this.URL_da_API = "https://hackaton-api.herokuapp.com/"
    }
  }

  ionViewWillLoad(){
    //this.storage.get('user').then((val) => {this.user = val; });
    this.user = this.navParams.get('user');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscoverPage');
    this.getTopic();
    this.getComments();
    this.getLike();
    this.getDislike();
  }

  getTopic(){
    this.http.get(this.URL_da_API+"/random_topics/"+this.user.id)
    .subscribe(dados => {
      this.topic = dados.json();
      return dados;
    }, e => {
      console.log(e);
    });
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
      return data;
    }, error => {
      console.log(error);
    });
  }

  removeLike(id: string){
    this.http.delete(this.URL_da_API+"topics/" + this.topic.id + "/like/" + id)
      .subscribe(dados => {
        const index = this.likes.findIndex(est => est.id === parseInt(id));
        this.likes.splice(index, 1);
        return dados;
      }, e => {
      console.log(e);
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
      this.navCtrl.push(TopicShowPage, { topic: this.topic, user: this.user });
      return data;
    }, error => {
      console.log(error);
    });
  }

  removeDislike(id: string){
    this.http.delete(this.URL_da_API+"topics/" + this.topic.id + "/dislike/" + id)
      .subscribe(dados => {
        const index = this.dislikes.findIndex(est => est.id === parseInt(id));
        this.dislikes.splice(index, 1);
        return dados;
      }, e => {
      console.log(e);
    });
  }

}
