import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Observable, Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {AuthService} from "../authentication/auth.service";
import {UserModel} from "../user/user.model";
import firebase from "firebase";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit, OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  user$: Observable<firebase.User | null>;

  constructor(
    public authService: AuthService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private fireAuth: AngularFireAuth) {
    this.user$ = this.fireAuth.authState;
  }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {

  }

}
