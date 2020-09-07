import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../recipe.service';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';

@Component({
  selector: 'app-youtubevideo',
  templateUrl: './youtubevideo.page.html',
  styleUrls: ['./youtubevideo.page.scss'],
})
export class YoutubevideoPage implements OnInit {
  //channelid to call the videos. array to store the videos to display
  channelId = 'UCZZPgUIorPao48a1tBYSDGG';
  videos : any = [];
  videotest : any = [];


  constructor(private recipeService : RecipeService, private ytPlayer : YoutubeVideoPlayer) { 
    //Getting the youtube videos through recipe service
    this.recipeService.getData(this.channelId).subscribe((data)=>{
      this.videos = data;
      console.log(this.videos)
      this.videotest = this.videos.items
      console.log(this.videotest)
    })
  }

  ngOnInit() {
  }
  //Open the video of youtube video.
  openVid(link:any){
    this.ytPlayer.openVideo(link);
  }

}
