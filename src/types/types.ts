export type Weapon = 'rock' | 'paper' | 'scissors' | 'spock' | 'lizard';
export const WEAPONS: Weapon[] = ['rock', 'paper', 'scissors', 'spock', 'lizard'];

export type GameMode = 'easy' | 'hard' | 'god' | 'ai';
export const GAME_MODES: GameMode[] = ['easy', 'hard', 'ai', 'god'];

export type FightResult = 'playerOne' | 'playerTwo' | 'tie';

export interface PlayersChoices {
  rock: number;
  paper: number;
  scissors: number;
  spock: number;
  lizard: number;
}
