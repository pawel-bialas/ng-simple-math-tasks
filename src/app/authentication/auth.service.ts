import {Injectable} from '@angular/core';
import {UserModel} from "../user/user.model";
import {Observable, of, Subscription} from "rxjs";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import firebase from "firebase";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public dbUser: Observable<firebase.User | null>;
  public userModel: Observable<UserModel | null>;


  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.dbUser = this.fireAuth.authState;
    this.userModel = this.credentials();
  }

  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.fireAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.fireAuth.signOut();
    return this.router.navigate(['/']);
  }

  credentials(): Observable<UserModel | null> {
    return this.dbUser.pipe(switchMap(user => {
          if (user) {
            return of(new UserModel(
              user.uid,
              user.displayName,
              user.email,
              false
            ));
          } else {
            return of(null)
          }
    }))
  }
  private updateUserData(user: firebase.User | null) {
    if (user != null) {
      const userRef = this.fireStore.doc('users/' + user.uid);
      const data = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        isAdmin: false
      };

      return userRef.set(data, {merge: true});
    } else return null;
  }
}
