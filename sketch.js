
var bg;

var species;

var images = [];

function preload(){
    table = loadTable("data/workbook1.csv", "header");
    for(var i=0; i < 5; i++){
      images[i] = loadImage('photos/' + i + '.jpg');
    }
}

var table;
function setup(){
    createCanvas(windowWidth,windowHeight);    
    bg = loadImage("libraries/back.jpeg");
    loadData();
}

function draw(){

    background(bg);

    for (var i = 0; i < species.length; i++) {
        species[i].display();
        species[i].rollover(mouseX, mouseY);
      }
}

function loadData(){

    species = [];

    for (var i = 0; i < table.getRowCount(); i++) {
        var row = table.getRow(i);
        var animal = row.get("species");
        var fact = row.get("pop");
        species[i] = new Species(images[i], random(0, windowWidth), random(0, windowHeight), 80, fact);
  }
}

class Species {
    constructor(photo, x, y, diameter, s) {
      this.x = Number(x);
      this.y = Number(y);
      this.diameter = Number(diameter);
      this.name = s;
      this.over = false;
      this.photo = photo; 
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
    images(this.photo, this.x, this.y, this.diameter, this.diameter);
    if (this.over) {
      textAlign(CENTER);
      noStroke();
      fill(0);
      text(this.name, this.x, this.y + this.diameter/2 + 20);
    }
  }
}