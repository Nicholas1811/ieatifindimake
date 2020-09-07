import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../reviews.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { AlertController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userupdate',
  templateUrl: './userupdate.page.html',
  styleUrls: ['./userupdate.page.scss'],
})
export class UserupdatePage implements OnInit {
  //myReviews is to get the user's review to ensure username gets updated
  myReviews: any = [];
  //ngModels, usernames and passwords
  usernames;
  passwords;
  oldUsername;
  oldImage;
  userDetails;
  //userBoolean to check current user provider. If current user is Google user, boolean is true, which hides the
  //password and passwordupdate button else, if user is normal, boolean is false and shows the fields.
  userBoolean;
  constructor(private reviewService: ReviewsService, private mFirestore: AngularFirestore, private userService: UserService,
    private alertController: AlertController, private mAuth: AngularFireAuth, private toastController : ToastController,
    private storage : AngularFireStorage, private camera : Camera, private router : Router) {
      //Getting my reviews in case user wants to delete his account
    this.reviewService.getMyReviews().subscribe((userReviews) => {
      this.myReviews = userReviews
      if(this.mAuth.auth.currentUser.providerData[0].providerId == "google.com"){
        this.userBoolean = true;
      }else{
        this.userBoolean = false;
      }
    })
    this.userService.getUsername(this.mAuth.auth.currentUser.uid).subscribe((details)=>{
      this.userDetails = details
      this.oldImage = this.userDetails.profileImage
      this.oldUsername = this.userDetails.username;
    })
  }

  ngOnInit() {
  }
  //Update password code
  async updatePassword() {
    await this.userService.updateUserPassword(this.passwords).then((res)=>{
      this.toastController.create({
        message: "Password successfully updated",
        duration : 2000
      }).then(alert=>
        alert.present())
    }).catch((err)=>{
      this.toastController.create({
        message: err,
        duration : 2000
      }).then(alert=>
        alert.present())
    })
    
  }
  //Code to update user username and his reviews(for each).
  async updateUsername() {
    console.log(this.usernames);
    await this.userService.updateUserInfo(this.usernames).then((res)=>{
      this.myReviews.forEach(element => {
        this.mFirestore.collection("Reviews").doc(element.id).update({ username: this.usernames })
      });
      this.toastController.create({
        message: "Username successfully updated",
        duration : 2000
      }).then(alert=>
        alert.present())
    });


  }
  //upload image and changing all required fields
  uploadImage(){
    let options: CameraOptions ={
      quality : 100,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType : this.camera.EncodingType.JPEG,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
      targetHeight : 400,
      targetWidth : 400
    }
    this.camera.getPicture(options).then(async (data)=>{
      var storage = this.storage.ref(this.mAuth.auth.currentUser.uid);
      var message = data;
      await storage.putString(message , 'base64', { contentType: 'image/jpg' }).then((savedPicture) => {
        console.log(savedPicture.ref.getDownloadURL())
        savedPicture.ref.getDownloadURL().then((res)=>{
          this.myReviews.forEach(element => {
            console.log(element.id);
            this.mFirestore.collection("Reviews").doc(element.id).update({userprofileimagereview: res});
          });
          this.mFirestore.collection("Users").doc(this.mAuth.auth.currentUser.uid).update({profileImage : res}).then((res)=>{
            this.toastController.create({
              message : "Successfully updated image",
              duration : 2000
            }).then(alert => alert.present())
          });
          
        })
  });
      
    });
  }
  //delete image
  removeImage(){
    this.mFirestore.collection("Users").doc(this.mAuth.auth.currentUser.uid).update({profileImage : "https://firebasestorage.googleapis.com/v0/b/sem1comt.appspot.com/o/userlogo.png?alt=media&token=9bd7fe16-4d23-440f-a6e1-099733ab5dc1"})
    this.myReviews.forEach(element=>{
      this.mFirestore.collection("Reviews").doc(element.id).update({userprofileimagereview : "https://firebasestorage.googleapis.com/v0/b/sem1comt.appspot.com/o/userlogo.png?alt=media&token=9bd7fe16-4d23-440f-a6e1-099733ab5dc1"});
    });
    this.toastController.create({
      message : "Successfully removed image",
      duration : 2000
    }).then(alert => alert.present())
  }

}
