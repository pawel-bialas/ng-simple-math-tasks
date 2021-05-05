import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../../authentication/auth.service';
import {SystemMessage} from '../../error/systemMessage';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  constructor(private firesStore: AngularFirestore, private authService: AuthService) {

  }

   saveSolution(completeSolution: any[]): void {
    const uid = this.authService.provideCurrentUserUid();
    console.log('uid: ' + uid);
    console.log('solution: ' + JSON.stringify(completeSolution));
    console.log('last: ' + JSON.stringify(completeSolution[completeSolution.length - 1].uid));
  }

}
