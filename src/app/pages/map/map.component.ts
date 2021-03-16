import { Component, OnInit } from '@angular/core';
let map: google.maps.Map;
/// <reference types="google.maps" />

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  mapRestrictions = {
    north: 90,
    south: -90,
    west: 180,
    east: 0,
};

  initMap(): void {
  map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 10, lng: -20.744857 },
    restriction: {
      latLngBounds: this.mapRestrictions,
      strictBounds: false,
    },
    zoom: 3,
  });
}
}
