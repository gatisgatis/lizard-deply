import {
  Weapon, WEAPONS, GameMode, FightResult, PlayersChoices,
} from '../types/types';

export const determineWinner = (playerOneWeapon: Weapon, playerTwoWeapon: Weapon): FightResult => {
  const playerOneValue = WEAPONS.indexOf(playerOneWeapon);
  const playerTwoValue = WEAPONS.indexOf(playerTwoWeapon);
  if (playerOneValue === playerTwoValue) {
    return 'tie';
  }
  let fightsValue = playerOneValue - playerTwoValue;
  if (fightsValue < 0) {
    fightsValue += 5;
  }
  if (fightsValue % 2) {
    return 'playerOne';
  }
  return 'playerTwo';
};

export const getComputersWeapon = (
  mode: GameMode,
  computersPrevWeapon: Weapon = 'rock',
  playersWeapon: Weapon = 'rock',
  stats: PlayersChoices,
  totalMoves: number,
): Weapon => {
  switch (mode) {
    case 'easy': {
      let index = WEAPONS.indexOf(computersPrevWeapon) + 1;
      if (index > 4) {
        index = 0;
      }
      return WEAPONS[index];
    }
    case 'hard': {
      const index = Math.floor(Math.random() * 5);
      return WEAPONS[index];
    }
    case 'god': {
      const indexPlayer = WEAPONS.indexOf(playersWeapon);
      const random = Math.random() > 0.5 ? 1 : 3;
      let indexComputer = indexPlayer + random;
      if (indexComputer > 4) {
        indexComputer -= 5;
      }
      return WEAPONS[indexComputer];
    }
    case 'ai': {
      if (totalMoves < 1) {
        const index = Math.floor(Math.random() * 5);
        return WEAPONS[index];
      }
      let add = 0;
      const modifiedStats = Object.values(stats).map((val) => {
        const stat = (val * 0.8) / totalMoves + add;
        add = stat;
        return stat;
      });
      modifiedStats.push(1);
      const selector = Math.random();
      let i = 0;
      let predictionIndex = 5;
      while (i < 6) {
        if (selector < modifiedStats[i]) {
          predictionIndex = i;
          break;
        }
        i += 1;
      }
      if (predictionIndex > 4) {
        const index = Math.floor(Math.random() * 5);
        return WEAPONS[index];
      }
      console.log('players moves:', stats);
      console.log('selector: ', selector);
      console.log('selectionArr', modifiedStats);
      console.log('prediction:', WEAPONS[predictionIndex]);
      const random = Math.random() > 0.5 ? 1 : 3;
      let indexComputer = predictionIndex + random;
      if (indexComputer > 4) {
        indexComputer -= 5;
      }
      return WEAPONS[indexComputer];
    }
    default: {
      return 'rock';
    }
  }
};
