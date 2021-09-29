const cols = 5;
const rows = 5;
const grid = new Array(cols);

class Spot {
    constructor() {
        this.f = 0;
        this.g = 0;
        this.h = 0;
    }
}

//Setup Method gotten from the p5.js lib
function setup() {
    createCanvas(400, 400);
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
            grid[i][j] = new Spot();
        }
    }

    console.log(grid);
}
