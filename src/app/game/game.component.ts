import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})


export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game!: Game; //Das "!" gibt an dass die variable "game" irgendwann später im Code initialisiert wird und TypeScript davon ausgehen sollte, dass sie immer einen Wert hat. Auch "definite assignment assertion". 


  ngOnInit() {
    this.newGame();
  }


  newGame() {
    this.game = new Game();
    console.log(this.game);
  }
  
  
  takeCard() {
    this.pickCardAnimation = true;
  }

}
