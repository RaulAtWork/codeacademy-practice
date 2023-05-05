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
};

class Field {
  constructor(field) {
    this._field = field;
    this._posX = 0;
    this._posY = 0;
  }
  get field() {
    return this._field;
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
        this._posX++;
        break;
      case MOVES.up:
        this._posX--;
        break;
      case MOVES.left:
        this._posY--;
        break;
      case MOVES.right:
        this._posY++;
        break;
    }
    //console.log("New position", this._posX, this._posY);

    this._field[this._posX][this._posY] = pathCharacter;
  }
}

const myField = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);

myField.print();
console.log("next move?");

process.stdin.on("data", (data) => {
  myField.move(data.toString().trim());
  myField.print();
  console.log("next move?");
});
