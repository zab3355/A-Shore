import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ConstantsService } from './constants.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private constantsService: ConstantsService, private router: Router) {}

    // Route Guard: If user is not logged in, navigates back to login screen
    canActivate(): boolean { 
        if (this.constantsService.loggedIn()) {
            return true;
        } 
        else{     
            this.router.navigate(['/login']);
            return false;
        }
    }
}