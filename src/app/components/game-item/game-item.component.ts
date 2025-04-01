import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

// Models
import { Game } from '../../_models/game.model';
import { GameCategory } from '../../_models/game-category.model';

@Component({
  selector: 'game-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass],
  templateUrl: './game-item.component.html',
  styleUrl: './game-item.component.scss',
})
export class GameItemComponent {
  @Input() game!: Game | null;
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
