import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {auth} from 'firebase/app';
import { AlertController } from '@ionic/angular';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private mAuth : AngularFireAuth,
    private mFirestore : AngularFirestore, private alertController : AlertController, private router: Router) { }
    //Code to sign up user into authentication firebase
  signUpUser(email,password){
    return this.mAuth.auth.createUserWithEmailAndPassword(email,password);
  }
  //Code to add user information into firebase
  signUpUserIntoFirestore(id,username, profileImage){
    return this.mFirestore.collection("Users").doc(id).set({username: username, profileImage : profileImage})
  }
  getUsername(id){
    return this.mFirestore.collection("Users").doc(id).valueChanges();
  }
  //Code to log the user in
  login(email,password){
    return this.mAuth.auth.signInWithEmailAndPassword(email,password);
  }
  //Code to send the user a reset password email
  forgotYourPassword(password){
    return this.mAuth.auth.sendPasswordResetEmail(password);
  }
  //Logout codes
  logout(){
    return this.mAuth.auth.signOut();
  }
  //Delete user from firebase authentications
  deleteUser(){
    return this.mAuth.auth.currentUser.delete();
  }
  //Delete user's username
  deleteUserInfo(){
    return this.mFirestore.collection("Users").doc(this.mAuth.auth.currentUser.uid).delete()
  }
  //Update user's username
  updateUserInfo(username){
    return this.mFirestore.collection("Users").doc(this.mAuth.auth.currentUser.uid).update({username: username})
  }
  //Update the user's password
  updateUserPassword(password){
    return this.mAuth.auth.currentUser.updatePassword(password)
  }
  // reAuthenticateUser(useremail,userpassword){
  //   var user = this.mAuth.auth.currentUser;
  //   var credential = auth.EmailAuthProvider.credential(useremail,userpassword)
  //   return user.reauthenticateWithCredential(credential).then(function(){
  //     console.log("Success")
  //   }).catch(function(error){
  //     console.log(error)
  //   })
  // }
}
