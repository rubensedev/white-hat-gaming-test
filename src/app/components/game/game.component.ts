import { Component, Input } from '@angular/core';
import { CurrencyPipe, NgClass, NgIf } from '@angular/common';

// Models
import { GameCategory } from '../../_models/game-category.model';
import { GameWithJackpot } from '../../_models/game-with-jackpot.model';

@Component({
  selector: 'game-item',
  standalone: true,
  imports: [NgClass, NgIf, CurrencyPipe],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameItemComponent {
  @Input() game!: GameWithJackpot | null;

  customClass(categories: GameCategory['id'][] | undefined) {
    return categories?.filter((cat) => cat === 'new' || cat === 'top');
  }
}
