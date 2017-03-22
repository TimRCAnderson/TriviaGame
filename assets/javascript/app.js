$(document).ready(function() {
	var $time = $("#timeDiv");
	var $question = $("#qDiv");
	var $answers = $("#aDiv");
	var $buttons = $("button");
	var $score = $("#final");
	var $inter = $("#interval");
	var gameTimer;

	function findInArray(arr, data, property)
	{
		for(var i = 0; i < arr.length; i++)
		{
			return arr[i][property] === data;
		}
	}

	var game = {
		timer: {
			time: 1500,
			timeDisp: "15:00",
			timeConvert: function(t)
			{
				if(t < 1000 && t > 10)
				{
					if(t % 100 >= 10)
					{
						return ("0" + Math.floor(t / 100) + ":" + (t % 100));
					}
					else
					{
						return ("0" + Math.floor(t / 100) + ":0" + (t % 100));
					}
				}
				else if(t < 10)
				{
					return ("00:0" + t);
				}
				else
				{
					if(t % 100 >= 10)
					{
						return (Math.floor(t / 100) + ":" + (t % 100));
					}
					else
					{
						return (Math.floor(t / 100) + ":0" + (t % 100));
					}
				}
			},
			timeDisplay: function()
			{
				game.timer.time--;
				$time.text(game.timer.timeConvert(game.timer.time));
				if(game.timer.isTimeUp())
				{
					game.tracking.answered++;
					game.tracking.wrong++;
					if(game.tracking.answered <= 5)
					{
						game.actions.interQuestion("Time Up!");
						console.log("timeUp");
					}
					else
					{
						clearInterval(gameTimer);
						game.actions.finalScore();

					}
				}
			},
			isTimeUp: function ()
			{
				if(game.timer.time > 0)
				{
					return false;
				}
				else
				{
					return true;
				}
			},
			stop: function()
			{
				clearInterval(gameTimer);
			},
			reset: function()
			{
				clearInterval(gameTimer);
				game.timer.time = 1500;
				gameTimer = setInterval(game.timer.timeDisplay, 10);
			}
		},
		quizStuff:
		[{
			person: "Winston Churchill",
			quotations: ["Success consists of going from failure to failure without loss of enthusiasm.", "If you're going through hell, keep going."]
		},
		{
			person: "Oscar Wilde",
			quotations: ["I can resist everything except temptation.", "Always forgive your enemies - nothing annoys them so much."]
		},
		{
			person: "Mark Twain",
			quotations: ["Whenever you find yourself on the side of the majority, it is time to pause and reflect.", "Don't go around saying the world owes you a living. The world owes you nothing. It was here first."]
		},
		{
			person: "Ernest Hemingway",
			quotations: ["Happiness in intelligent people is the rarest thing I know.", "Always do sober what you said you'd do drunk."]
		},
		{
			person: "Voltaire",
			quotations: ["Common sense is not so common.", "I disapprove of what you say, but will defend to the death your right to say it."]
		}],
		tracking: 
		{
			answered: 0,
			correct: 0,
			wrong: 0,
			currentQuote: "Common sense is not so common."
		},
		actions: 
		{
			nextQuestion: function()
			{
				var uniqueAnswers = [];
				for(var i = 0; i < 4; i++)
				{
					var currentRandom = 0;
					do {
						currentRandom = Math.floor(Math.random() * game.quizStuff.length);
						if(uniqueAnswers.indexOf(currentRandom)=== -1)
						{
							uniqueAnswers.push(currentRandom)
						}
					}
					while(uniqueAnswers.length < (i + 1));
				}
				for(var j = 0; j < uniqueAnswers.length; j++)
				{
					$buttons.eq(j).data(game.quizStuff[uniqueAnswers[j]]);
					$buttons.eq(j).text(game.quizStuff[uniqueAnswers[j]].person);
				}
				game.tracking.currentQuote = $buttons.eq(Math.floor(Math.random() * 4)).data().quotations[Math.round(Math.random())];
				$question.text('"' + game.tracking.currentQuote + '"');
			},
			checkAnswer: function()
			{
				$this = $(this);
				game.tracking.answered++;
				if($this.data("quotations").indexOf(game.tracking.currentQuote) != -1)
				{
					game.tracking.correct++;
					if(game.tracking.answered <= 5)
					{
						game.actions.interQuestion("Correct!");
					}
					else
					{
						game.actions.finalScore();
					}
				}
				else
				{
					game.tracking.wrong++;
					if(game.tracking.answered <= 5)
					{
						game.actions.interQuestion("Incorrect!")
					}
					else
					{
						game.actions.finalScore();
					}
				}
			},
			finalScore: function()
			{
				clearInterval(gameTimer);
				$score.removeClass("hidden");
				$score.html("<div>Score</div><div>Answered Correctly: " + game.tracking.correct + "</div><div> Answered Incorrectly: " + game.tracking.wrong + "<div>");
				$buttons.off("click");
				$score.append($("<div>").append($("<button>").text("Restart").addClass("btn").click(game.actions.restart)));
			},
			restart: function()
			{
				game.tracking.answered = 0;
				game.tracking.correct = 0;
				game.tracking.wrong = 0;
				game.timer.reset();
				game.actions.nextQuestion();
				$buttons.click(game.actions.checkAnswer);
				$score.addClass("hidden");
			},
			interQuestion: function(text)
			{
				game.timer.stop();
				$inter.empty();
				$inter.text(text);
				$inter.removeClass("hidden");
				setTimeout(function() {
					$inter.addClass("hidden");
					game.actions.nextQuestion();
					game.timer.reset();
				}, 3000);
			}
		}
	}

	game.actions.restart();
});