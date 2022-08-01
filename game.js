let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let is_mobile = false;
let old_timestamp = null;
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
        if(is_mobile = true){
        $("#level-title").text("Game Over, Press A Button to Restart");
        $("#score").css("display", "block").html("Your score is: "+level-1);
        }
        else {
            $("#level-title").text("Game Over, Press Any Key to Restart");
            $("#score").css("display", "block").html("Your score is: "+level-1);
        }
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}




function playSound(name){
    switch (name) {
        case "red":
            let red = new Audio("sounds/red.mp3")
            red.volume = 0.6;
            red.play();
        break;
        case "blue":
            let blue = new Audio("sounds/blue.mp3")
            blue.volume = 0.6;
            blue.play();
        break;
        case "green":
            let green = new Audio("sounds/green.mp3")
            green.volume = 0.6;
            green.play();
        break;
        case "yellow":
            let yellow = new Audio("sounds/yellow.mp3")
            yellow.volume = 0.6;
            yellow.play();
        break;
        default:
            let audio = new Audio("sounds/wrong.mp3")
            audio.volume = 0.6;
            audio.play();
        break;
    }
}

$(".btn").click(function (event){
    if(old_timestamp == null || old_timestamp + 1000 < event.timeStamp)
    {
        let userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
        old_timestamp = event.timeStamp;
    }
});

$( document ).ready(function() {      

    if( $('#game-starter').css('display')!='none') {
        is_mobile = true;       
    }

    if (is_mobile == true) {
        $("#level-title").text("Press A Button to Start");
        $("#game-starter").click(function(){
            $("#score").css("display", "none");
            if(level === 0)
            {
                nextSequence();
            }
            $("#game-starter").addClass("btn-pressed").css("box-shadow", "0 5px #222222");
            window.setTimeout(function() {$("#game-starter").removeClass("btn-pressed").css("box-shadow", "0 7px black") }, 100);
        });
    }
    else {
        $(document).keypress(function(){
            $("#score").css("display", "none");
            if(level === 0)
            {
                nextSequence();
            }
        });
    }
 });