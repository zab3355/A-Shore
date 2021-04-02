import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TestComponent } from './pages/test/test.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ShoreComponent } from './pages/shore/shore.component';
import { TutorialComponent } from './pages/tutorial/tutorial.component';
import { MapViewComponent } from './pages/map-view/map-view.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { BottleViewComponent } from './pages/bottle-view/bottle-view.component';
import { BottleCreateComponent } from './pages/bottle-create/bottle-create.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  //change this route to login later once we setup auth
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  //if creating a new component put your routes here
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'test', component: TestComponent},
  { path: 'shore', component: ShoreComponent},
  { path: 'bottle-create', component: BottleCreateComponent},
  { path: 'bottle-view', component: BottleViewComponent},
  { path: 'tutorial', component: TutorialComponent},
  { path: 'map-view', component: MapViewComponent},
  {path: '**', component: PageNotFoundComponent}
  
];
  @NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy', scrollPositionRestoration: 'enabled'  })],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
