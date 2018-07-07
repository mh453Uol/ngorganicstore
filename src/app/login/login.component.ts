import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  invalidLogin: boolean;

  constructor(private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('',
        [Validators.required, Validators.email]),
      password: new FormControl('',
        [Validators.required])
    });
  }

  onSubmit() {
    let credentials = this.form.value;
    let rawRedirectTo = this.route.snapshot
      .queryParamMap.get('redirectTo');
    let redirectTo = rawRedirectTo ? rawRedirectTo : '';


    if (this.form.valid) {
      this.auth.login(credentials).subscribe(response => {
        if (response) {
          this.router.navigate([redirectTo]); //home
        } else {
          this.invalidLogin = true;
        }
      });
    }
  }

  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }

}
