import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleMapsModule } from "@angular/google-maps";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GoogleMapsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FTCovoit';
  options: google.maps.MapOptions = {
    mapId: "53437bfca843bb93",
    center: { lat: 43.49522719584619, lng: 5.3447904619154 },
    zoom: 17,
  };
}
