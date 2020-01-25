// create a new scene camed "Game"
const gameScene = new Phaser.Scene("Game");

// init parameters
gameScene.init = function() {
  // words database
  this.words = [
    {
      key: "building",
      setXY: {
        x: 100,
        y: 240
      },
      spanish: "edificio"
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
      },
      spanish: "casa"
    },
    {
      key: "car",
      setXY: {
        x: 400,
        y: 300
      },
      spanish: "automóvil"
    },
    {
      key: "tree",
      setXY: {
        x: 550,
        y: 250
      },
      spanish: "árbol"
    }
  ];
};

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
  this.items = this.add.group(this.words);

  // this is how to change the depth of sriptes/groups
  this.add.sprite(0, 0, "background").setOrigin(0, 0);
  this.items.setDepth(1);

  const items = this.items.getChildren();

  items.forEach((item, i) => {
    // make the sprite clickable
    item.setInteractive();

    // creating tween
    item.correctTween = this.tweens.add({
      targets: item,
      scaleX: 1.5,
      scaleY: 1.5,
      duration: 300,
      paused: true,
      yoyo: true // goes back to original state
    });

    item.wrongTween = this.tweens.add({
      targets: item,
      scaleX: 1.5,
      scaleY: 1.5,
      duration: 300,
      angle: 90,
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
      const result = this.processAnswer(this.words[i].spanish);

      if (result) {
        item.correctTween.resume();
      } else {
        item.wrongTween.resume();
      }

      // show next question
      this.showNextQuestion();
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

    // create sond for each word
    this.words[i].sound = this.sound.add(`${this.words[i].key}Audio`);
  });

  // text object
  this.wordText = this.add.text(30, 20, " ", {
    font: "28px Open Sans",
    fill: "#ffffff"
  });

  // correct / wrong sounds
  this.correctSound = this.sound.add("correct");
  this.wrongSound = this.sound.add("wrong");

  // show the first question
  this.showNextQuestion();
};

// update loop
gameScene.update = function() {};

// show new question
gameScene.showNextQuestion = function() {
  // select a random word
  this.nextWord = Phaser.Math.RND.pick(this.words); // build in Phaser helper, picks a random element from an array

  // play a sound for that word
  this.nextWord.sound.play();

  // show the text of the word in spanish
  this.wordText.setText(this.nextWord.spanish);
};

gameScene.processAnswer = function(userResponse) {
  // compare user response with correct response
  if (userResponse == this.nextWord.spanish) {
    // it's correct

    // play sound
    this.correctSound.play();

    return true;
  }
  // it's wrong

  // play sound
  this.wrongSound.play();

  return false;
};

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene,
  title: "Phaser Game",
  pixelArt: false
};

const game = new Phaser.Game(config);
