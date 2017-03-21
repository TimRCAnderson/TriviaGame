var $time = $("#timeDiv");
var $question = $("#qDiv");
var $answers = $("#aDiv");

var game = {
	timer: {
		time: 1500,
		timeDisp: "15:00",
		timeConvert: function(t)
		{
			if(t < 1000 && t > 10)
			{
				return ("0" + Math.floor(t / 100) + ":" + (t % 100));
			}
			else if(t > 10)
			{
				return (Math.floor(t / 100) + ":" + (t % 100));
			}
			else
			{
				return ("00:0" + t);
			}
		},
		timeDisplay: function()
		{
			game.timer.time --;
			$time.text(game.timer.timeConvert(game.timer.time));
			console.log(game.timer.time);
			console.log(game.timer.isTimeUp());
			if(game.timer.isTimeUp())
			{
				clearInterval(gameTimer);
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
		reset: function()
		{
			game.timer.time = 1500;
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
		person: "",
		quotations: ["", ""]
	},
	{
		person: "",
		quotations: ["", ""]
	}]
}

$time.text(game.timer.timeDisp);
var gameTimer = setInterval(game.timer.timeDisplay, 10);