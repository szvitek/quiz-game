// create a new scene camed "Game"
const gameScene = new Phaser.Scene("Game");

// init parameters
gameScene.init = function() {};

// load asset files
gameScene.preload = function() {
  // load images
  this.load.image("background", "assets/images/background-city.png");
  this.load.image("building", "assets/images/building.png");
  this.load.image("car", "assets/images/car.png");
  this.load.image("house", "assets/images/house.png");
  this.load.image("tree", "assets/images/tree.png");

  // load audio
  this.load.audio("treeAudio", "assets/audio/arbol.mp3");
  this.load.audio("carAudio", "assets/audio/auto.mp3");
  this.load.audio("houseAudio", "assets/audio/casa.mp3");
  this.load.audio("buildingAudio", "assets/audio/edificio.mp3");
  this.load.audio("correct", "assets/audio/correct.mp3");
  this.load.audio("wrong", "assets/audio/wrong.mp3");
};

// create
gameScene.create = function() {
  this.add.sprite(0, 0, "background").setOrigin(0, 0);

  const soundSample = this.sound.add("correct");
  soundSample.play();
};

// update loop
gameScene.update = function() {};

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene,
  title: "Phaser Game",
  pixelArt: false
};

const game = new Phaser.Game(config);
