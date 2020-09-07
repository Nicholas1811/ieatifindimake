import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import {ReviewsService} from '../reviews.service';
import {RecipeService} from '../recipe.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from '../user.service';
import { ToastController } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.page.html',
  styleUrls: ['./review.page.scss'],
})
export class ReviewPage implements OnInit {
  //RecipeID, which is the id from previous recipe page used to get the reviews the current recipe has
  recipeID : any
  //Storing the recipe review into an array
  reviewForRecipe :any = [];
  //Putting the recipe detail into an array to display its image for visual purposes
  recipeItem : any = [];
  //ngModel, to get data from reviewContent
  reviewContent;
  //Date to add into the review.
  date;
  //Getting username to add into review document
  usernameToAdd;
  profilePic : any;
  permission;
  profileImagetoAdd;
  userDetails;

  constructor(private activatedRoute : ActivatedRoute, private router : Router,private reviewService: ReviewsService,
    private recipeService : RecipeService, private mAuth: AngularFireAuth,private userService: UserService, 
    private toastController : ToastController, private SR : SpeechRecognition, private cdr: ChangeDetectorRef) { 
    this.activatedRoute.queryParams.subscribe(params =>{
      //Getting recipe id from previous page and getting the reviews from review conllection. 
      if(this.router.getCurrentNavigation().extras.state){
        this.recipeID = this.router.getCurrentNavigation().extras.state.myid;
        console.log(this.recipeID);
        this.reviewService.getReviewForRecipe(this.recipeID).subscribe((review)=>{
          this.reviewForRecipe = review;
          console.log(this.reviewForRecipe);
          this.recipeService.getCurrentRecipe(this.recipeID).subscribe((recipeItems=>{
            this.recipeItem = recipeItems;
          }))
        })
      }
    })
    //Getting username for it to be added into review collection.
    this.userService.getUsername(this.mAuth.auth.currentUser.uid).subscribe((username)=>{
      this.userDetails = username
      this.profileImagetoAdd = this.userDetails.profileImage
      this.usernameToAdd = this.userDetails.username
    })
    this.profilePic = "";
    this.SR.hasPermission().then((hasPermission: boolean)=>{
      this.permission = hasPermission
    })
  }

  ngOnInit() {
  }
  //Async function to check if the specific review is the user's one.
  async updateDeleteReview(id : any, ID : any){
    if(id != this.mAuth.auth.currentUser.uid){
      const toast = await this.toastController.create({
        message : 'You cannot update as this is not your review.',
        duration: 2000
      }).then(toast => toast.present());
    }else{
      let navigationExtras : NavigationExtras = {state : {myid: ID}}
    console.log(ID);
      this.router.navigateByUrl('/updatedeletereview', navigationExtras)
      console.log(id);
    }
  }
  //Adding of review
  addReview(){
    if(this.reviewContent == null){
      const toast = this.toastController.create({
        message : 'Fill in the fields to add a review.',
        duration: 2000
      }).then(toast => toast.present());
    }else{
      console.log(this.reviewContent);
    this.date = new Date().toString();
    this.reviewService.addRecipe(this.date, this.recipeID, this.recipeItem.Image,this.recipeItem.Name, this.reviewContent, this.mAuth.auth.currentUser.uid,this.usernameToAdd,this.profileImagetoAdd)
      this.toastController.create({
        message : "Review added",
        duration : 2000
      }).then(alert => alert.present());
  }
  }
  //Recording of review 
  recordReview(){
    this.SR.hasPermission()
    .then((hasPermission : boolean)=>{
      if(!hasPermission){
        this.SR.requestPermission()
      }
    })
    this.SR.startListening().subscribe((matches : Array<string>)=>{
      this.reviewContent = matches[0];
      this.cdr.detectChanges();
    })
  }
}
