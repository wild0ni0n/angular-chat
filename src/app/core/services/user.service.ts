import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from '../../class/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) { }

  create(email: string, password: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        const { user } = credential;
        const actionCodeSettings = {
          url: `http://localhost:4200/?newAccount=true&email=${user!.email}`
        };
        user!.sendEmailVerification(actionCodeSettings);
        const u = new User(user!);
        console.log(u);
        this.db.object(`/users/${user!.uid}`).set(u);
      });
  }

  update(values: { displayName?: string, photoURL?: string }): Promise<void> {
    return this.afAuth.currentUser.then((user: firebase.default.User | null) => {
      if (user) {
        user.updateProfile(values)
          .then(() => this.db.object(`/users/${user.uid}`).update(values))
          .then(() => console.log(values))
          .catch(error => console.error(error));
      }
    });
  }
}
