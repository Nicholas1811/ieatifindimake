import { Component, OnInit } from '@angular/core';
import {ReviewsService} from '../reviews.service';
import { AlertController } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx';
import { ToastController } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  //Defining my reviews array to get particular user's reviews.
  myReviews : any = [];
  //Setting date variable to get new date when user updates info.
  date;
  recordDate;
  //Getting particular user's review.
  constructor(private reviewService: ReviewsService,private alertController : AlertController, private vibration : Vibration,
    private toastController : ToastController, private SR: SpeechRecognition, private cdr : ChangeDetectorRef) {
    this.reviewService.getMyReviews().subscribe((myreview)=>{
      this.myReviews = myreview;
    })
   }

  ngOnInit() {
  }
  //Delete review. Called when ion item sliding is slided.
  deleteReview(id : any){
    this.vibration.vibrate(1000);
    this.reviewService.deleteReview(id)
  }
  //Popup when user presses on the review item. user can update via typing or via recording
  updatePopup(id: any, reviewitem : any, recipename: any){
    const alert=this.alertController.create({
            header: "Update for " + recipename,
            inputs: [{name: 'reviewContent' , type:'text', value : reviewitem}],
            buttons : [

              {text : "Submit", handler:(alertData=>{
                if(alertData.reviewContent == ""){
                  this.toastController.create({
                    message : "Please fill in something.",
                    duration : 2000
                  }).then(alert=> alert.present())
                }else{
                  console.log(alertData.reviewContent);
                  this.date = new Date().toString();
                  this.reviewService.updateReview(id, alertData.reviewContent,this.date);
                }
              })},
              {text : "Record", handler : (alertData=>{
                this.SR.startListening().subscribe((matches : Array<string>)=>{
                  alertData.reviewContent = matches[0];
                  console.log(alertData.reviewContent)
                  this.alertController.create({
                    header: "Confirm review content?",
                    inputs: [{name : 'reviewRecord', type : "text", value : alertData.reviewContent}],
                    buttons: [
                      {text : "Ok", handler: (reviewInfo=>{
                        this.recordDate = new Date().toString();
                        this.reviewService.updateReview(id, alertData.reviewContent,this.recordDate);
                        this.cdr.detectChanges();
                      })},
                      {text : "Cancel", role : 'cancel'}
                    ]
                  }).then(alert=>{alert.present()})
              
                })
               
              })},
              {text :"Cancel", role : "cancel"}
            ]
  }).then((alert)=>{alert.present()})

}}
