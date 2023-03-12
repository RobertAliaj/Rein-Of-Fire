import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})


export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';  // das geht auch so "currentCard?" oder "currentCard : string = '' | undefined"
  game!: Game; //Das "!" gibt an dass die variable "game" irgendwann später im Code initialisiert wird und TypeScript davon ausgehen sollte, dass sie immer einen Wert hat. Auch "definite assignment assertion". 

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.newGame();
  }


  newGame() {
    this.game = new Game();
  }


  takeCard() {
    const card = this.game.stack.pop(); // wieso kann das überhaupt einen undefined Wert zurückgeben ??
    if (card && !this.pickCardAnimation) {
      this.currentCard = card;
      this.pickCardAnimation = true;

      this.game.currentPlayer++
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCard.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}

