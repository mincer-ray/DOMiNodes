/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const HanoiGame = __webpack_require__(1);
	const HanoiView = __webpack_require__(2);

	$d( () => {
	  const rootEl = $d('.hanoi');
	  const game = new HanoiGame();
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[5,4,3,2,1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length === 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 5) || (this.towers[1].length == 5);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx);
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class View {

	  constructor(game, $el) {
	    this.game = game;
	    this.$board = $el;
	    this.moveFrom = null;
	    this.moveTo = null;
	    this.$selectedTower = null;
	    this.setupTowers();
	    this.render();
	    this.bindEvents();
	    this.encouragement();
	    // navigator.geolocation.getCurrentPosition(this.getWeather.bind(this));
	    this.encourageID = window.setInterval(this.encouragement, 5000);
	  }

	  setupTowers() {
	    for (let i = 0; i < 3; i++) {
	      this.$board.append(`<ul class=\"tower${i}\"></ul>`);
	    }
	  }

	  render() {
	    $d('ul').empty();

	    const appendDisc = (disc, i) => {
	      $d(`.tower${i}`).append(`<li class=\"disc${disc}\"></li>`);
	    };

	    for (let i = 0; i < 3; i++) {
	      for (let j = 4; j >= 0; j--) {
	        if (this.game.towers[i][j]){
	          appendDisc(this.game.towers[i][j], i);
	        } else{
	          $d(`.tower${i}`).append("<li></li>");
	        }
	      }
	    }
	  }

	  bindEvents() {
	    $d('ul').on("mouseover", event => {
	      $d(event.currentTarget).addClass("hover");
	    });
	    $d('ul').on("mouseleave",event => {
	      $d(event.currentTarget).removeClass("hover");
	    });
	    $d('ul').on("click",event => {
	      this.clickTower($d(event.currentTarget));
	    });
	  }

	  clickTower($tower) {
	    if (this.moveFrom === null) {
	      this.moveFrom = parseInt($tower.attr("class").match(/\d/)[0]);
	      $tower.addClass("selected");
	      this.$selectedTower = $tower;
	    } else {
	      this.moveTo = parseInt($tower.attr("class").match(/\d/)[0]);
	      this.game.move(this.moveFrom, this.moveTo);
	      this.moveFrom = null;
	      this.moveTo = null;
	      this.render();
	      this.$selectedTower.removeClass("selected");
	      if (this.game.isWon()) {
	        this.winScreen();
	      }
	    }
	  }

	  winScreen() {
	    window.clearInterval(this.encourageID);
	    $d('ul').addClass("won");
	    $d('body').addClass("wonImage");
	    $d('.console').empty();
	    $d('.console').append("<h2>You Won!</h2>");
	    $d('*').off();
	  }

	  encouragement() {
	    const niceWords = ["you can do it!", "i know its hard but keep going!",
	    "frank is nice and he thinks you are", "pete is really proud of you", "im sorry there are 5 discs",
	    "what is your favorite disc?", "this is a great game right", "tommy is always smiling it makes us happy",
	    "im not sure what else to say", "yabadabado", "help help im trapped in a computer", "peeeeeace"];
	    $d('.console').empty();
	    $d('.console').append(niceWords[Math.floor(Math.random() * niceWords.length)]);
	  }

	  getWeather(location) {
	    let url = 'https://api.openweathermap.org/data/2.5/weather?';
	    url += `lat=40&lon=-74`;
	    url += `&APPID=f816d7f39052e3a98b21952097a43076`;
	    $d.ajax({url, success: this.postWeather.bind(this)});
	  }

	  postWeather(weather) {
	    weather = JSON.parse(weather);
	    let temp = Math.floor((weather.main.temp - 273.15) * 1.8 + 32);
	    let location = weather.name;
	    $d('.weather').append(`The temperature in NYC is ${temp} degrees`);
	  }
	}

	module.exports = View;


/***/ }
/******/ ]);