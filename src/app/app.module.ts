import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Instagram } from '@ionic-native/instagram/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
  AngularFireStorageModule],
  providers: [
    StatusBar,
    InAppBrowser,
    Vibration,
    YoutubeVideoPlayer,
    TextToSpeech,
    SocialSharing,
    SpeechRecognition,
    SplashScreen,
    GooglePlus,
    Instagram,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
