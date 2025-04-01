import { Game } from './game.model';
import { Jackpot } from './jackpot.model';

export interface State {
  games: Game[];
  jackpots: Jackpot[];
}
