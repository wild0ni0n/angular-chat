import { Component } from '@angular/core';

import { Comment } from './class/comment';
import { User } from './class/user';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

const CURRENT_USER: User = new User(1, '五十嵐 洋平');
const ANOTHER_USER: User = new User(2, "竹内 健司");

const COMMENTS: Comment[] = [
  new Comment(ANOTHER_USER, 'お疲れ様です。'),
  new Comment(ANOTHER_USER, 'この間の件ですが、どうなりましたか？'),
  new Comment(CURRENT_USER, 'お疲れ様です。'),
  new Comment(CURRENT_USER, 'クライアントからOKが出ました。'),]

@Component({
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // comments = COMMENTS;
  comments$: Observable<Comment[]>;
  commentsRef: AngularFireList<Comment>
  currentUser = CURRENT_USER;
  comment = '';
  item$: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.item$ = db.object('/item').valueChanges();
    this.commentsRef = db.list('/comments');
    this.comments$ = this.commentsRef.valueChanges();
  }

  addComment(comment: string): void {
    if (comment) {
      this.commentsRef.push(new Comment(this.currentUser, comment));
      this.comment = '';
    }
  }
}
