import {Injectable} from '@angular/core';
import {UserModel} from '../user/user.model';
import {Observable, of, Subscription} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import firebase from 'firebase';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import {SystemMessage} from '../error/systemMessage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<UserModel>;
  userSub: Subscription = new Subscription();

  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.fireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.fireStore.doc<any>('users/${user.uid}').valueChanges();
        } else {
          return of(null);
        }
      })
    );

  }

  async googleLogin(): Promise<void> {
    const provider = new GoogleAuthProvider();
    const userCredential = await this.fireAuth.signInWithPopup(provider);
    return this.updateUserData(userCredential.user as firebase.User);
  }

  async signOut(): Promise<boolean> {
    await this.fireAuth.signOut();
    return this.router.navigate(['/']);
  }

  provideCurrentUserUid(): string | undefined {
    let result;
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        result = user.uid;
      } else {
        result = SystemMessage.userNotFound;
      }
    });
    return result;
  }

  private async updateUserData(user: firebase.User): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.fireStore.doc('users/' + user.uid);

    let isAdmin: boolean = await this.isAdmin(user);
    if (isAdmin === undefined) {
      isAdmin = false;
    }

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      isAdmin: isAdmin
    };
    userRef.set(data, {merge: true});
  }

  private async isAdmin(user: firebase.User): Promise<boolean> {
    return await this.fireStore.doc('users/' + user.uid).get().toPromise().then(data => data.get('isAdmin'));
  }

  private async getUserUid(uid: string | undefined): Promise<string> {
    return await this.fireStore.doc('users/' + uid).get().toPromise().then(data => data.get('uid'));
  }
}
