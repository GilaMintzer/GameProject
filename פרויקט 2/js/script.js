let objects = [];
const colorsArr = ['pink', 'yellow', 'green', 'blue'];
const colorsTriangle = ['pinkT', 'yellowT', 'greenT', 'blueT'];
const shapesArr = ['circle', 'square', 'triangle'];
let placesArr = [];
let score = 0;
let pages = 6;
let currentPage = 0, failures = 0;
let chosenShape, theColor, theShape, number, timer, index, users, myLevel = 0, time, soundTime, active;
let circleAppear = document.getElementById("circleAppear");
let levelLost = document.getElementById("levelLost");
let levelPassed = document.getElementById("levelPassed");
let touchBlue = document.getElementById("touchBlue");
let touchRed = document.getElementById("touchRed");
let timeAlmostUp = document.getElementById("timeAlmostUp"); 
let header = document.getElementById("header");

let main = document.getElementById("main");

// start page
function startPage() {
    circleAppear.play();
    score = 0;
    failures = 0;
    currentPage = 0;
    pages = 5;
    main.innerHTML = "";
    let taptap = document.createElement('h1');
    main.appendChild(taptap);
    taptap.textContent = "TAP TAP TAP";
    taptap.classList.add('taptap');
    let tap = document.createElement('h3');
    main.appendChild(tap);
    tap.textContent = "EVERY TAP MATTERS";
    tap.classList.add('tap');
    let newGame = document.createElement('h1');
    main.appendChild(newGame);
    newGame.textContent = "♡ New game ♡";
    newGame.classList.add('newGame');
    let chncs = document.createElement('h1');
    main.appendChild(chncs);
    chncs.textContent = "⭐ ⭐ ⭐";
    chncs.classList.add('chances');
    newGame.addEventListener("click", start);
}

// show the shape to click on it
function start() {
    circleAppear.play();
    currentPage = 0;
    main.innerHTML = "";
    let click = document.createElement('h1');
    main.appendChild(click);
    click.textContent = "Tap the shape to start";
    click.classList.add('point');
    let pointer = document.createElement('h1');
    main.appendChild(pointer);
    pointer.textContent = "👆";
    pointer.classList.add('pointer');
    specialShape = currentShape();
    main.appendChild(specialShape);
    chosenShape.id = 'stam1';
    let chncs = document.createElement('h1');
    main.appendChild(chncs);
    if (failures == 0)
    {
        chncs.textContent = "⭐ ⭐ ⭐";
    }
    if (failures == 1)
    {
        chncs.textContent = "⭐ ⭐";
    }
    if (failures == 2)
    {
        chncs.textContent = "⭐";
    }
    chncs.classList.add('chances');
    specialShape.addEventListener("click", timer2);
}

// start timer when the level start
function timer2(){
    if (currentPage == 0)
    {
        header.innerHTML = "";
        header.classList.add("header");
        timer = document.createElement('div');
        header.appendChild(timer);
        timer.classList.add('timer');
        letsStart();
    }
}

// start level
function letsStart() {
    touchBlue.play();
    chosenShape.id = 'chosen';
    if (currentPage !== 0) {
        return;
    }
    if (time) {
        clearTimeout(time);
    }
    if (currentPage == 0)
    {
        time = setTimeout(timesUp, 17 * 1000);
    }
    createShapes();
}

startPage();

// random shape
function randomShape(shape) {
    shape.classList.add(shapesArr[Math.floor(Math.random() * 3)]);
}

// random color
function randomColor(shape) {
    if (shape.classList == 'triangle') {
        shape.classList.add(colorsTriangle[Math.floor(Math.random() * 4)]);
    }
    else {
        shape.classList.add(colorsArr[Math.floor(Math.random() * 4)]);
    }
}

// random place
function randomPlace(shape) {
    let place;
    place = {
        x: Math.floor(Math.random() * 40) + 25,
        y: Math.floor(Math.random() * 60) + 10
    }
    if (placesArr.indexOf(place) == -1) {
        placesArr.push(place);
    }
    else {
        randomPlace(shape);
    }
    shape.style.transform = `translate(${place.x}%,${place.y}%)`;
    shape.style.position = "absolute";
    shape.style.left = `${place.x}%`;
    shape.style.top = `${place.y}%`;
}

let chosenStyle;

// create the shape which the user has to click on it
function currentShape() {
    chosenShape = document.createElement('div');
    chosenStyle = {
        shape: randomShape(chosenShape),
        color: randomColor(chosenShape),
    }
    theColor = chosenShape.classList[1];
    theShape = chosenShape.classList[0];
    return chosenShape;
}

// create the shapes
function createShapes() {
    placesArr.splice(0, 30);
    randomPlace(specialShape);
    main.appendChild(specialShape);
    while (placesArr.length < 30) {
        let shape = document.createElement('div');
        let shapeStyle = {
            place: randomPlace(shape),
            shape: randomShape(shape),
            color: randomColor(shape)
        }
       
        while (shape.classList[0] === theShape && shape.classList[1] === theColor) {
            shape.classList.remove(shape.classList[0]);
            shape.classList.remove(shape.classList[0]);
            randomShape(shape);
            randomColor(shape);
        }
        main.appendChild(shape);
        shape.class ='shape';
    }
}

