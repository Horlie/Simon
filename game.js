const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let is_mobile = false;
let old_timestamp = null;
const colorsAudio = {};
colorsAudio.red = new Audio("sounds/red.mp3");
colorsAudio.red.volume = 0.6;
colorsAudio.blue = new Audio("sounds/blue.mp3");
colorsAudio.blue.volume = 0.6;
colorsAudio.green = new Audio("sounds/green.mp3");
colorsAudio.green.volume = 0.6;
colorsAudio.yellow = new Audio("sounds/yellow.mp3");
colorsAudio.yellow.volume = 0.6;
const wrong = new Audio("sounds/wrong.mp3");

function nextSequence() {
    const randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor)
        .fadeOut(100)
        .fadeIn(100)
        .fadeIn(100);
    playSound(randomChosenColor);
    level++;
    $("#level-title").text("Level " + level);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (currentLevel == gamePattern.length - 1) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
            userClickedPattern = [];
        }
    } else {
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        if (is_mobile === true) {
            $("#level-title").text("Game Over, Press A Button to Restart");
            $("#score")
                .css("display", "block")
                .html("Your score is: " + (level <= 0 ? 0 : level - 1));
        } else {
            $("#level-title").text("Game Over, Press Any Key to Restart");
            $("#score")
                .css("display", "block")
                .html("Your score is: " + (level <= 0 ? 0 : level - 1));
        }
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

function playSound(name) {
    colorsAudio[name].play();
}

$(".btn").click(function (event) {
    if (old_timestamp == null || old_timestamp + 200 < event.timeStamp) {
        const userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
        old_timestamp = event.timeStamp;
    }
});

$(document).ready(() => {
    if ($("#game-starter").css("display") != "none") {
        is_mobile = true;
    }

    if (is_mobile === true) {
        $("#level-title").text("Press A Button to Start");
        $("#game-starter").click(() => {
            $("#score").css("display", "none");
            if (level === 0) {
                nextSequence();
            }
            $("#game-starter")
                .addClass("btn-pressed")
                .css("box-shadow", "0 5px #222222");
            setTimeout(() => {
                $("#game-starter")
                    .removeClass("btn-pressed")
                    .css("box-shadow", "0 7px black");
            }, 100);
        });
    } else {
        $(document).keypress(() => {
            $("#score").css("display", "none");
            if (level === 0) {
                nextSequence();
            }
        });
    }
});
