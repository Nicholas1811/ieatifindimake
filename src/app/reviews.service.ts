import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private mAuth: AngularFireAuth, private mFirestore : AngularFirestore) { }
  //Getting the review a recipe has
  getReviewForRecipe(recipeID){
    return this.mFirestore.collection("Reviews", ref=> ref.where("recipeID", "==", recipeID)).valueChanges({idField : "id"});
  }
  //Adding review, sorry boss i type wrong name
  addRecipe(datePosted,recipeID, recipeImage,recipeName,reviewContent,userID,username,userprofileimagereview){
    return this.mFirestore.collection("Reviews").add({datePosted: datePosted, recipeID : recipeID, recipeImage: recipeImage, recipeName: recipeName, reviewContent: reviewContent, userID: userID, username:username, userprofileimagereview: userprofileimagereview});
  }
  //getting user's review
  getMyReviews(){
    return this.mFirestore.collection("Reviews", ref=> ref.where("userID", "==", this.mAuth.auth.currentUser.uid)).valueChanges({idField : "id"});
  }
  //Deleting user review
  deleteReview(id){
    return this.mFirestore.collection("Reviews").doc(id).delete()
  }
  //Update user review
  updateReview(id,reviewContent,datePosted){
    return this.mFirestore.collection("Reviews").doc(id).update({reviewContent : reviewContent, datePosted : datePosted})
  }
  //Get single review for update.
  getSingleReview(id){
    return this.mFirestore.collection("Reviews").doc(id).valueChanges();
  }
}
