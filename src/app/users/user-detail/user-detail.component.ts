import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from 'src/app/class/user';
import { Location } from '@angular/common';

@Component({
  selector: 'ac-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {

  user$: Observable<User>;


  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.user$ = this.db.object<User>(`/users/${id}`).valueChanges();
  }

  goBack(event: MouseEvent): void {
    event.preventDefault();
    this.location.back();
  }

}
