import { Component, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {AngularFireAuth } from '@angular/fire/auth';  
import {RecipeService} from '../recipe.service';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  test;
  currentEmail;
  allRecipes : any = [] ;
  famousRecipes : any = [];
  allRecipesFromDb;
  currentIndex;
  active;

   

  constructor(private router:Router,private mAuth: AngularFireAuth,
    private recipeService: RecipeService,private ss: SocialSharing) {
    this.currentEmail = this.mAuth.auth.currentUser.email;
    //Getting all recipes for the display page
    this.recipeService.getAllRecipes().subscribe((allRecipesFromDb)=>{
      this.allRecipes = allRecipesFromDb;
      })
    this.recipeService.getFamousRecipe().subscribe((famousRecipe)=>{
      this.famousRecipes = famousRecipe;
      console.log(this.famousRecipes)
    })
    this.active = "All"
    
  }

  //Codes to filter by recipe
  filterAll(){
    this.recipeService.getAllRecipes().subscribe((allRecipesFromDb)=>{
      this.allRecipes = allRecipesFromDb;
      })
  }
  filterChinese(){
    this.recipeService.getChineseRecipes().subscribe((allRecipesFromDb)=>{
      this.allRecipes = allRecipesFromDb;
      })
  }
  filterMalay(){
    this.recipeService.getMalayRecipes().subscribe((allRecipesFromDb)=>{
      this.allRecipes = allRecipesFromDb;
      })
  }
  filterIndian(){
    this.recipeService.getWesternRecipes().subscribe((allRecipesFromDb)=>{
      this.allRecipes = allRecipesFromDb;
    })
  }
  //Onclick which passes the id of the currently selected recipe to the next page to display.
  recipeDetails(id : any, Name : any){
    console.log(id);
    let navigationExtras: NavigationExtras = {state:{id: id}}
    this.router.navigateByUrl('/recipedetails', navigationExtras);
  }
  //Ion segment button swipe event as filter. 
  change(ev){
    console.log(ev.detail.value)
    if(ev.detail.value == "All"){
      this.recipeService.getAllRecipes().subscribe((allRecipesFromDb)=>{
        this.allRecipes = allRecipesFromDb;
        })
    }
    if(ev.detail.value == "Chinese"){
    this.recipeService.getChineseRecipes().subscribe((allRecipesFromDb)=>{
      this.allRecipes = allRecipesFromDb;
      })
    }
    if(ev.detail.value == "Malay"){
      this.recipeService.getMalayRecipes().subscribe((allRecipesFromDb)=>{
        this.allRecipes = allRecipesFromDb;
        })
      }
      if(ev.detail.value == "Western"){
        this.recipeService.getWesternRecipes().subscribe((allRecipesFromDb)=>{
          this.allRecipes = allRecipesFromDb;
          })
        }
  }
  //Sharing to facebook of recipe image, for promotion of app and recipe.
  facebookSharing(image: any){
    this.ss.shareViaFacebook(null, image,null).then((res)=>{
      console.log(res)
    })
  }
  //Sharing to instagram of recipe image, for promotion of app and recipe.
  InstagramSharing(image : any){
    this.ss.shareViaInstagram(null, image).then((res)=>{
      console.log(res)
    })
  }
}
