let canvas, context, populationSize=10, haveData=false;
let sim, startTime, aliveNow=populationSize, generation=1;
let roller; // movement[arrays][roller]
let deltaTime, maxTime=0, cycleFrequency=45;
let birds = [];
let pipes = [];
let movement = [];
let strongestGenes = [];


// creates a population of birds
function createBirdArray() {
    for (let i=0; i<populationSize; i++) {
        let temp = "#";
        for (let j=0; j<6; j++) {
            temp += Math.floor(Math.random()*10);
        }
        birds.push(new Bird(canvas, temp));
    }
}

function checkForDeaths() {
    let count = 0;
    for (let i=0; i<populationSize; i++) {
        if (birds[i].alive === false)
            count++;
    }

    if (count === populationSize) {
        sim = clearInterval(sim);

        // set data for viewing
        generation += 1;
        updateGeneration();
        aliveNow = populationSize;
        updateAlive();
        pipes.length = 0;
        pipes.push(new Pipe());

        movement.length = 0; // empty old values

        // selection
        let fittest = strongestGenes;
        // crossover
        fittest = String(fittest);
        for (let i = 0; i < populationSize; i++) {
            let temp = '';
            for (let j = 0; j < fittest.length - 100; j++) {
                if (fittest.charAt(j) !== ",")
                    temp += fittest.charAt(j);
            }
            // mutation
            for (let j = 0; j < 100; j++) {
                if (Math.random() < 0.1)
                    temp += 1;
                else
                    temp += 0;
            }
            movement.push(temp)
        }

        //console.log(movement);

        birds.length = 0; // empty old values
        createBirdArray();

        haveData = true;
        roller = 0;

        //simulateV2();
        startTime = (new Date()).getTime();
        sim = setInterval(simulate, cycleFrequency);
    }
}

function simulateV2() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    for (let i=0; i<populationSize; i++) {
        birds[i].show();
        birds[i].update();

        if (movement[i][roller]==="1") {
            birds[i].jump();
            birds[i].DNA.genes.push(1);
        }else {
            birds[i].DNA.genes.push(0);
        }

        if (i===populationSize-1)
            roller++;

        ///*
        if (pipes[0].hits(birds[i]) && birds[i].alive) {
            birds[i].alive = false;
            aliveNow -= 1;
            updateAlive();
            if (aliveNow===0 && strongestGenes.length < birds[i].DNA.genes.length) {
                strongestGenes = birds[i].DNA.genes;
            }
        }

    }

    for (let i=0; i<pipes.length; i++) {
        pipes[i].show();
        pipes[i].update();
    }
    if (pipes[pipes.length-1].x  < 200)
        pipes.push(new Pipe());
    if (pipes[0].x < 0)
        pipes.splice(pipes[0], 1);

    checkForDeaths();
    updateTime();
}

function simulate() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    for (let i=0; i<populationSize; i++) {
        birds[i].show();
        birds[i].update();

        if (haveData===false) {
            if (birds[i].alive) {
                if (Math.random() < 0.1) {
                    birds[i].jump();
                    birds[i].DNA.genes.push(1);
                } else {
                    birds[i].DNA.genes.push(0);
                }
            }
        }else {
            if (movement[i][roller]==="1") {
                birds[i].jump();
                birds[i].DNA.genes.push(1);
            }else {
                birds[i].DNA.genes.push(0);
            }

            console.log("velocity=", birds[i].velocity);

            if (i===populationSize-1) {
                roller++;
                if (roller===movement[0].length)
                    haveData = false;
            }
        }

        if (pipes[0].hits(birds[i]) && birds[i].alive) {
            birds[i].alive = false;
            aliveNow -= 1;
            updateAlive();
            if (aliveNow===0 && strongestGenes.length < birds[i].DNA.genes.length) {
                strongestGenes = birds[i].DNA.genes;
            }
        }
    }

    for (let i=0; i<pipes.length; i++) {
        pipes[i].show();
        pipes[i].update();
    }
    if (pipes[pipes.length-1].x  < 200)
        pipes.push(new Pipe());
    if (pipes[0].x < 0)
        pipes.splice(pipes[0], 1);

    checkForDeaths();
    updateTime();
}

function main() {
    startTime = (new Date()).getTime();
    document.getElementById("populationSize").innerHTML = ""+populationSize;
    updateAlive();
    canvas =  document.getElementById("gamePlayArea");
    context = canvas.getContext("2d");
    pipes.push(new Pipe());
    createBirdArray();
    sim = setInterval(simulate, cycleFrequency);
}


// these functions update the UI
function updateAlive() {
    document.getElementById("alive").innerHTML = ""+aliveNow;
}
function updateGeneration() {
    document.getElementById("generation").innerHTML = ""+generation;
}
function updateMax() {
    document.getElementById('maxGen').innerHTML = ""+generation;
    document.getElementById('maxTime').innerHTML = ""+maxTime;
}
function updateTime() {
    deltaTime = (((new Date()).getTime()-startTime)/1000).toFixed(1);
    document.getElementById('time').innerHTML = ""+deltaTime;
    if (maxTime < deltaTime) {
        maxTime = deltaTime;
        updateMax();
    }
}
