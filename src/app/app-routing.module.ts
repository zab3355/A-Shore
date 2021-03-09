import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { TestComponent } from './pages/test/test.component';
//For secure login, we can use this later if we have time
//import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  //change this route to login later once we setup auth
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  //if creating a new component put your routes here
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent},
  { path: 'test', component: TestComponent},
];
  @NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy', scrollPositionRestoration: 'enabled'  })],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
