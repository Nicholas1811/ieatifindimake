import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  constructor(private mFirestore : AngularFirestore, private mAuth: AngularFireAuth) { }
  //Code to retrieve the user's favourites
  getFavourites(){
    return this.mFirestore.collection("Favourites", ref=> ref.where("userID", "==", this.mAuth.auth.currentUser.uid)).valueChanges({idField : "id"});
  }
  //Adding favourites
  addFavourites(Description, Image, Name, recipeID, userID){
    return this.mFirestore.collection("Favourites").add({Description : Description, Image:Image, Name:Name, recipeID : recipeID, userID : userID});
  }
  //Making sure favourite is new
  checkingIfFavouriteExist(recipeID){
    return this.mFirestore.collection("Favourites", ref => ref.where("userID", "==", this.mAuth.auth.currentUser.uid).where("recipeID", "==", recipeID)).valueChanges({idField : 'id'});
  }
  //Deleting favourites.
  deleteFavourites(id){
    return this.mFirestore.collection("Favourites").doc(id).delete();
  }
  //Getting how many people favourited
  gettingUserFavourited(id){
    return this.mFirestore.collection("Favourites", ref => ref.where("recipeID", "==", id)).valueChanges({idField : "id"});
  }
}
