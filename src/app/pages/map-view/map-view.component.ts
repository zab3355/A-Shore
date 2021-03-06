import { Component, OnInit, ViewChild, Output, ElementRef, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BottleViewComponent } from 'src/app/pages/bottle-view/bottle-view.component'; 
import { ToastrService } from 'ngx-toastr';
import { ConstantsService } from 'src/app/services/constants.service';
import { ShoreService } from 'src/app/services/shore.service';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService, private shoreService: ShoreService, private constantsService: ConstantsService) { }
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow


  locId = '';
  id= '';

  zoom = 12
  center: google.maps.LatLngLiteral

  
  options: google.maps.MapOptions = {
    zoomControl: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    mapTypeControl: false,
    minZoom: 8,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#523735"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#c9b2a6"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#dcd2be"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ae9e90"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#93817c"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a5b076"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#447530"
          }
        ]
      },
      {
        "featureType": "road",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#fdfcf8"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f8c967"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#e9bc62"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e98d58"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#db8555"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#806b63"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8f7d77"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#b9d3c2"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#92998d"
          }
        ]
      }
    ]
  }

  markers = []
  drawPath = []
  infoContent = '';
  latCoords = 0;
  lngCoords = 0;
  
  bottleViewLat:string = '';
  bottleViewLng:string = '';
  bottleLatNum = 0;
  bottleLngNum = 0;


  message_id: number;

  ngOnInit() {
    this.id = ConstantsService.getLocId();
    this.locId = ConstantsService.getID();

    this.route.queryParams.subscribe(queryParams => {
      this.bottleViewLat = queryParams['bottleViewLat'];
      this.bottleViewLng = queryParams['bottleViewLng'];
      this.bottleLngNum = parseFloat(this.bottleViewLng);
      this.bottleLatNum = parseFloat(this.bottleViewLat);
      console.log(this.bottleLatNum + this.bottleLngNum);
    });

    this.shoreService.getLocation(this.id).subscribe(res => {
      console.log(res.data);
      this.latCoords = res.data[0].lat;
      this.lngCoords = res.data[0].lng;
      this.addBottleMarker();
      this.addMarker();
    });

    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

  convertToNumber(numVal) {
  
    if (isNaN(+numVal)) {
      console.log("Number is NaN")
      
    } else  {
      console.log(+numVal)
    }
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
    console.log(this.latCoords);
    console.log(this.lngCoords);

    //your user marker
    this.markers.push({
      position: {
        
        //change coords here
        lat: this.latCoords,
        lng: this.lngCoords,
      },
      label: {
        color: '#859FF5',
        text: 'Your Location',
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
        draggable: true,
      },
    });
  }

  addBottleMarker(){
    console.log(this.bottleLatNum);
    console.log(this.bottleLngNum);

        //message marker
        this.markers.push({
          position: {
            //change coords here
            lat: this.bottleLatNum,
            lng: this.bottleLngNum,
          },
          label: {
            color: '#859FF5',
            text: 'Bottle Location',
          },
          title: 'Marker title ' + (this.markers.length + 1),
          info: 'Marker info ' + (this.markers.length + 1),
          options: {
            animation: google.maps.Animation.BOUNCE,
            draggable: false,
          },
        });
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