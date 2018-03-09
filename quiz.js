var questions;

var questionIndex = 0;
var overWhichOption;
var press;
var correctAnswerIndex = 0;

var score = 0;
var timeLeft = 30;

var state = 0;

var timer = 3;

var EnterPressed = false;

var questionIndicies = [];

function setup() {
    questions = [];
    parse();
    createCanvas(windowWidth, windowHeight);
    frameRate(20);
}

function draw() {

    timeLeft -= 1 / 20;

    switch (state) {
        case 0:

            fill(255);
            background(51);
            textSize(45);
            textAlign(CENTER);
            text("Causes of the Spanish American War Quiz!", width / 2, 0.9 * height / 3);
            textSize(25);
            text("30 seconds, question right +3 seconds", width / 2, 1.2 * height / 3);
            text("question wrong -5 seconds.", width / 2, 1.4 * height / 3);
            text("Question right +1 score", width / 2, 1.6 * height / 3);
            text("The higher the score the better", width / 2, 1.8 * height / 3);
            text("Hurry before the U.S.S. Maine blows up", width / 2, 2 * height / 3);
            fill(255);
            text("Press ENTER to start", width / 2, 2.2 * height / 3);
            if (EnterPressed) {
                timeLeft = 30;
                score = 0;
                state = 1;
                genNextQuestion()
            }
            break;
        case 1:
            timeLeft -= 1 / 20;

            background(51);
            checkMouseOver();
            checkAnswer();

            drawQuestion(questionIndex);
            drawAnswers(questionIndex);

            fill(255);
            textSize(25);

            if (timeLeft <= 0) {
                timeLeft = 0;
                state = 4;
            }
            text("Score: " + score, width - 100, 35);
            text("Time: " + timeLeft.toFixed(2), width - 100, 85);


            break;
        case 2:
            timeLeft -= 1 / 20;

            fill(0);
            background(175,0,0)
            timer--;
            text("INCORRECT", width /2,height /2);
            if (timer <= 0) {
                state = 1;
                genNextQuestion();
            }
            fill(255);
            textSize(25);
            text("Score: " + score, width - 100, 35);
            text("Time: " + timeLeft.toFixed(2), width - 100, 85);
            break;
        case 3:
            timeLeft -= 1 / 20;

            fill(0);
            background(0, 175, 0)
            timer--;
            text("CORRECT", width / 2, height / 2);
            if (timer <= 0) {
                state = 1;
                genNextQuestion();
            }
            fill(255);
            textSize(25);
            text("Score: " + score, width - 100, 35);
            text("Time: " + timeLeft.toFixed(2), width - 100, 85);
            break;
        case 4:
            //Stats
            background(0, 175, 0);
            textSize(42);
            fill(255);

            text("Score: " + score, width / 2, height / 3);
            textSize(30);
            text("To restart press ENTER", width / 2, 1.5 * height / 3);

            if (EnterPressed) {
                timeLeft = 30;
                score = 0;
                state = 1;
                genNextQuestion()
            }

            break;
    }
}

function checkAnswer() {
    if (press && overWhichOption != -1) {
        if (correctAnswerIndex == overWhichOption) {
            state = 3;
            timer = 3;
            score++;
            timeLeft +=3;
        }
        else {
            state = 2;
            timer = 3;
            timeLeft -= 5;
        }
    }
}

function genNextQuestion() {
    //Wroking here try ito randomy generate answers
    questionIndex = getRandomInt(questions.length);

    questionIndicies = [0, 1, 2, 3];
    questionIndicies = shuff(questionIndicies);
    correctAnswerIndex = questionIndicies.indexOf(0);
}

function drawQuestion(index) {
    textSize(35);
    fill(220);
    textAlign(CENTER);
    console.log(index);
    console.log(questions);
    text(questions[index].question, width / 2, height / 6);
}

function drawAnswers(index) {

    fill(220, 220, 220, 100);

    if (overWhichOption != 0) {
        fill(220, 220, 220, 100);
    } else {
        fill(150, 150, 150, 150);
    }
    rect(0, height / 3, width / 2, height / 3);

    if (overWhichOption != 1) {
        fill(220, 220, 220, 100);
    } else {
        fill(150, 150, 150, 150);
    }
    rect(width / 2, height / 3, width / 2, height / 3);

    if (overWhichOption != 2) {
        fill(220, 220, 220, 100);
    } else {
        fill(150, 150, 150, 150);
    }
    rect(0, (2 * height) / 3, width / 2, height / 3);

    if (overWhichOption != 3) {
        fill(220, 220, 220, 100);
    } else {
        fill(150, 150, 150, 150);
    }
    rect(width / 2, (2 * height) / 3, width / 2, height / 3);

    textSize(25);
    fill(10, 10, 10);
    textAlign(CENTER);

    text(questions[index].ques[questionIndicies[0]], width / 4, height / 2);
    text(questions[index].ques[questionIndicies[1]], 3 * width / 4, height / 2);
    text(questions[index].ques[questionIndicies[2]], width / 4, 5 * height / 6);
    text(questions[index].ques[questionIndicies[3]], 3 * width / 4, 5 * height / 6);
}

function checkMouseOver() {
    overWhichOption = -1;
    if (mouseY > height / 3 && mouseY < 2 * height / 3 && mouseX < width / 2)
        overWhichOption = 0;
    if (mouseY > height / 3 && mouseY < 2 * height / 3 && mouseX > width / 2)
        overWhichOption = 1;
    if (mouseY > 2 * height / 3 && mouseX < width / 2)
        overWhichOption = 2;
    if (mouseY > 2 * height / 3 && mouseX > width / 2)
        overWhichOption = 3;

    if (mouseIsPressed && mouseButton === LEFT)
        press = true;
    else
        press = false;
}

function parse() {
    var questionTexts = questionsTextToParse.split("#");
    for (var i = 0; i < questionTexts.length; i++) {
        var questionAndAnswer = questionTexts[i].split(";");
        if (questionAndAnswer.length != 5)
            console.log("Could not load question");

        var question = questionAndAnswer[0].substring(1, questionAndAnswer[0].length);
        var answers = [];

        for (var j = 1; j < 5; j++){
            if (j != 4)
                answers[j] = questionAndAnswer[j];
            else
                answers[j] = questionAndAnswer[j].substring(0, questionAndAnswer[j].length-1);
        }

        var q = new quizQuestion(question, answers[1], answers[2], answers[3], answers[4]);
        questions.push(q);
    }
}

function quizQuestion(question, correctAnswer, i1, i2, i3) {
    this.question = question;
    this.correct = correctAnswer;
    this.incorrect1 = i1;
    this.incorrect2 = i2;
    this.incorrect3 = i3;
    this.ques = [];
    this.ques[0] = this.correct;
    this.ques[1] = this.incorrect1;
    this.ques[2] = this.incorrect2;
    this.ques[3] = this.incorrect3;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function keyPressed() {
    if (keyCode  === 13) {
        EnterPressed = true;
    } 
}

function keyReleased() {
    if (keyCode  === 13) {
        EnterPressed = false;
    } 
}

function shuff(o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}