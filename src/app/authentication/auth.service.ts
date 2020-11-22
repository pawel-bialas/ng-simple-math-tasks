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

  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.dbUser = this.fireAuth.authState;
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

  get userModel(): Observable<UserModel | null> {
    let userModel: UserModel;
    return this.dbUser.pipe(switchMap(user => {
      if (user !== null) {
        userModel.uid = user.uid;
        userModel.email = user.email;
        userModel.displayName = user.displayName
        userModel.isAdmin = false;
        return of(userModel);
      } else {
        return of(null);
      }
    }))

  }

  private updateUserData(user: firebase.User | null) {
    if (user != null) {
      const userRef = this.fireStore.doc('users/${user.uid}');
      const data = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email
      };

      return userRef.set(data, {merge: true});
    } else return null;
  }
}
