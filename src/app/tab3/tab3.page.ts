import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service'
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{
  //Defining an array to store recipe items
  recipeData: any = [];
  //Getting all recipes to display on search page.
 constructor(private recipeService: RecipeService, private router: Router) { 
  this.recipeService.getAllRecipes().subscribe((data)=>{
    this.recipeData = data;
    
  })
  }
  //Filter event to search item.
  filter(ev : any){
    //Filtering code
    this.recipeService.getAllRecipes().subscribe((data)=>{
      this.recipeData = data;
      const val = ev.target.value.toLowerCase().toString().trim();
      if(val != ''){
        this.recipeData = this.recipeData.filter((item)=>{
          return(item.Name.toLowerCase().indexOf(val.toLowerCase())> -1);
        })
      }
    })
  }
  //Onclick to pass id to recipe page.
  passToDetail(id: any){
    console.log(id);
    let navigationExtras: NavigationExtras = {state:{id: id}}
    this.router.navigateByUrl('/recipedetails', navigationExtras);
  }
}