// time's up but the user can try again
function gameover() {
    levelLost.play();
    main.innerHTML = "";
    let over = document.createElement('h1');
    main.appendChild(over);
    over.textContent = "⌛ game over - time's up ⌛";
    over.classList.add('over');
    over.classList.add('boarderBottom')
    let scr3 = document.createElement('h1');
    main.appendChild(scr3);
    scr3.textContent = `score ${score}`;
    scr3.classList.add('scr2');
    let tryAgain = document.createElement('h2');
    main.appendChild(tryAgain);
    tryAgain.textContent = "try again?";
    tryAgain.classList.add('try');
    let chncs = document.createElement('h1');
    main.appendChild(chncs);
    if (failures == 1)
    {
        chncs.textContent = "⭐ ⭐";
    }
    if (failures == 2)
    {
        chncs.textContent = "⭐";
    }
    chncs.classList.add('chances');
    let exit = document.createElement('h4');
    main.appendChild(exit);
    exit.textContent = "exit";
    exit.classList.add('option');
    exit.addEventListener("click", finish);
    currentPage = 0;
    tryAgain.addEventListener("click", start);
}

// the user lost
function youlost() {
    timer.id = "stati";
    levelLost.play();
    main.innerHTML = "";
    let over = document.createElement('h1');
    main.appendChild(over);
    over.textContent = "💔 game over- you lost 💔";
    over.classList.add('over');
    over.classList.add('boarderBottom')
    let scr3 = document.createElement('h1');
    main.appendChild(scr3);
    scr3.textContent = `score ${score}`;
    scr3.classList.add('scr2');
    let tryAgain = document.createElement('h2');
    main.appendChild(tryAgain);
    tryAgain.textContent = "try again?";
    tryAgain.classList.add('try');
    let chncs = document.createElement('h1');
    main.appendChild(chncs);
    if (failures == 1)
    {
        chncs.textContent = "⭐ ⭐";
    }
    if (failures == 2)
    {
        chncs.textContent = "⭐";
    }
    chncs.classList.add('chances');
    let exit = document.createElement('h4');
    main.appendChild(exit);
    exit.textContent = "exit";
    exit.classList.add('option');
    exit.addEventListener("click", finish);
    currentPage = 0;
    tryAgain.addEventListener("click", start);
}

// the next level
function nextLevel() {
    levelPassed.play();
    main.innerHTML = "";
    let level = document.createElement('h1');
    main.appendChild(level);
    level.textContent = `🚩 level ${myLevel} passed 🚩`;
    level.classList.add('borderBottom');
    level.classList.add('passed');
    let scr = document.createElement('h3');
    main.appendChild(scr);
    scr.textContent = `score ${score}`;
    scr.classList.add('scr');
    let bonus = document.createElement('h1');
    main.appendChild(bonus);
    bonus.textContent = "bonus + 10";
    bonus.classList.add('scr2');
    currentPage = 0;
    pages++;
    score += 10;
    specialShape = currentShape();
    main.appendChild(specialShape);
    chosenShape.id = 'stam2';
    let div = document.createElement('div');
    let chncs = document.createElement('h1');
    div.appendChild(chncs);
    let exit = document.createElement('h4');
    div.appendChild(exit);
    div.classList.add('div');
    main.appendChild(div);
    if (failures == 0)
    {
        chncs.textContent = "⭐ ⭐ ⭐";
    }
    if (failures == 1)
    {
        chncs.textContent = "⭐ ⭐";
    }
    if (failures == 2)
    {
        chncs.textContent = "⭐";
    }
    chncs.classList.add('chances');
    exit.textContent = "exit";
    exit.classList.add('option');
    exit.addEventListener("click", finish);
    specialShape.addEventListener("click", timer2);
}

// the user failed totally
function oops(){
    timer.id = "stati";
    levelLost.play();
    users = JSON.parse(localStorage.getItem('users'));
    index = JSON.parse(localStorage.getItem('index'));
    users[index].scores += score;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('index', JSON.stringify(index));
    main.innerHTML = "";
    let oops = document.createElement('h1');
    main.appendChild(oops);
    oops.textContent = "😞";
    oops.classList.add('oops');
    let pity = document.createElement('h2');
    main.appendChild(pity);
    pity.textContent = "what a pity";
    pity.classList.add('pity');
    let finalScores = document.createElement('h1');
    main.appendChild(finalScores);
    finalScores.textContent = `score   ${score}`;
    finalScores.classList.add('finalScores');
    let div = document.createElement('div');
    let startAgain = document.createElement('h4');
    div.appendChild(startAgain);
    let exit = document.createElement('h4');
    div.appendChild(exit);
    div.classList.add('div');
    div.classList.add('div2');
    main.appendChild(div);
    startAgain.textContent = "start again";
    startAgain.classList.add('option');
    startAgain.addEventListener("click", startPage);
    exit.textContent = "exit";
    exit.classList.add('option');
    exit.addEventListener("click", finish);
}

// finish game
function finish()
{
    let time2 = setTimeout(games, 2*1000);
    main.innerHTML = "";
    let end = document.createElement('h1');
    main.appendChild(end);
    end.textContent = "🤝";
    end.classList.add('end');
    function games(){
        window.open("games.html", "games");
    }
}

// checking the clicking of the user
document.addEventListener("click", function () {
    if (event.target.id == 'chosen') {
        touchBlue.play();
        score += 5;
        currentPage++;
        if (currentPage == pages) {
            timer.id = "stati";
            clearTimeout(time);
            myLevel++;
            nextLevel();
        }
        else {
            main.innerHTML = "";
            createShapes();
        }
    }
    else {
        if (event.target.class == 'shape') {
            clearTimeout(time);
            failures++;
            if (failures == 3)
            {
                oops();
            }
            else{
                youlost();
            }
        }
    }
});


// time's up
function timesUp() {
    failures++;
    active = true;
    if (failures == 3)
    {
        oops();
    }
    else{
        gameover();
    }
}

