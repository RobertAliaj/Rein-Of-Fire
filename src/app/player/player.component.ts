import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  // input-variable bedeutet, dass der Name von einer anderen Komponente an die "PlayerComponent" übergeben werden kann, 
  // in diesem Fall kriegt die Variable ihren Wert bei der GameComponent.
  @Input() name: string;   
  @Input() image = 'profile-2.jpg';   
  @Input() playerActive: boolean = false;

}
