import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collectionData, collection, getFirestore, setDoc, doc, addDoc, getDoc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})


export class GameComponent implements OnInit {

  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game;

  items$!: Observable<any>;
  games!: Array<any>;

  constructor(private firestore: Firestore, private route: ActivatedRoute, public dialog: MatDialog) {

    const aCollection = collection(this.firestore, 'games');  // hole die collection "games" aus dem Firestore
    this.items$ = collectionData(aCollection);                // items$ ist = "games" aus dem Firestore

    // subscribe(auf deutsch abonnieren) wird verwendet wenn man aus der Datenbank Daten holen möchte die sich regelmäßig ändern
    this.items$.subscribe((newItems$) => {     // items$ subscribet die Variable "newItems$" (das heißt jedes mal wenn sich da was ändert kriegt updatet sich die Varibable "newItems$")
      this.games = newItems$;                  // "games" kriegt jedes mal den Updagedatetetn Wert von Firestore
    });
  }


  ngOnInit() {
    this.newGame();   

    // this.route.params.subscribe((params) => {

      // const collectionReference = collection(this.firestore, 'games');
      // const documentReference = doc(collectionReference, params['id']);

      // docData(documentReference, { idField: 'name' }).subscribe(game => console.log(game));
    // });
  }


  async newGame() {
    this.game = new Game();
  }


  takeCard() {
    const card = this.game.stack.pop();
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