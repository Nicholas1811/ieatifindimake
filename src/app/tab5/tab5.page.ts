import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ReviewsService } from '../reviews.service';
import { FavouritesService } from '../favourites.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ToastController } from '@ionic/angular';
import  {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  //Defining userEmail and userName as interpolattion.
  userEmail;
  userName;
  usernames;
  profileImages;
  //Array to store user's review and user's favourite for deleting.
  myReviewArray: any = [];
  myFavouritesArray: any = [];
  constructor(private userService: UserService, private mAuth: AngularFireAuth, private router: Router, private reviewService: ReviewsService,
    private favouriteService: FavouritesService, private mFirestore: AngularFirestore, private alertController: AlertController,
    private googlePlus: GooglePlus, private toastController: ToastController, private storage : AngularFireStorage) {
    this.userEmail = this.mAuth.auth.currentUser.email;
    //Getting user info for displaying
    this.userService.getUsername(this.mAuth.auth.currentUser.uid).subscribe((username) => {
      this.userName = username;
      this.usernames = this.userName.username
      this.profileImages = this.userName.profileImage
    });
    //Getting user fav and review for deleting
    this.reviewService.getMyReviews().subscribe((myReviews) => {
      this.myReviewArray = myReviews;
    })
    this.favouriteService.getFavourites().subscribe((myFavourites) => {
      this.myFavouritesArray = myFavourites;
    })
  }

  ngOnInit() {
    console.log(this.userEmail);
  }
  //Async function which requires the user to reauthenticate before being able to update their credentials.
  async updateUser() {
    if (this.mAuth.auth.currentUser.providerData[0].providerId == "google.com") {
      console.log("Google user")
      let params = {
        'webClientId': '962950736308-8a1bfkp64e1hbfd0mbioi72q1am3qe1k.apps.googleusercontent.com',
        'offline': true
      }
      //Here has bugs, 27/7/2020
      this.googlePlus.login(params)
        .then(async user => {
          await this.mAuth.auth.currentUser.reauthenticateWithCredential(auth.GoogleAuthProvider.credential(user.idToken, null))
            .then((res) => {
              this.toastController.create({
                message: "Successfully reauthenticated",
                duration: 2000
              }).then(alert => alert.present());
              this.router.navigateByUrl('/userupdate');
            }).catch((err) => {
              this.toastController.create({
                message: "Failed to reauthenticate",
                duration: 2000
              }).then(alert => alert.present());
            })
          this.googlePlus.disconnect()

        })
    } else {
      const alert = this.alertController.create({
        header: 'Reauthenticate before you update.',
        inputs: [
          {
            name: "reAuthEmail",
            type: 'email',
          },
          {
            name: "reAuthPassword",
            type: 'password',
          }
        ],
        buttons: [{
          text: 'Ok',
          handler: (alertData => {
            console.log(alertData.reAuthEmail);
            console.log(alertData.reAuthPassword);
            var user = this.mAuth.auth.currentUser;
            var credential = auth.EmailAuthProvider.credential(alertData.reAuthEmail, alertData.reAuthPassword)
            user.reauthenticateWithCredential(credential).then((success) => {
              this.toastController.create({
                message: "Successfully reauthenticated",
                duration: 2000
              }).then(alert => alert.present());
              this.router.navigateByUrl('/userupdate');
            }).catch((err) => {
              this.toastController.create({
                message: "Failed to reauthenticate",
                duration: 2000
              }).then(alert => alert.present());
              console.log(err)
            })
          })
        }]
      }).then(alert => alert.present());
    }
  }
  //Code to delete user and previous records(using for each).
  async deleteUser() {
    if (this.mAuth.auth.currentUser.providerData[0].providerId == "google.com") {
      console.log("Google user")
      let params = {
        'webClientId': '962950736308-8a1bfkp64e1hbfd0mbioi72q1am3qe1k.apps.googleusercontent.com',
        'offline': true
      }
      this.googlePlus.login(params)
        .then(async user => {
          await this.mAuth.auth.currentUser.reauthenticateWithCredential(auth.GoogleAuthProvider.credential(user.idToken, null))
            .then(async (success) => {

              this.mFirestore.collection("Users").doc(success.user.uid).delete().then((res) => {
                this.mAuth.auth.currentUser.delete().then((res) => {
                  console.log(res)
                  var googleBatch = this.mFirestore.firestore.batch();
                  this.myReviewArray.forEach(element => {
                    googleBatch.delete(this.mFirestore.firestore.collection("Reviews").doc(element.id));
                    // this.mFirestore.collection('Reviews').doc(element.id).delete();
                  });
                  this.myFavouritesArray.forEach(elements => {
                    googleBatch.delete(this.mFirestore.firestore.collection("Favourites").doc(elements.id))
                    // this.mFirestore.collection("Favourites").doc(elements.id).delete();
                  })
                  googleBatch.commit()
                  this.storage.ref(success.user.uid).delete();
                  this.toastController.create({
                    message: "Account Successfully Deleted",
                    duration: 2000
                  }).then(alert => alert.present());
                  this.router.navigateByUrl('/login')
                }).catch((err) => {})
              })
            }).catch((err) => {
              this.toastController.create({
                message: "Failed to delete account",
                duration: 2000
              }).then(alert => alert.present());
            })
          this.googlePlus.disconnect()

        })
    } else {
      const alert = this.alertController.create({
        header: 'Reauthenticate before you delete.',
        inputs: [
          {
            name: "reAuthEmail",
            type: 'email',
          },
          {
            name: "reAuthPassword",
            type: 'password',
          }
        ],
        buttons: [{
          text: 'Ok',
          handler: (async alertData => {
            console.log(alertData.reAuthEmail);
            console.log(alertData.reAuthPassword);
            var user = this.mAuth.auth.currentUser;
            var credential = auth.EmailAuthProvider.credential(alertData.reAuthEmail, alertData.reAuthPassword)
            await user.reauthenticateWithCredential(credential).then(async (success) => {
              console.log(success.user.uid)
              this.mFirestore.collection("Users").doc(success.user.uid).delete().then((res) => {
                this.mAuth.auth.currentUser.delete().then((res) => {
                  console.log(res)
                  var normalBatch = this.mFirestore.firestore.batch();

                  this.myReviewArray.forEach(element => {
                    normalBatch.delete(this.mFirestore.firestore.collection("Reviews").doc(element.id));
                    // this.mFirestore.collection("Reviews").doc(element.id).delete();
                  });
                  this.myFavouritesArray.forEach(elements => {
                    normalBatch.delete(this.mFirestore.firestore.collection("Favourites").doc(elements.id));
                    // this.mFirestore.collection("Favourites").doc(elements.id).delete();
                  })
                  
                  normalBatch.commit();
                  this.storage.ref(success.user.uid).delete();
                  this.toastController.create({
                    message: "Account Successfully Deleted",
                    duration: 2000
                  }).then(alert => alert.present());
                  this.router.navigateByUrl('/login')
                }).catch((err) => {})
              })
            }).catch((err) => {
              this.toastController.create({
                message: "Failed to delete account",
                duration: 2000
              }).then(alert => alert.present());
            })
          })
        }]
      }).then(alert => alert.present());
    }

  }
  //Logout 
  logout() {
    this.userService.logout()
    this.router.navigateByUrl('/login');
  }

}
