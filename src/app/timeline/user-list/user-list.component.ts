import { Component } from '@angular/core';
import { AngularFireList, AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';
import { User } from 'src/app/class/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ac-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  usersRef: AngularFireList<User>;
  users$: Observable<User[]>;

  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list('/users');
  }

  ngOnInit(): void {
    this.users$ = this.usersRef.snapshotChanges().pipe(
      map((snapshots: SnapshotAction<User>[]) => {
        return snapshots.map(snapshot => {
          const values = snapshot.payload.val();
          return new User(values);
        });
      })
    );
  }
}
