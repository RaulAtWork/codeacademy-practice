const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

const MOVES = {
  up: "w",
  down: "s",
  left: "a",
  right: "d",
  exit: "x",
};

class Field {
  constructor(field) {
    this._field = field;
    this._posX = 0;
    this._posY = 0;
    this._gameOutcome = null;
    this._maxPosX = field.length - 1;
    this._maxPosY = field[0].length - 1;
  }
  get field() {
    return this._field;
  }

  get gameOutcome() {
    return this._gameOutcome;
  }
  static generateField(height, width, numberOfholes) {
    function getRandomPos() {
      return [
        Math.round(Math.random() * (height - 1)),
        Math.round(Math.random() * (width - 1)),
      ];
    }
    function getRandomHat() {
      let [g1, g2] = getRandomPos();

      return g1 === 0 && g2 === 0 ? getRandomHat() : [g1, g2];
    }
    function getRandomHoles() {
      let randomHoles = [];
      while (randomHoles.length < numberOfholes) {
        let [r1, r2] = getRandomPos();
        if (!randomHoles.some((item) => item[0] == r1 && item[1] === r2)) {
          randomHoles.push([r1, r2]);
        }
      }

      return randomHoles;
    }

    let generatedField = Array(height).fill([]);
    generatedField = generatedField.map(() =>
      Array(width).fill(fieldCharacter)
    );

    //set holes
    let holeArray = getRandomHoles();
    holeArray.forEach((item) => (generatedField[item[0]][item[1]] = hole));

    //set hat
    let [ranX, ranY] = getRandomHat();
    generatedField[ranX][ranY] = hat;
    //set player
    generatedField[0][0] = pathCharacter;

    return generatedField;
  }
  print() {
    console.log("Player position", this._posX, this._posY);
    this._field.forEach((element) => {
      console.log(element.join(""));
    });
  }
  move(direction) {
    //console.log("Moved towards direction", direction);
    switch (direction) {
      case MOVES.down:
        this._posX =
          this._posX >= this._maxPosX ? this._maxPosX : this._posX + 1;
        break;
      case MOVES.up:
        this._posX = this._posX <= 0 ? 0 : this._posX - 1;
        break;
      case MOVES.left:
        this._posY = this._posY <= 0 ? 0 : this._posY - 1;
        break;
      case MOVES.right:
        this._posY =
          this._posY >= this._maxPosY ? this._maxPosY : this._posY + 1;
        break;
      case MOVES.exit:
        process.exit();
    }
    //console.log("New position", this._posX, this._posY);

    switch (this._field[this._posX][this._posY]) {
      case hole:
        this._gameOutcome = "Game Over, Fell on a Hole!";
        break;
      case hat:
        this._gameOutcome = "Congrats! you found your hat.";
        break;
    }

    this._field[this._posX][this._posY] = pathCharacter;
  }
}

const myField = new Field(Field.generateField(10, 10, 10));

myField.print();
console.log("next move?");

process.stdin.on("data", (data) => {
  myField.move(data.toString().trim());
  if (myField.gameOutcome) {
    console.log(myField.gameOutcome);
    process.exit();
  }
  myField.print();
  console.log("next move?");
});
