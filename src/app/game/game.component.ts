import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collectionData, collection, getFirestore, setDoc, doc, addDoc, getDoc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DomElementSchemaRegistry } from '@angular/compiler';


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

    // const aCollection = collection(this.firestore, 'games');
    // this.items$ = collectionData(aCollection);

    // subscribe(auf deutsch abonnieren) wird verwendet wenn man aus der Datenbank Daten holen möchte die sich regelmäßig ändern
    // this.items$.subscribe((newItems$) => {
    //   this.games = newItems$;
    // });
  }


  ngOnInit() {
    this.newGame();

    this.route.params.subscribe((params) => {


      // if (params['id']) {

        const collectionReference = collection(this.firestore, 'games');
        const documentReference = doc(collectionReference, params['id']);

        docData(documentReference, { idField: 'name' }).subscribe(game => console.log(game));

      // }
    });
  }


  async newGame() {
    this.game = new Game();
    const coll = collection(this.firestore, "games");                        // hole die collection in Firestore an der Stelle "todos"
    let gameInfo = await addDoc(coll, { name: this.game.toJson() });         // setze einen neuen Wert
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