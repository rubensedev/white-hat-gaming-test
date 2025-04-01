import { Game } from './game.model';

export interface GameWithJackpot extends Game {
  jackpot?: number | null;
}
