import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CurrencyPipe, NgClass, NgIf } from '@angular/common';

// Models
import { GameCategory } from '../../_models/game-category.model';
import { GameWithJackpot } from '../../_models/game-with-jackpot.model';

@Component({
  selector: 'game-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, NgIf, CurrencyPipe],
  templateUrl: './game-item.component.html',
  styleUrl: './game-item.component.scss',
})
export class GameItemComponent {
  @Input() game!: GameWithJackpot | null;
  @Input() routeId!: GameCategory['id'];

  customClass(categories: GameCategory['id'][] | undefined) {
    switch (this.routeId) {
      case 'top':
        return categories?.filter((cat) => cat === 'new');
      case 'new':
        return categories?.filter((cat) => cat === 'top');
      default:
        return categories?.filter((cat) => cat === 'new' || cat === 'top');
    }
  }
}
