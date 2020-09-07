import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {AngularFireAuth } from '@angular/fire/auth';  
import {FavouritesService} from '../favourites.service';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  favouriteRecipes : any = [] ;
  allfavouriteRecipesFromDb;

  constructor(private mAuth : AngularFireAuth, private favService : FavouritesService, private router:Router, private vibration : Vibration) {
    //Code to retrieve favourites when page starts.
    this.favService.getFavourites().subscribe((allfavouriteRecipesFromDb)=>{
      this.favouriteRecipes = allfavouriteRecipesFromDb;
      console.log(this.favouriteRecipes);
    })
  }
  //Goes to the display recipe page.
  recipeDetails(id : any){
    console.log(id);
    let navigationExtras: NavigationExtras = {state:{id: id}}
    this.router.navigateByUrl('/recipedetails', navigationExtras);
  }
  //Function is called when user swipes and click on delete button.
  delete(id:any){
    console.log(id);
    this.vibration.vibrate(1000);
    this.favService.deleteFavourites(id)
  }

}
