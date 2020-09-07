import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  Email;
  Username;
  Password;
  confirmPassword;
  signInResponse: any = [];
  googleSignInRespoonse: any = [];
  facebookSignInResponse: any = [];
  constructor(private userService: UserService,
    private toastController: ToastController,
    private googlePlus: GooglePlus,
    private router: Router,
    private mAuth: AngularFireAuth) { }

  ngOnInit() {
  }
  //Codes for sign up.
  async signUp() {
    if (this.Email == null || this.Password == null || this.Username == null || this.confirmPassword == null) {
      this.toastController.create({
        message: 'Fill In The Fields',
        duration: 1000
      }).then(alert => alert.present());
    } else {
      if (this.Password != this.confirmPassword) {
        this.toastController.create({
          message: 'Your passwords do not match',
          duration: 1000
        }).then(alert => alert.present());
      } else {
        this.signInResponse = await this.userService.signUpUser(this.Email, this.Password)
        this.userService.signUpUserIntoFirestore(this.signInResponse.user.uid, this.Username, "https://firebasestorage.googleapis.com/v0/b/sem1comt.appspot.com/o/userlogo.png?alt=media&token=9bd7fe16-4d23-440f-a6e1-099733ab5dc1").then((user) => {
          const toast = this.toastController.create({
            message: 'You have successfully signed up',
            duration: 2000
          }).then(toast => toast.present());
        }
        ).catch(function (error) {
          console.log(error)
        })
        this.router.navigateByUrl('/tabs/tab1')
      }

    }

  }

  //Code to sign up the google user and bringing the user into the username page to retrieve username field from user.
  googleSignUp() {
    let params = {
      'webClientId': '962950736308-8a1bfkp64e1hbfd0mbioi72q1am3qe1k.apps.googleusercontent.com',
      'offline': true
    }
    this.googlePlus.login(params)
      .then(user => {
        this.mAuth.auth.signInWithCredential(auth.GoogleAuthProvider.credential(user.idToken, null))
        this.googlePlus.disconnect()
        this.router.navigateByUrl('/gettingusername');
      })

    // this.googleSignInRespoonse = await this.userService.googleLogin()
    // console.log(this.googleSignInRespoonse);
    // this.router.navigateByUrl('/gettingusername');
  }
}
