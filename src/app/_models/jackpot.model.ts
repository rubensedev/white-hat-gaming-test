import { Game } from './game.model';

export interface Jackpot {
  game: Game['id'];
  amount: number;
}
