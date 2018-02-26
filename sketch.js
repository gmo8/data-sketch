
var bg;

var species;

function preload(){

    table = loadTable("data/workbook1.cvs", "header");
}

var table;
function setup(){
    createCanvas(1500,1000);    
    bg = loadImage("libraries/1.jpeg");
    loadData();

}

function draw(){

    background(bg);

    for (var i = 0; i < species.length; i++) {
        species[i].display();
        species[i].rollover(mouseX, mouseY);
      }
}

function loadData() {

    species = [];

    for (var i = 0; i < table.getRowCount(); i++) {
        var row = table.getRow(i);
        var x = row.get("x");
    var y = row.get("y");
    var d = row.get("diameter");
    var n = row.get("name");
    species[i] = new Species(x, y, d, n);
  }
}

class Species {
    constructor(x, y, diameter, s) {
      this.x = Number(x);
      this.y = Number(y);
      this.diameter = Number(diameter);
      this.name = s;
      this.over = false; 
    }
      rollover(px, py) {
        var d = dist(px, py, this.x, this.y);
        if (d < this.diameter/2) {
          this.over = true;
        } else {
          this.over = false;
        }
    }

display() {
    stroke(0);
    strokeWeight(2);
    noFill();
    ellipse(this.x, this.y, this.diameter, this.diameter);
    if (this.over) {
      textAlign(CENTER);
      noStroke();
      fill(0);
      text(this.name, this.x, this.y + this.diameter/2 + 20);
    }
  }
}