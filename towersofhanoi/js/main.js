const HanoiGame = require('./game.js');
const HanoiView = require('./hanoi-view.js');

$d( () => {
  const rootEl = $d('.hanoi');
  const game = new HanoiGame();
  new HanoiView(game, rootEl);
});
