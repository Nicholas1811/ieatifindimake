import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service'
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth} from '@angular/fire/auth';
import {GooglePlus} from '@ionic-native/google-plus/ngx';
import {auth} from 'firebase/app';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginEmail;
  loginPassword;
  constructor(private userService: UserService, private toastController : ToastController,
    private router : Router, private mAuth: AngularFireAuth,private googlePlus: GooglePlus, private tts: TextToSpeech) {
    }

  ngOnInit() {
  }
  //Codes for login function.
  login(){
    if(this.loginEmail == null || this.loginPassword == null){
      this.toastController.create({
        message: "Fill in the fields",
        duration: 2000
      }).then(alert => alert.present());
    }
    this.userService.login(this.loginEmail, this.loginPassword).then((res)=>{
      console.log(this.mAuth.auth.currentUser.uid);
      this.toastController.create({
        message: "You have been successfully logged in",
        duration: 2000
      }).then(alert => alert.present());
      this.router.navigateByUrl('/tabs/tab1')
    }).catch((error) => {
      this.toastController.create({
        message: error.message,
        duration: 2000
      }).then(alert => alert.present());
    })
  }
  //Google login which brings us to the main page
  googleLogin(){
    let params = {
      'webClientId' : '962950736308-8a1bfkp64e1hbfd0mbioi72q1am3qe1k.apps.googleusercontent.com',
      'offline' : true
    }
    this.googlePlus.login(params)
    .then(async user=>{
      await this.mAuth.auth.signInWithCredential(auth.GoogleAuthProvider.credential(user.idToken, null)).then((res)=>{
        this.toastController.create({
          message: "You have been successfully logged in",
          duration: 2000
        }).then(alert => alert.present());
      })
      this.googlePlus.disconnect()
      this.router.navigateByUrl('/tabs/tab1');
    })    
  }

}
