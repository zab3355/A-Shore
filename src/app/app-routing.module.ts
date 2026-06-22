import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ShoreComponent } from './pages/shore/shore.component';
import { TutorialComponent } from './pages/tutorial/tutorial.component';
import { MapViewComponent } from './pages/map-view/map-view.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { BottleViewComponent } from './pages/bottle-view/bottle-view.component';
import { BottleCreateComponent } from './pages/bottle-create/bottle-create.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  //change this route to login later once we setup auth
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  //if creating a new component put your routes here
  { path: 'home', component: HomeComponent,
  data: {
    pageName: 'home',
    needsLogin: false
  }},
  { path: 'login', component: LoginComponent,
  data: {
    pageName: 'login',
    needsLogin: false
  }},
  { path: 'signup', component: SignupComponent,
  data: {
    pageName: 'home',
    needsLogin: false
  }},
  { path: 'shore', component: ShoreComponent, canActivate: [AuthGuard],
  data: {
    pageName: 'home',
    needsLogin: true
  }},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard],
  data: {
    pageName: 'settings',
    needsLogin: true
  }},
  { path: 'bottle-create', component: BottleCreateComponent, canActivate: [AuthGuard],
  data: {
    pageName: 'bottle-create',
    needsLogin: true
  }},
  { path: 'bottle-view', component: BottleViewComponent, canActivate: [AuthGuard],
  data: {
    pageName: 'bottle-view',
    needsLogin: true
  }},
  { path: 'tutorial', component: TutorialComponent, canActivate: [AuthGuard],
  data: {
    pageName: 'tutorial',
    needsLogin: true
  }},
  { path: 'map-view', component: MapViewComponent, canActivate: [AuthGuard],
  data: {
    pageName: 'map-view',
    needsLogin: true
  }},
  {path: '**', component: PageNotFoundComponent,
  data: {
    pageName: 'not-found',
    needsLogin: false
  }}
  
];
  @NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy', scrollPositionRestoration: 'enabled'  })],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
