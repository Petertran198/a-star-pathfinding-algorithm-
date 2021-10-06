const cols = 5;
const rows = 5;
const grid = new Array(cols);
var w; //width
var h; // height
function Spot(i, j) {
    //x cordinates of spot
    this.x = i;
    //y cordinates of spot
    this.y = j;
    this.f = 0; //
    this.g = 0;
    this.h = 0;

    this.show = function (colorNumber) {
        fill(colorNumber);
        //method to draw rectangle spot
        //(first two params is location while the next two is width & height )
        rect(this.x * w, this.y * h, w - 1, h - 1);
    };
}

var openSet = [];
var closedSet = [];
var start; //start node
var end; //end node

//Setup Method gotten from the p5.js lib
function setup() {
    createCanvas(450, 450);
    // w = 90 if width is 450 and cols is 5.     450/5 = 90
    w = width / cols;
    h = height / rows;

    // make a 2d array of 5 by 5
    // [
    //     [spot,spot,spot,spot,spot],
    //     [spot,spot,spot,spot,spot],
    //     [spot,spot,spot,spot,spot],
    //     [spot,spot,spot,spot,spot],
    //     [spot,spot,spot,spot,spot],
    // ];

    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            //Make each one of the 2d array a custom spot object, look top
            grid[i][j] = new Spot(i, j);
        }
    }

    start = grid[0][0]; // Starting node top left corner note both start and end is an instance of the SPOT class
    end = grid[cols - 1][rows - 1]; // end node ur searching for,  right bottom corner
    openSet.push(start);
}

// draw() is a method from p5.lib that loops forever, until stopped
function draw() {
    // if openSet is empty that means there is no more "Spot" left to be evaluated. This means that we either found the optimal path or there is no path
    if (openSet.length > 0) {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                //grid[i][j] is a spot therefore it can use a custom method made called show
                grid[i][j].show(color(255));
            }
        }
    } else {
    }

    //---------------------------------------------------------------------------
    //Keep track of which spot is part of openSet and closeSet good for debugging
    for (let i = 0; i < openSet.length; i++) {
        //openSet[i] is an instance of Spot class therefore can use the show() method
        openSet[i].show(color(0, 255, 0));
    }
    for (let i = 0; i < closeSet.length; i++) {
        //openSet[i] is an instance of Spot class therefore can use the show() method
        closeSet[i].show(color(255, 0, 0));
    }
}
