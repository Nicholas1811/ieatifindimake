import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private mFirestore : AngularFirestore, private http: HttpClient) { }
  //Code to get all recipes to display. This serves as a filter as well.
  getAllRecipes(){
    return this.mFirestore.collection("Recipes").valueChanges({idField : "id"});
  }
  //The three functions below are for filtering of recipes according to their cuisine type
  getChineseRecipes(){
    return this.mFirestore.collection("Recipes", ref=> ref.where("cuisine", "==", "Chinese")).valueChanges({idField : "id"});
  }
  getMalayRecipes(){
    return this.mFirestore.collection("Recipes", ref=> ref.where("cuisine", "==", "Malay")).valueChanges({idField : "id"});
  }
  getWesternRecipes(){
    return this.mFirestore.collection("Recipes", ref=> ref.where("cuisine", "==", "Western")).valueChanges({idField : "id"});
  }
  //Code to display the clicked recipe information.
  getCurrentRecipe(id){
    return this.mFirestore.collection("Recipes").doc(id).valueChanges();
  }
  //For slider
  getFamousRecipe(){
    return this.mFirestore.collection("Recipes", ref => ref.where("famous" , "==", "a")).valueChanges({idField : "id"});
  }
  //For youtube api
  getData(channel){
    return this.http.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLYOBHxuy1wS2VIz8CFV0SC36kMma9bIur&key=AIzaSyAHnJ2dXustwtT9Wk1w8Jvu_nc6M8SdREw&maxResults=50');
  }
}
