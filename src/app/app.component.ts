import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleMapsModule,MapMarker} from "@angular/google-maps";
import {FormsModule} from "@angular/forms";
import {Pooler} from "../models/pooler";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,GoogleMapsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'FTCovoit';
  nomPooler=""
  addressPooler="";
  poolers: Pooler[] =
    [];
  options: google.maps.MapOptions = {
    mapId: "53437bfca843bb93",
    center: { lat: 43.49522719584619, lng: 5.3447904619154 },
    zoom: 8

  };
  private pooler!: Pooler;


  constructor() {

  }



  ngOnInit() {

  }

  codeAddress() {
  let geocoder= new google.maps.Geocoder();
  this.pooler = {
    nom: this.nomPooler,
    adresse: this.addressPooler,
    lat:0,
    lng:0
  }
  geocoder.geocode({ 'address': this.pooler.adresse},(results:any, status:any)=>{
      if (status == 'OK') {
        const location = results[0].geometry.location;
        this.pooler.lat = location.lat();
        this.pooler.lng = location.lng();
        console.log(`Latitude: ${location.lat()}, Longitude: ${location.lng()}`);
        this.poolers.push(this.pooler);
        console.log(this.poolers)
      } else{
        console.log("progbleme google Maps")
      }
    });
  }

}
