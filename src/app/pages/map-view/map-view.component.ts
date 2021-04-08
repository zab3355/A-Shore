import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'
import { read } from 'node:fs';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {
  constructor(private router: Router, private toastr: ToastrService) { }
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow

  zoom = 12
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
    maxZoom: 15,
    minZoom: 8,
  }
  markers = []
  drawPath = []
  infoContent = ''

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }

  click(event: google.maps.MouseEvent) {
    console.log(event)
  }

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
  }

  addMarker() {
    this.markers.push({
      position: {
        //change these cause it's just being placed randomly
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: '#859FF5',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
        draggable: false,
      },
    })
  }

  serverAddMarker() {
    //TODO: call the database to fill markers[]
      var markerData = []
    //loops through markers and sets a marker on the point

      for(var i =0; i < markerData.length; i++)
      {this.markers.push({
        //change all instances of markers below this line to what ever we set the array name of the data from the database
        position: {
          lat: markerData[i].lat,
          lng: markerData[i].lng,
        },
        label: {
            color: 'red',
            text: String(i),
        },
        title: String(i),
        options: { animation: google.maps.Animation.DROP},
      })
    }

    markerData.forEach(element =>{
      this.drawPath.push({
        lat: element.lat,
        lng: element.lng
      })
    })
  }

  openInfo(marker: MapMarker, content) {
    this.infoContent = content
    this.info.open(marker)
  }
}