import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps'

import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { TopRibbonComponent } from './components/top-ribbon/top-ribbon.component';
import { LoginSideSectionComponent } from './components/login-side-section/login-side-section.component';

import { TutorialComponent } from './pages/tutorial/tutorial.component';
import { MapViewComponent } from './pages/map-view/map-view.component';
import { HomeComponent } from './pages/home/home.component';
import { TestComponent } from './pages/test/test.component';
import { ShoreComponent } from './pages/shore/shore.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

import { NetworkService } from './services/network.service';
import { ConstantsService } from './services/constants.service';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { BottleViewModalComponent } from './modals/bottle-view-modal/bottle-view-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestComponent,
    LoginComponent,
    SignupComponent,
    PageNotFoundComponent,
    TopRibbonComponent,
    LoginSideSectionComponent,
    PageNotFoundComponent,
    ShoreComponent,
    TutorialComponent,
    MapViewComponent,
    BottleViewModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GoogleMapsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [NetworkService, ConstantsService],
  bootstrap: [AppComponent]
})
export class AppModule { }