import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  

  constructor() { 
    
  }

  ngOnInit(): void {
  }

  addMarker(location: google.maps.LatLngLiteral, map: google.maps.Map) {
    // Add the marker at the clicked location, and add the next-available label
    // from the array of alphabetical characters.
    new google.maps.Marker({
      position: location,
      label: String(this.labelIndex++),
      animation: google.maps.Animation.DROP,
      map: map,
    });
  }
  
  mapRestrictions = {
    north: 90,
    south: -90,
    west: 180,
    east: 0,
    };
  labelIndex = 1;

  interactiveCoordinates = [];

   initMap(): void {
    let map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 10, lng: -20.744857 },
    restriction: {
      latLngBounds: this.mapRestrictions,
      strictBounds: false,
    },
    zoom: 3,
  });
    this.getLocations(map);
  }
  
  getLocations(map: google.maps.Map){

    //this.addMarker( ,map)

    let drawPath = new google.maps.Polyline({
      path: this.interactiveCoordinates,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    drawPath.setMap(map);
  }


}
