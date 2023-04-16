import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, doc, docData, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})


export class GameComponent implements OnInit {
  game: Game;
  gameId: string;

  constructor(private firestore: Firestore, private route: ActivatedRoute, public dialog: MatDialog) { }


  ngOnInit() {
    this.newGame();
  }


  newGame() {
    this.game = new Game();
    this.route.params.subscribe((params) => {
      
      this.gameId = params['id'];
      const collectionReference = collection(this.firestore, 'games');
      const documentReference = doc(collectionReference, params['id']);

      docData(documentReference).subscribe((game) => {
        this.game.player_images = game['player_images']
        this.game.players = game['players'];
        this.game.stack = game['stack'];
        this.game.playedCard = game['playedCard'];
        this.game.currentPlayer = game['currentPlayer'];
        this.game.currentCard = game['currentCard'];
        this.game.pickCardAnimation = game['pickCardAnimation'];
        this.game.gameOver = game['gameOver']
      });
    });
  }


  takeCard() {
    const card = this.game.stack.pop();

    if (this.game.stack.length == 0) {
      this.game.gameOver = true;
      this.saveGame();

    } else if (card && !this.game.pickCardAnimation) {
      this.game.currentCard = card;
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      this.saveGame();
      setTimeout(() => {
        this.game.playedCard.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);

    }
  }


  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.player_images.splice(playerId, 1);
          this.game.players.splice(playerId, 1);
        } else {
          this.game.player_images[playerId] = change;
        }

        this.saveGame();
      }
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('profile-2.jpg');
        this.saveGame();
      }
    });
  }


  async saveGame() {
    const collectionReference = collection(this.firestore, 'games');
    const documentReference = doc(collectionReference, this.gameId);

    await updateDoc(documentReference, this.game.toJson());
  }
}