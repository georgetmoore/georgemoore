function populate() {
	if(quiz.isEnded()) {
		showScores();
	}
	else {
		//show question
		var element = document.getElementById("question");
		element.innerHTML = quiz.getQuestionIndex().text;
		
		// show choices
		var choices = quiz.getQuestionIndex().choices;
		for(var i = 0; i< choices.length; i++) {
			var element = document.getElementById("choice" + i);
			element.innerHTML = choices[i];
			guess("btn" + i, choices[i]);
		}
		
		showProgress();
	}
}

function guess(id, guess) {
	var button = document.getElementById(id);
	button.onclick = function() {
		quiz.guess(guess);
		populate();
	};
}

function showProgress() {
	var currentQuestionNumber = quiz.questionIndex + 1;
	var element = document.getElementById("progress");
	element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

function showScores() {
		var gameOverHtml = "<h1>Results</h1>";
		gameOverHtml += "<h2 id='score'> You got " + quiz.score + " questions correct!</h2>";
		var element = document.getElementById("quiz");
		element.innerHTML = gameOverHtml;
}

function shuffleArray(questions) {
    for (var i = questions.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = questions[i];
        questions[i] = questions[j];
        questions[j] = temp;
    }
    return questions;
}

var questions =  [
	new Question("What is my name?", ["George", "Jordan", "Josh", "Potato"], "George"),
	new Question("What is my favourite colour?", ["Green", "Red", "Pink", "Blue"], "Green"),
	new Question("Favourite TV show?", ["The Flash", "Grimm", "OUAT", "Shadowhunters"], "The Flash"),
	new Question("Favourite Movie?", ["Frozen", "BTTF", "Star Wars", "Enchanted"], "Frozen")
 ];
 
questions = shuffleArray(questions);

var quiz = new Quiz(questions);

populate();