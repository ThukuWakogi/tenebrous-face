import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material'
import { inject } from '@angular/core/testing'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth/auth.service'
import { ImagesService } from 'src/app/services/images/images.service'

@Component({
  selector: 'app-uploadphoto',
  templateUrl: './uploadphoto.component.html',
  styleUrls: ['./uploadphoto.component.scss']
})
export class UploadphotoComponent implements OnInit {
  photoForm: FormGroup
  previewPhoto: any
  selectedFile: any

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private imagesService: ImagesService
  ) { }

  ngOnInit() {
    this.photoForm = new FormGroup({
      image: new FormControl('', [Validators.required]),
      caption: new FormControl('', [Validators.required])
    })
  }

  onImageSelect(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0]
      const reader = new FileReader()
      reader.onload = e => this.previewPhoto = reader.result
      reader.readAsDataURL(this.selectedFile)
    }
  }

  isFormValid(): boolean { return this.selectedFile === undefined || this.photoForm.get('caption').value.trim() === '' }

  onSubmit(event: any) {
    console.log({
      image: this.selectedFile,
      caption: this.photoForm.value.caption,
    })
    const imageFormData = new FormData()
    imageFormData.append('image', this.selectedFile)
    imageFormData.append('caption', this.photoForm.value.caption)
    console.log('val', this.photoForm.value)
    this.imagesService.uploadImage(imageFormData, this.data.closeDialog)
  }
}
