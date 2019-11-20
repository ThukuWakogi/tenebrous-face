import { Component, OnInit } from '@angular/core'
import { FormControl, Validators, FormGroup } from '@angular/forms'
import { AuthService } from 'src/app/services/auth/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  showPassword = false
  usernameFormControl =  new FormControl('', [Validators.required])
  passwordFormControl =  new FormControl('', [Validators.required])
  loginForm: FormGroup

  constructor(private authService: AuthService, private router: Router) {
    console.log(this.router.url)
  }

  ngOnInit() {
    this.authService.getAuthenticatedUser()
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSubmit(e: any) {
    e.preventDefault()
    console.log('logFormVal', this.loginForm.value)

    if (!this.loginForm.valid) return

    this
      .authService
      .loginUser(this.loginForm.value)
  }
}
