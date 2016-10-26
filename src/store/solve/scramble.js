// @flow
/**
 * TODO: do a random state scramble / figure out Kociemba algorithm.
 *
 * - https://www.speedsolving.com/forum/threads/wca-scramble-algorithm.12969/
 * - https://en.wikipedia.org/wiki/Optimal_solutions_for_Rubik%27s_Cube
 *
 * Current way:
 *
 * 1. generate initial pair of (F|B|U|D|L|R, 1|2|3)
 * 2. generate (desired length - 1) more such pairs but taking care not to
 *    * move opposing face
 *    * repeat same move
 */
type _Move =
    'F'
  | 'B'
  | 'U'
  | 'D'
  | 'L'
  | 'R';

type Step = 1 | 2 | 3;

type Move =
    'F'
  | 'B'
  | 'U'
  | 'D'
  | 'L'
  | 'R'
  | 'F2'
  | 'B2'
  | 'U2'
  | 'D2'
  | 'L2'
  | 'R2'
  | "F'"
  | "B'"
  | "U'"
  | "D'"
  | "L'"
  | "R'";

// map of (_Move, 2) -> Move
const MOVES_2 = {
  F: 'F2',
  B: 'B2',
  U: 'U2',
  D: 'D2',
  L: 'L2',
  R: 'R2',
};

// map of (_Move, 3) -> Move
const MOVES_3 = {
  F: "F'",
  B: "B'",
  U: "U'",
  D: "D'",
  L: "L'",
  R: "R'",
};

function simplify(move: _Move, step: Step): Move {
  switch (step) {
    case 1:
      return move;
    case 2:
      return MOVES_2[move];
    case 3:
      return MOVES_3[move];
    default:
      // should never reach here
      throw new Error("invalid (move, step)", move, step);
  }
}

// map of opposing moves
const OPPOSING = {
  'F': 'B',
  'B': 'F',
  'U': 'D',
  'D': 'U',
  'L': 'R',
  'R': 'L',
};

function opposing(move: _Move): _Move {
  return OPPOSING[move];
}

// each possible move
const _MOVES: _Move[] = ['F', 'B', 'U', 'D', 'L', 'R'];

// each possible step
const STEPS: Step[] = [1,2,3];

function random<T>(list: T[]): T {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

function possibleMoves(m: _Move): _Move[]  {
  return _MOVES.filter(move => (
    move !== m &&
    move !== opposing(m)
  ));
}

function scramble(complexity: number = 25): Move[] {
  if (complexity === 0) { return []; }

  let lastMove = [random(_MOVES), random(STEPS)]
  const moves = [lastMove];

  for (let i=1; i<complexity; i++) {
    lastMove = [random(possibleMoves(lastMove[0])), random(STEPS)]
    moves.push(lastMove);
  }

  return moves.map(([move, step]) => simplify(move, step));
}

const MOVES = [
  'F',
  'B',
  'U',
  'D',
  'L',
  'R',
  'F2',
  'B2',
  'U2',
  'D2',
  'L2',
  'R2',
  "F'",
  "B'",
  "U'",
  "D'",
  "L'",
  "R'",
];

export default scramble;
export type {
  Move
};
export {
  MOVES
};