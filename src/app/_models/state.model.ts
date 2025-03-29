import { Game } from './game.model';

export interface State {
  games: Game[];
  [key: string]: any;
}
