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
    this.getWeather();
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

  getWeather() {
    let url = 'http://api.openweathermap.org/data/2.5/weather?';
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
