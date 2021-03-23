import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps'

import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { TopRibbonComponent } from './components/top-ribbon/top-ribbon.component';
import { LoginSideSectionComponent } from './components/login-side-section/login-side-section.component';

import { TutorialComponent } from './pages/tutorial/tutorial.component';
import { MapViewComponent } from './pages/map-view/map-view.component';
import { HomeComponent } from './pages/home/home.component';
import { TestComponent } from './pages/test/test.component';
import { ShoreComponent } from './pages/shore/shore.component';

import { NetworkService } from './services/network.service';
import { ConstantsService } from './services/constants.service';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MapComponent } from './pages/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestComponent,
    PageNotFoundComponent,
    TopRibbonComponent,
    LoginSideSectionComponent,
    PageNotFoundComponent,
    MapComponent,
    ShoreComponent,
    TutorialComponent,
    MapViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GoogleMapsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [NetworkService, ConstantsService],
  bootstrap: [AppComponent]
})
export class AppModule { }