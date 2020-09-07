import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras, Navigation } from '@angular/router';
import {RecipeService} from '../recipe.service';
import { ActionSheetController, ToastController} from '@ionic/angular';
import { FavouritesService } from '../favourites.service';
import { ReviewsService } from '../reviews.service';
import {AngularFireAuth } from '@angular/fire/auth';  
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Instagram } from '@ionic-native/instagram/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-recipedetails',
  templateUrl: './recipedetails.page.html',
  styleUrls: ['./recipedetails.page.scss'],
})
export class RecipedetailsPage implements OnInit {
  //Declaring array and variables to place data. recipeSteps and recipeIngredients are an array as it comes from firebase as an array. Declaring howManyFavs and howManyRevs to display on html
  myId : any;
  // checkIfUserFavouriteExist : any;
  previouslyFavouritedRecipe: any = [];
  favouriteId : any;
  recipeDetails : any = [];
  // recipeDetail : any;
  recipeSteps : any = [];
  recipeIngredients : any = [];
  howManyFavs : String = "";
  howManyRev : String = "";
  currentImage : any;

  constructor(private router: Router, 
    private activatedRoute : ActivatedRoute, 
    private recipeService : RecipeService,
    private actionSheetController : ActionSheetController, 
    private favouriteService : FavouritesService,
    private mAuth: AngularFireAuth,
    private toastController: ToastController,
    private tts: TextToSpeech,
    private iab : InAppBrowser,
    private reviewService: ReviewsService,
    private ss : SocialSharing,
    private camera : Camera,
    private insta: Instagram ) {
    //Getting the previously navigated page id and using it to get the current recipe to display.
    //At the same time, getting the previously favourited recipes to allow ion-action-sheet functionality.
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
      this.myId= this.router.getCurrentNavigation().extras.state.id;
      console.log(this.myId);
      this.recipeService.getCurrentRecipe(this.myId).subscribe((recipeDetail)=>{
        this.recipeDetails = recipeDetail;
        console.log(this.recipeDetails);
        this.recipeSteps = this.recipeDetails.Steps;
        console.log(this.recipeSteps)
        this.recipeIngredients = this.recipeDetails.Ingredients;
        this.favouriteService.checkingIfFavouriteExist(this.myId).subscribe((checkIfUserFavouriteExist)=>{
          this.previouslyFavouritedRecipe = checkIfUserFavouriteExist;
        })
      })
      //This is to do the "Favourited by how many users" function
      this.favouriteService.gettingUserFavourited(this.myId).subscribe((amountFavs)=>{
        this.howManyFavs = amountFavs.length.toString();
      })
      this.reviewService.getReviewForRecipe(this.myId).subscribe((amountReviews)=>{
        this.howManyRev = amountReviews.length.toString();
      })
      }
      });
   }

  ngOnInit() {
  }
  //Opens up ion-action-sheet for user to add favourites or view reviews. Checks if user has this recipe favourited or not
  async viewMore() {
    if(this.previouslyFavouritedRecipe.length == 0){
      const actionSheet = await this.actionSheetController.create({
        header: 'Find out more about ' + this.recipeDetails.Name + ' here.',
        buttons: [{
          text: 'View Reviews.',
          role: 'destructive',
          icon: 'text',
          handler: () => {
            let navigationExtras : NavigationExtras = {state : {myid: this.recipeDetails.ID}}
            console.log(this.recipeDetails.ID);
            this.router.navigateByUrl('/review', navigationExtras);
          }
        }, 
        {
          text: 'Add to favourites.',
          icon: 'heart',
          handler: async () => {
              await this.favouriteService.addFavourites(this.recipeDetails.Description, this.recipeDetails.Image,this.recipeDetails.Name,this.myId,this.mAuth.auth.currentUser.uid);
              const alert = this.toastController.create({
                header: 'This recipe has been favourited.',
                duration: 2000 
              }).then(alert => alert.present());
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
    }else{
      const actionSheet = await this.actionSheetController.create({
        header: 'Find out more about ' + this.recipeDetails.Name + ' here.',
        buttons: [{
          text: 'View Reviews.',
          role: 'destructive',
          icon: 'text',
          handler: () => {
            let navigationExtras : NavigationExtras = {state : {myid: this.recipeDetails.ID}}
            console.log(this.recipeDetails.ID);
            this.router.navigateByUrl('/review', navigationExtras);
          }
        }, 
        {
          text: 'Remove from favourites.',
          icon: 'trash',
          handler: async () => {

              await this.favouriteService.deleteFavourites(this.previouslyFavouritedRecipe[0].id);
              const alert = this.toastController.create({
                header: 'Removed from favourites',
                duration: 2000 
              }).then(alert => alert.present());
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
    }

  }
  //Shop here button to allow users to either open in app browser OR google map page.
  async shopHere(){
      const actionSheet = await this.actionSheetController.create({
        header: 'Get your shopping necessities here.',
        buttons: [{
          text: 'Lets buy some items.',
          role: 'destructive',
          icon: 'card-outline',
          handler: () => {
            this.iab.create('https://www.fairprice.com.sg/');
          }
        }, 
        {
          text: 'Find supermarkets islandwide.',
          icon: 'map-outline',
          handler: async () => {
            //This code here checks with the current favourite recipes to ensure that the favourites do not get repeated.
            this.router.navigateByUrl('/googlemap');
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
      await actionSheet.present();
  }
  //button to go to youtube api page
  watchHere(){
    this.router.navigateByUrl('/youtubevideo')
  }
  //text to speech steps
  hearRecipe(step: any){
    this.tts.speak(step);
  }
  //mute tts
  stopSound(){
    this.tts.speak('');
  }
  //opens up ion-action-sheet for social sharing. when share to facebook or share to instagram is clicked, it opens up camera for the user. promote to facebook shares current recipe image
  async socialSharing(image:any){
    const actionSheet = await this.actionSheetController.create({
      header: 'Share your work to various social media platforms',
      buttons: [{
        text: 'Share to Facebook.',
        role: 'destructive',
        icon: 'logo-facebook',
        handler: async () => {
          let options: CameraOptions ={
            quality : 100,
            destinationType:this.camera.DestinationType.DATA_URL,
            encodingType : this.camera.EncodingType.JPEG,
            sourceType : this.camera.PictureSourceType.CAMERA
          }
          await this.camera.getPicture(options).then((async(data)=>{
            this.currentImage = "data:image/jpeg;base64, "+data;
          }))
          this.ss.shareViaFacebook(null, this.currentImage,null).then((res)=>{
            console.log(res)
          })
        }
      }, 
      {
        text: 'Share to Instagram.',
        icon: 'logo-instagram',
        handler: async () => {
          let options: CameraOptions ={
            quality : 100,
            destinationType:this.camera.DestinationType.DATA_URL,
            encodingType : this.camera.EncodingType.PNG,
            sourceType : this.camera.PictureSourceType.CAMERA
          }
          await this.camera.getPicture(options).then((async(data)=>{
             this.currentImage = "data:image/jpeg;base64, "+data;
             console.log(data)
          })).catch((err)=>{
            console.log(err)
          })
          this.insta.share(this.currentImage,'Ccopied')
            .then(()=>{
              console.log("OK")
            }).catch(()=>{
              console.log("FAIL")
            })
        }
      }, 
      {
        text: 'Promote us on Facebook.',
        icon: 'logo-facebook',
        handler: async () => {
          this.ss.shareViaFacebook(null,image,null).then((res)=>{
            console.log(res)
          })
        }
      },
{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
