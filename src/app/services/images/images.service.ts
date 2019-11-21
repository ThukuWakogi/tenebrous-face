import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { environment } from 'src/environments/environment'
import axios from 'axios'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  images: any[]
  imagesChange: Subject<{}> = new Subject()

  constructor(private router: Router) { }

  getImages(): void {
    axios
      .get(`${environment.baseURL}images/`)
      .then(res => {
        console.log({res})
        this.images = res.data
        this.imagesChange.next(this.images)
      })
      .catch(err => {console.log({err})})
  }

  uploadImage(photoData: any, closeDialog: any): void {
    console.log({photoData})
    axios
      .post(
        `${environment.baseURL}images/`,
        photoData,
        {
          headers: {
            Authorization: `token ${localStorage.getItem('tnbrs_token')}`
          }
        }
      )
      .then(res => {
        closeDialog()
        console.log(res)
        this.getImages()
      })
      .catch(err => {
        console.log({err})

        if (err.response.status === 401) this.router.navigate(['login'])
      })
  }
}
