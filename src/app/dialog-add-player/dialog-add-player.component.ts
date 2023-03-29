import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent {

  // Die Variable wird erst mal als ein leerer String definiert
  name: string = '';

  // Durch die syntax zwischen den Klammern wird es möglich gemacht an die verschiedenen Dialog methoden zuzugreifen 
  // public steht dafür das man auf diese Variable aus verschiedenen Komponenten zugreifen kann
  // "dialogRef" ist in diesem Fall die Variable
  // z.B so --> this.dialogRef.close(); damit wird der Dialog geschlossen
  // Dieser Teil besagt das es sich um den Dialog von dieser Komponente handelt"<DialogAddPlayerComponent>"
  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) {
  }

  // Void heißt das die Funktion nur iwas ausführt und nichts zurück gibt
  onNoClick(): void {
    this.dialogRef.close();
  }
}
