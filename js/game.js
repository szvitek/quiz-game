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
  this.items = this.add.group([
    {
      key: "building",
      setXY: {
        x: 100,
        y: 240
      }
    },
    {
      key: "house",
      setXY: {
        x: 240,
        y: 280
      },
      setScale: {
        x: 0.8,
        y: 0.8
      }
    },
    {
      key: "car",
      setXY: {
        x: 400,
        y: 300
      }
    },
    {
      key: "tree",
      setXY: {
        x: 550,
        y: 250
      }
    }
  ]);

  // this is how to change the depth of sriptes/groups
  this.add.sprite(0, 0, "background").setOrigin(0, 0);
  this.items.setDepth(1);

  Phaser.Actions.Call(this.items.getChildren(), item => {
    // make the sprite clickable
    item.setInteractive();

    // creating tween - resize tween
    item.resizeTween = this.tweens.add({
      targets: item,
      scaleX: 1.5,
      scaleY: 1.5,
      duration: 300,
      paused: true,
      yoyo: true // goes back to original state
    });

    // transparency tween
    item.alphaTween = this.tweens.add({
      targets: item,
      alpha: 0.7,
      duration: 200,
      paused: true
    });

    // listen to pointerdown event
    item.on("pointerdown", () => {
      console.log(item);
      item.resizeTween.resume(); // doesn't work with start/restart
    });

    // listen to pointerover event
    item.on("pointerover", () => {
      item.alphaTween.resume();
    });

    // listen to pointerout event
    item.on("pointerout", () => {
      // stop alpha tween
      // if mouseout happens before alphaTween finished that will overwrite the alpha and stays transparent
      item.alphaTween.stop();

      // set alpha back to 1
      item.alpha = 1;
    });
  });
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
