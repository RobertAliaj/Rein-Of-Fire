import { Component } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  game!: Game;

  constructor(private router: Router, private route: ActivatedRoute, private firestore: Firestore) { }



  async newGame() {
    this.game = new Game();                                             // starte eine neues Spiel

    const coll = collection(this.firestore, "games");                   // hole die collection in Firestore an der Stelle "todos"
    let gameInfo = await addDoc(coll, this.game.toJson());              // setze einen neuen Wert (neues ID dokument (URL))
    this.router.navigateByUrl('game/' + gameInfo.id);                   // navigiere zu dem angegebenen Pfad (game/id)
  }
}
