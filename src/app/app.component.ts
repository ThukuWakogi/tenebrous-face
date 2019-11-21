import { Component } from '@angular/core'
import { MatDialog } from '@angular/material'
import { UploadphotoComponent } from './components/dialogs/uploadphoto/uploadphoto.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(
      UploadphotoComponent,
      {
        data: {
          name: 'ollie',
          closeDialog: this.closeDialog
        }
      }
    )
    dialogRef.beforeClosed().subscribe(result => {console.log({result})})
  }

  closeDialog = () => {
    this.dialog.closeAll()
  }
}
