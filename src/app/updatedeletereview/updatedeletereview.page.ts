import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import {ReviewsService} from '../reviews.service';
import { ToastController } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-updatedeletereview',
  templateUrl: './updatedeletereview.page.html',
  styleUrls: ['./updatedeletereview.page.scss'],
})
export class UpdatedeletereviewPage implements OnInit {
  //getting reviewID to update, reviewContent and date is ngModel, linking to html.
  reviewID;
  reviewContent;
  date;
  permission;
  //Getting single review to an array to display reviewContent in ion-textarea
  reviewDatas: any = [];
  constructor(private activatedRoute : ActivatedRoute, private router: Router, private reviewService : ReviewsService,
    private toastController : ToastController, private SR : SpeechRecognition, private cdr : ChangeDetectorRef) {
    this.activatedRoute.queryParams.subscribe(params =>{
      //Getting reviewID from previous page
      if(this.router.getCurrentNavigation().extras.state){
        this.reviewID = this.router.getCurrentNavigation().extras.state.myid;
        console.log(this.reviewID);
        this.reviewService.getSingleReview(this.reviewID).subscribe((reviewData)=>{
          this.reviewDatas = reviewData;
          console.log(this.reviewDatas);
        })
      }
    })
    this.SR.hasPermission().then((hasPermission: boolean)=>{
      this.permission = hasPermission
    })
   }

  ngOnInit() {
  }
  //Async function to update the review.
async update(){
  this.date = new Date().toString();
  this.reviewService.updateReview(this.reviewID,this.reviewContent, this.date)
  const toast = await this.toastController.create({
    message : 'Review Updated',
    duration: 2000
  }).then(toast => toast.present());
}
//Async function to delete the review.
async delete(){
  this.reviewService.deleteReview(this.reviewID)
  const toast = await this.toastController.create({
    message : 'Review Deleted',
    duration: 2000
  }).then(toast => toast.present());
  this.router.navigateByUrl('/tabs/tab1');
  console.log(this.reviewDatas.recipeID);
}
//record review
record(){
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
