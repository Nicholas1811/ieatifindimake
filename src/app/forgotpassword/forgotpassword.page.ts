import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  forgotPasswordEmail;

  constructor(private userService : UserService, private toastController: ToastController) { }

  ngOnInit() {
  }
  //Sending to email reset password link.
  forgotYourPassword(){
    if (this.forgotPasswordEmail == null) {
      this.toastController.create({
        message: "Fill in the fields",
        duration: 2000
      }).then(alert => alert.present());
    } else {
      this.userService.forgotYourPassword(this.forgotPasswordEmail)
        .then((res) => {
          this.toastController.create({
            message: "Check your email",
            duration: 2000
          }).then(alert => alert.present());
        }).catch((error) => {
          this.toastController.create({
            message: error.message,
            duration: 2000
          }).then(alert => alert.present());
        })
    }
  }
}
