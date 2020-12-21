import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Observable, Subscription} from "rxjs";
import {map} from "rxjs/operators";
import {AuthService} from "../authentication/auth.service";
import {UserModel} from "../user/user.model";

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

  userModel: UserModel | null | undefined;
  private subscription = new Subscription();


  constructor(
    public authService: AuthService,
    private router: Router,
    private breakpointObserver: BreakpointObserver) {
    this.subscription.add(this.authService.userModel.subscribe(userModel => this.userModel = userModel));
  }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
