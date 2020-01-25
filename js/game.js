// create a new scene camed "Game"
const gameScene = new Phaser.Scene("Game");

// init parameters
gameScene.init = function() {};

// load asset files
gameScene.preload = function() {};

// create
gameScene.create = function() {};

// update loop
gameScene.update = function() {};

const config = {
  type: Phaser.AUTO,
  width: 640,
  haight: 360,
  scene: gameScene,
  title: "Phaser Game",
  pixelArt: false
};

const game = new Phaser.Game(config);
