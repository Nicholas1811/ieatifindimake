import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from '../user.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-gettingusername',
  templateUrl: './gettingusername.page.html',
  styleUrls: ['./gettingusername.page.scss'],
})
export class GettingusernamePage implements OnInit {
  googleUsername;

  constructor(private mAuth: AngularFireAuth,private userService: UserService,private router: Router,
    private toastController : ToastController) { }

  ngOnInit() {
  }
  //Code to retrieve google user username.
  async signUpWithGoogle(){
    if(this.googleUsername == null){
      this.toastController.create({
        message: "Fill in the fields",
        duration: 2000
      }).then(alert => alert.present());
    }
    else{
      await this.userService.signUpUserIntoFirestore(this.mAuth.auth.currentUser.uid,this.googleUsername, "https://firebasestorage.googleapis.com/v0/b/sem1comt.appspot.com/o/userlogo.png?alt=media&token=9bd7fe16-4d23-440f-a6e1-099733ab5dc1").then((res)=>{
        const toast = this.toastController.create({
          message: 'You have successfully signed up',
          duration: 2000
        }).then(toast => toast.present());
      this.router.navigateByUrl('/tabs/tab1');
      });
    }

  }

}
