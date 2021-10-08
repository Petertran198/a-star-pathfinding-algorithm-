const cols = 25;
const rows = 25;
const grid = new Array(cols);
let w; //width of "spot"
let h; // height of "spot"
let openSet = [];
let closedSet = [];
let start; //start node
let end; //end node

const distanceBetweenItselfAndTheEnd = (spot1, spot2) => {
    //Formula for distance
    const distance = abs(spot1.i - spot2.i) + abs(spot1.j - spot2.j);
    return distance;
};

function Spot(i, j) {
    //i cordinates of spot to find from first part of array[][]
    this.i = i;
    //j cordinates of spot to find from second part of array[][]
    this.j = j;
    this.f = 0; //
    this.g = 0;
    this.h = 0;
    //Array that holds neighboring spots to see if there path is faster or not
    this.neighbors = [];
    // used to keep track of where certain "spot" is located so when u find the best path u can use this to retrace ur step
    this.cameFrom = undefined;
    this.show = (colorNumber) => {
        fill(colorNumber);
        //method to draw rectangle spot
        //(first two params is location while the next two is width & height )
        rect(this.i * w, this.j * h, w - 1, h - 1);
    };

    this.addNeighbor = (gridArray) => {
        const i = this.i;
        const j = this.j;
        //Adding neighboring spots that is within the range of the grid array.
        // the max i can be when added to neighbors[] is 4 as cols is 5
        if (i < cols - 1) {
            this.neighbors.push(gridArray[i + 1][j]);
        }
        if (i > 0) {
            this.neighbors.push(gridArray[i - 1][j]);
        }
        if (j < rows - 1) {
            this.neighbors.push(gridArray[i][j + 1]);
        }
        if (j > 0) {
            this.neighbors.push(gridArray[i][j - 1]);
        }
    };
}

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

    //Make spot for each box("spot") on grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            //Make each one of the 2d array a custom spot object, look top
            grid[i][j] = new Spot(i, j);
        }
    }
    //Add the 4 neighbors for each box("spot") on grid or 2-3 for outer array edge case
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].addNeighbor(grid);
        }
    }

    start = grid[0][0]; // Starting node top left corner note both start and end is an instance of the SPOT class
    end = grid[cols - 1][rows - 1]; // end Spot node ur searching for,  right bottom corner
    openSet.push(start);
}

// draw() is a method from p5.lib that loops forever, until stopped
function draw() {
    // if openSet is empty that means there is no more "Spot" left to be evaluated. This means that we either found the optimal path or there is no path
    if (openSet.length > 0) {
        // Keep track of the winner index, start at 0
        let winnerIndex = 0;
        for (let i = 0; i < openSet.length; i++) {
            //In a * algorithim the highest f score is the best path
            //We are iterating though openSet[i] and comparing its .f score to the one we deem the "winnerIndex" as of rn.
            if (openSet[i].f < openSet[winnerIndex].f) {
                winnerIndex = i;
            }
        }
        // current is always the spot with the highest f score currently
        var current = openSet[winnerIndex];
        if (current === end) {
            noLoop();
            console.log('Done, fastest path calculated');
        }
        // We remove the current from openSet and add to closedSet as it is not the end spot or destination we wanted to reach
        closedSet.push(current);
        openSet.splice(current, 1);
        //Go through all of the current spot's neighbors and calculate how long it take to get to the current spot(g score) and how long it takes to get to the end(h score)
        //and then we add it up to get the (f score). The spot with the highest f score is the one with the optimal path
        for (let i = 0; i < current.neighbors.length; i++) {
            let neighbor = current.neighbors[i];
            if (!closedSet.includes(neighbor)) {
                let tempGScore = current.g + 1;
                // if neighbor isn't included in closedSet check if it is in openSet
                // if it is already in openSet u add the lower  g score of the two
                // if it isn't in the openSet add it along with g score
                if (openSet.includes(neighbor)) {
                    if (tempGScore < neighbor.g) {
                        neighbor.g = tempGScore;
                    }
                } else {
                    // if it aint part of closedSet or openSet add it
                    neighbor.g = tempGScore;
                    openSet.push(neighbor);
                }
                neighbor.h = distanceBetweenItselfAndTheEnd(neighbor, end);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.cameFrom = current;
            }
        }
    } else {
    }

    //---------------------------------------------------------------------------
    //MAke every spot white change it's color depending if it becomes part of openSet or closeSet
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            //grid[i][j] is a spot therefore it can use a custom method made called show
            grid[i][j].show(color(255));
        }
    }

    //Keep track of which spot is part of openSet and closeSet good for debugging
    for (let i = 0; i < openSet.length; i++) {
        //openSet[i] is an instance of Spot class therefore can use the show() method
        openSet[i].show(color(0, 255, 0)); // green for openSet
    }
    for (let i = 0; i < closedSet.length; i++) {
        //openSet[i] is an instance of Spot class therefore can use the show() method
        closedSet[i].show(color(255, 0, 0));
    }

    let fastestPath = [];
    let temp = end; // End spot first in list then work our way backwords or when we get to the end trace back to find the optimal path
    fastestPath.push(temp);
    while (temp.cameFrom) {
        fastestPath.push(temp.cameFrom);
        temp = temp.cameFrom;
    }

    for (let i = 0; i < fastestPath.length; i++) {
        fastestPath[i].show(color(0, 0, 255)); /// blue for fastest path
    }
}
