import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent {

  allProfilePictures = ['profile.png', 'profile-female.png', 'profile-2.jpg']


  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) {

  }


  onNoClick(): void {
    this.dialogRef.close();
  }


}
