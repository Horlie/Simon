let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
function nextSequence(){
    let randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("#level-title").text("Level " + level);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    window.setTimeout(function() {$("#" + currentColor).removeClass("pressed") }, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if(currentLevel == gamePattern.length - 1){
            window.setTimeout(function() {nextSequence()}, 1000);
            userClickedPattern = [];
        }
    }
    else{
        let wrong = new Audio("sounds/wrong.mp3")
        wrong.play();
        $("body").addClass("game-over");
        window.setTimeout(function() {$("body").removeClass("game-over") }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

$(document).keypress(function(){
    if(level === 0)
    {
        nextSequence();
    }
});


function playSound(name){
    switch (name) {
        case "red":
            let red = new Audio("sounds/red.mp3")
            red.play();
        break;
        case "blue":
            let blue = new Audio("sounds/blue.mp3")
            blue.play();
        break;
        case "green":
            let green = new Audio("sounds/green.mp3")
            green.play();
        break;
        case "yellow":
            let yellow = new Audio("sounds/yellow.mp3")
            yellow.play();
        break;
        default:
            let audio = new Audio("sounds/wrong.mp3")
            audio.play();
        break;
    }
}

$(".btn").click(function (event){
    let userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});