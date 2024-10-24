import {Component, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GoogleMapsModule, MapAdvancedMarker, MapInfoWindow} from "@angular/google-maps";
import {FormsModule} from "@angular/forms";
import {Pooler} from "../models/pooler";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,GoogleMapsModule,MatFormFieldModule, MatInputModule, MatIconModule,MatButtonModule,MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {
  title = 'FTCovoit';
  nom=""
  prenom=""
  nomDeVoie=""
  codePostal=""
  commune=""
  email=""
  poolers!:Pooler[];
  options: google.maps.MapOptions = {
    mapId: "53437bfca843bb93",
    center: { lat: 43.49522719584619, lng: 5.3447904619154 },
    zoom: 8,
    gestureHandling: 'greedy'
  };

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  constructor(private cd: ChangeDetectorRef) {

  }



  ngOnInit() {
    this.poolers =
      [
        {
          "nom": "Pascalini",
          "prenom": "Fabrice",
          "nomDeVoie": "180 rue René Descartes",
          "codePostal": "13290",
          "commune": "Aix-en-Provence",
          "email": "titi@francetravail.fr",
          "lat": 43.4952354,
          "lng": 5.3457326
        },
        {
          "nom": "Touré",
          "prenom": "Samy",
          "nomDeVoie": "45 Chemin de la Loubière ",
          "codePostal": "",
          "commune": "Manosque",
          "email": "yoyo@francetravail.fr",
          "lat": 43.812819,
          "lng": 5.796093
        },
        {
          "nom": "Dupont",
          "prenom": "Isabelle",
          "nomDeVoie": "Avenue Paul Dalbert",
          "codePostal": "13013",
          "commune": "Marseille",
          "email": "isdupont@ftravail.fr",
          "lat": 43.3528932,
          "lng": 5.4466384
        },
        {
          "nom": "Dupont",
          "prenom": "Jean ",
          "nomDeVoie": "150 Route Bellombre",
          "codePostal": "",
          "commune": "Arles",
          "email": "jd@ft.fr",
          "lat": 43.6479652,
          "lng": 4.7286136
        },
        {
          "nom": "Martin",
          "prenom": "Marie",
          "nomDeVoie": "4 Avenue de la République",
          "codePostal": "",
          "commune": "Miramas",
          "email": "mm@ft.fr",
          "lat": 43.5816073,
          "lng": 5.0023586
        },
        {
          "nom": "Moussa",
          "prenom": "Mze",
          "nomDeVoie": "34 route des Courses",
          "codePostal": "",
          "commune": "Cavaillon",
          "email": "mo@ft.fr",
          "lat": 43.8336382,
          "lng": 5.0409865
        }
      ];
  }

  codeAddress() {
  let geocoder= new google.maps.Geocoder();
  let pooler = {
    nom: this.nom,
    prenom: this.prenom,
    nomDeVoie: this.nomDeVoie,
    codePostal: this.codePostal,
    commune: this.commune,
    email:this.email,
    lat:0,
    lng:0
  }
  let adresse = pooler.nomDeVoie+" "+pooler.codePostal+" "+pooler.commune
  geocoder.geocode({ 'address': adresse},(results:any, status:any)=>{
      if (status == 'OK') {
        const location = results[0].geometry.location;
        pooler.lat = location.lat();
        pooler.lng = location.lng();
        console.log(`Latitude: ${location.lat()}, Longitude: ${location.lng()}`);
        this.poolers.push(pooler);
        console.log(this.poolers)
        this.nom="";
        this.prenom=""
        this.nomDeVoie="";
        this.commune="";
        this.codePostal="";
        this.email="";
        this.cd.detectChanges();
      } else{
        console.log("probleme google Maps")
      }
    });
  }

  onMarkerClick(marker: MapAdvancedMarker,pooler:Pooler) {
    const card = '<div>'+
      pooler.nom+' '+  pooler.prenom+
      '</div>'+
      '<div>'+pooler.nomDeVoie+' '+pooler.codePostal+' '+pooler.commune+'</div>'+
      '<div>'+pooler.email+'</div>';

    console.log(card)
    this.infoWindow.openAdvancedMarkerElement(marker.advancedMarker, card);

  }


}
