var questions = [
	{	"q": "Who was the shortest player ever to play in the NBA?",
		"a": "Tyrone Bogues",
	 	"possibles": ["Shaq", "Tyrone Bogues", "Kobe", "Tim Duncan"],
	 	"imgRef": "assets/images/1.gif"},

	{	"q": "What male tennis player has won the most Grand Slam titles?",
		"a": "Roger Federer",
	 	"possibles": ["Venus Williams", "John McEnroe", "Roger Federer", "Shaq"],
	 	"imgRef": "assets/images/2.gif"},

	{	"q": "How many holes are there in a full round of golf?",
		"a": "Eighteen",
		"possibles": ["Shaq", "Eighteen", "Nine", "One"],
		"imgRef": "assets/images/3.gif"},

	{	"q": "What is professional wrestler, John Cena's, catch phrase?",
		"a": "You can't see me!",
		"possibles": ["I am unseen!", "Please don't hit me Shaq!", "Don't taze me bro!", "You can't see me!"],
		"imgRef": "assets/images/4.gif"},

	{	"q": "What is the regulation height for a basketball hoop?",
		"a": "Ten feet",
		"possibles": ["Ten Shaquilles", "Nine feet", "Ten feet", "Eight feet"],
		"imgRef": "assets/images/5.gif"}


	

];

var questionIndex = 0;
var correctAnswer;
var answersWrong = 0; 
var answersCorrect = 0;
var answersTimedOut = 0;
var secondsRemaining = 30;
var counter;

function initGame() {
	$(".timer").hide();
	$(".question").hide();
	$(".answers").hide();
	$("#playAgainButton").hide();
	$(".possibleAnswers").html("");
}

function resetGame() {
	questionIndex = 0;
	answersCorrect = 0;
	answersWrong = 0;
	answersTimedOut = 0;
	secondsRemaining = 30;
	showQuestion();
}

function decrementTimer() {
	secondsRemaining--;
	$("#countdownNumber").html(secondsRemaining);
	if (secondsRemaining === 0) {
		questionTimeout();
	}
}

function userCorrect() {
	clearInterval(counter);
	$("#questionText").html("<h3>Correct!</h3>");
	$("#possibleAnswers").html("<img src="+questions[questionIndex].imgRef+">");
	questionIndex++;
	answersCorrect++;
	secondsRemaining = 30;
	setTimeout(showQuestion, 4000);
}
function userWrong() {
	clearInterval(counter);
	$("#questionText").html("<h3>Wrong! The correct answer was '" + correctAnswer + "'</h3>");
	$("#possibleAnswers").html("<img src="+questions[questionIndex].imgRef+">");
	questionIndex++;
	answersWrong++;
	secondsRemaining = 30;
	setTimeout(showQuestion, 4000);
}
//
function questionTimeout() {
	clearInterval(counter);
	$("#questionText").html("<h3>Time's up! The correct answer was '" + correctAnswer + "'</h3>");
	$("#possibleAnswers").html("<img src="+questions[questionIndex].imgRef+">");
	questionIndex++;
	answersTimedOut++;
	secondsRemaining = 30;
	setTimeout(showQuestion, 4000);
}

function endGame() {
	console.log("endGame was called");
	$(".timer").hide();
	$("#possibleAnswers").html("");
	$("#questionText").html("<h2>All done!</h2>");
	$("#possibleAnswers").append("<p>Correct Answers: " + answersCorrect + "</p>");
	$("#possibleAnswers").append("<p>Wrong Answers: " + answersWrong + "</p>");
	$("#possibleAnswers").append("<p>Questions Timed Out: " + answersTimedOut + "</p>");
	$("#playAgainButton").show();
}

function showQuestion() {
	if (questions[questionIndex] === undefined) {
		endGame();
	} else {
		$(".timer").show();
		$(".question").show();
		$(".answers").show();
		$("#countdownNumber").html(secondsRemaining);
		$("#possibleAnswers").html("");
		correctAnswer = questions[questionIndex].a;
		console.log("correct answer: " + correctAnswer);
		counter = setInterval(decrementTimer, 1000);
		$("#questionText").html(questions[questionIndex].q);
		for (var i = 0; i < questions[questionIndex].possibles.length; i++) {
			var newLi = document.createElement("li");
			$(newLi).attr("value", questions[questionIndex].possibles[i]);
			$(newLi).text(questions[questionIndex].possibles[i]);
			$("#possibleAnswers").append(newLi);
		}

		$("li").on("click", function() {
			var userChoice = this.getAttribute("value");
			console.log(userChoice);

			if (userChoice === correctAnswer) {
				userCorrect();
			} else {
				userWrong();
			}
		})
	}
}

$("document").ready(function () {
	initGame();
	$("#startButton").on("click", function () {
		$("#startButton").hide();
		showQuestion();
	});
	$("#playAgainButton").on("click", function() {
		resetGame();
	});

})