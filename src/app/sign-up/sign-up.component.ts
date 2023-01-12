import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'ac-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  signup(form: NgForm): void {
    const { email, password } = form.value;

    this.authService.create(email, password)
      .then(() => this.router.navigateByUrl('/users/new'));
  }
}
