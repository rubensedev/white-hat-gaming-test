import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

// Models
import { Game } from '../../_models/game.model';
import { GameCategory } from '../../_models/game-category.model';

@Component({
  selector: 'game-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameItemComponent {
  @Input() game!: Game | null;

  customClass(categories: GameCategory['id'][] | undefined) {
    return categories?.filter((cat) => cat === 'new' || cat === 'top');
  }
}
