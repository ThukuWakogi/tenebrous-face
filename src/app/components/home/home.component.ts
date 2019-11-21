import { Component, OnInit } from '@angular/core'
import { FormControl, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth/auth.service'
import { Router } from '@angular/router'
import { ImagesService } from 'src/app/services/images/images.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  images: any
  baseURL: string = environment.baseURLWithoutSlash
  commentFormControl = new FormControl(
    '',
    [Validators.required, Validators.email]
  )

  constructor(
    private authService: AuthService,
    private router: Router,
    private imageService: ImagesService
  ) {
    console.log('lol')
    this.authService.getAuthenticatedUser()
    this
      .imageService
      .imagesChange
      .subscribe(images => {
        console.log('lol', {images})
        this.images = images
        console.log('lol', {images})
      })

  }

  ngOnInit() {
    this.imageService.getImages()
  }

}
