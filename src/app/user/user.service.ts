import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";
import firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) {

  }

  save (user: firebase.User) {
    this.db.collection('/users').add(user);
  }

  get (uid: String) {
    return this.db.collection('/users/' + uid);
  }
  //
  // update (uid: String, data: any) {
  //   return this.db
  // }

}
