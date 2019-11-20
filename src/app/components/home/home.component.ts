import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  commentFormControl = new FormControl(
    '',
    [Validators.required, Validators.email]
  )

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getAuthenticatedUser()
  }

  ngOnInit() {
    // this.authService.getAuthenticatedUser()
  }

}
