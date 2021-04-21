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
import { AuthGuard } from './services/auth.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { BottleViewComponent } from './pages/bottle-view/bottle-view.component';
import { BottleCreateComponent } from './pages/bottle-create/bottle-create.component';
import { SettingsComponent } from './pages/settings/settings.component';

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
    ShoreComponent,
    TutorialComponent,
    MapViewComponent,
    BottleViewComponent,
    BottleCreateComponent,
    SettingsComponent,
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
  providers: [NetworkService, ConstantsService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }