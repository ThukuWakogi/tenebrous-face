import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { environment } from 'src/environments/environment'
import axios from 'axios'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false
  authenticatedUser: any = {}
  authenticatedUserChange: Subject<{}> = new Subject()
  errors = {}
  errorsChange: Subject<{}> = new Subject()

  constructor(private router: Router) { }

  registerUser(registerData: any) {
    axios
      .post(`${environment.baseURL}users/`, registerData)
      .then(res => {
        this.clearErrors()
        localStorage.setItem('tnbrs_token', res.data.token)
        this.authenticatedUser = res.data.user
        this.authenticatedUserChange.next(this.authenticatedUser)
        this.router.navigate([''])
        this.isAuthenticated = true
      })
      .catch(err => {
        this.clearErrors()
        this.errors = err.response.data
        this.errorsChange.next(err.response.data)
      })
  }

  loginUser(loginData: any) {
    axios
      .post(`${environment.baseURL}auth/`, loginData)
      .then(res => {
        console.log(res)
        localStorage.setItem('tnbrs_token', res.data.token)
        this.authenticatedUser = res.data.user
        this.authenticatedUserChange.next(this.authenticatedUser)
        this.router.navigate([''])
        this.isAuthenticated = true
      })
      .catch(err => console.log({err}))
  }

  getAuthenticatedUser() {
    axios
      .get(
        `${environment.baseURL}udft/`,
        { headers:
          {
            Authorization: `token ${localStorage.getItem('tnbrs_token')}`
          }
        }
      )
      .then(res => {
        console.log({res})
        console.log(this.router.url)

        if (this.router.url === '/login' || this.router.url === '/register') this.router.navigate([''])

        this.authenticatedUser = res.data.user
        this.authenticatedUserChange.next(this.authenticatedUser)
      })
      .catch(err => {
        console.log({err})

        if (err.response.status === 401) this.router.navigate(['login'])
      })
  }

  clearErrors() {
    console.log('clearing errors')
    this.errors = {}
    this.errorsChange.next(this.errors)
    console.log(this.errors)
  }
}
