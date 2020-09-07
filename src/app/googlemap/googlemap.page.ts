import { Component, OnInit } from '@angular/core';
import {ViewChild, ElementRef} from '@angular/core';
declare var google : any;

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.page.html',
  styleUrls: ['./googlemap.page.scss'],
})
export class GooglemapPage implements OnInit {
  map: any;
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
  infoWindows : any = [];
  latLng;
  //Defining latlng to display on the google map
  markers : any = [{
    title: "Serangoon Gardens Fairprice Finest",
    lattitude: "1.364888",
    longtitude: "103.865709",
    address : "1 Maju Ave #B1-11 to # B1-K09 Serangoon Garden Village, 556679"
  },
  {
    title: "Sengkang East Fairprice",
    lattitude: "1.386432",
    longtitude: "103.893237",
    address: " #01-06 Sengkang E Ave, blk 279, Singapore 540279"
  },
  {
    title: "Waterway Point Fairprice",
    lattitude: "1.407047",
    longtitude: "103.901663",
    address: "83 Punggol Central, #B2-32 Waterway Point, Singapore 828761"
  },
  {
    title: "Punggol Fairprice",
    lattitude: "1.402741",
    longtitude: "103.913196",
    address : "681 Punggol Oasis Terraces, #B1-01, 820681"
  },
  {
    title: "Upper Serangoon Road Fairprice",
    lattitude: "1.377130",
    longtitude: "103.903587",
    address: "Blk, 476 Upper Serangoon View, #02-18, 530476"
  },
  {
    title: "Fairprice Toa Payoh",
    lattitude: "1.338485",
    longtitude: "103.848997",
    address: "500 Lor 6 Toa Payoh, #B1-32/#01-33, Singapore 310500"
  },
  {
    title: "Fairprice Mapletree",
    lattitude: "1.336390",
    longtitude: "103.888890",
    address :  "18 Tai Seng St, #B1-13 Maple Tree 18, Singapore 539775"
  },
  {
    title: "Fairprice Yishun Ring",
    lattitude: "1.424549",
    longtitude: "103.846640",
    address : "Blk, 414 Yishun Ring Rd, #01-1853, 760414"
  },
  {
    title: "Fairprice Jalan Kayu",
    lattitude: "1.392223",
    longtitude: "103.872450",
    address :  "Blk, 447A Jln Kayu, #01-01/02, 791447"
  },
  {
    title: "Fairprice West Coast Drive",
    lattitude: "1.311926",
    longtitude: "103.759252",
    address: " Blk 502 W Coast Dr, #01-41, Singapore 120502"
  },
  {
    title: "Fairprice Boon Lay",
    lattitude: "1.346617",
    longtitude: "103.711966",
    address: " 221 Boon Lay Pl, #02-200, Singapore 640221"
  },
  {
    title: "Fairprice Taman Jurong",
    lattitude: "1.334640",
    longtitude: "103.720344",
    address: "#01-35 Yung Sheng Road blk 399 Taman Jurong Shopping Centre, 610399"
  },
  {
    title: "Fairprice Teban Garden",
    lattitude: "1.320498",
    longtitude: "103.742789",
    address: "Block 37 Teban Gardens Rd, #01-304 305/306, Singapore 600037"
  },

]

  constructor() {
   }

  ngOnInit() {
  }
  //shows map when user enter page
  ionViewDidEnter(){
    this.showMap();
  }
  //using for loop to add markers into the google map and also, calling the infowindow to show details.
  addMarkersToMap(markers){

    for (let marker of markers){
      let position = new google.maps.LatLng(marker.lattitude, marker.longtitude)
      let mapMarker = new google.maps.Marker({
        position: position,
        title : marker.title,
        lattitude : marker.lattitude,
        longtitude : marker.longtitude,
        address : marker.address
      });
      console.log(marker.title)
      mapMarker.setMap(this.map)
      this.addInfoWindowToMaker(mapMarker);
    }
  }
  //Showing info window of place details
  addInfoWindowToMaker(marker){
    let infoWindowContent = '<div id = "content">' + 
    '<h2 id = "firstHeading class = "firstHeading" style="color:black;">' + marker.title + '</h2>'+
    '<p style="color:black;" > Address: ' + marker.address + '</p>' +  
    '</div>';
    let infoWindow = new google.maps.InfoWindow({ 
      content : infoWindowContent
    });
    marker.addListener('click', ()=>{
      this.closeAllInfoWindows();
      infoWindow.open(this.map,marker);
    });
    this.infoWindows.push(infoWindow);
  }
  //Closing the window when another marker is clicked, called in addInfoToMarker func.
  closeAllInfoWindows(){
    for (let window of this.infoWindows){
      window.close();
    }
  }
  //func called in ionviewdidenter above to show the map and also adding markers
  showMap(){

    const location = new google.maps.LatLng(1.290270, 103.851959);

    const options = {
      center : location,
      zoom:11,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement,options);
    this.addMarkersToMap(this.markers);
  }

}
