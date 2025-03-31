import { GameCategory } from './game-category.model';
export interface Game {
  id: string;
  image: string;
  name: string;
  categories: GameCategory['id'][];
}
