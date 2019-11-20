import { Component, OnInit } from '@angular/core'
import { FormControl, Validators, FormGroup } from '@angular/forms'
import { AuthService } from 'src/app/services/auth/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {
  showPassword = false
  registerForm: FormGroup
  errors = {}

  constructor(private authService: AuthService) {
    this
      .authService
      .errorsChange
      .subscribe(errors => {
        console.log({errors})
        console.log('current', this.errors)
        this.errors = errors
        console.log('updated', this.errors)
      })
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  onSubmit(e: any) {
    e.preventDefault()

    if (!this.registerForm.valid) return

    this
      .authService
      .registerUser(this.registerForm.value)
  }

  isErrorsEmpty(): boolean { return true ? Object.keys(this.errors).length !== 0 : false }
}
