import { Component, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  showPassword = false
  emailFormControl = new FormControl('', [Validators.required, Validators.email])
  usernameFormControl =  new FormControl('', [Validators.required])
  passwordFormControl =  new FormControl('', [Validators.required])

  constructor() { }

  ngOnInit() {
  }
}
