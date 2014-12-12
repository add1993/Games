var c={};
var tiles = 10;
var next = 1;
var score;
c.Tile = (function(){
	function Tile(number) {
		this.initialize();

		this.number = number;
		this.width = this.height = 60;
		var image = new createjs.Bitmap(c.graphics.tilep.path);
		this.addChild(image);
	
		var numberText = new createjs.Text(number, "34px alpha_echoregular, sans-serif", "#000f55");
		numberText.x = this.width/2-3;
		numberText.y = this.height/2+5;

		numberText.textAlign = "center";
		numberText.textBaseline = "middle";

		this.addChild(numberText);

	}
	var p = Tile.prototype = new createjs.Container();
	return Tile;
})();

c.Preloader = (function(){
	// constructor
	function Preloader(game) {
	this.game = game;
	};
	Preloader.prototype.loadGraphics = function(){
	var imagesList = [
	{name:"tilep", path:"images/tilep.png"},
	{name:"marks", path:"images/marks.png"},
	{name:"bg", path:"images/bg.jpg"},
	{name:"gameover", path:"images/gameover.png"},
	{name:"restartButton", path:"images/restart.png"},
	{name:"start", path:"images/start.png"},
	{name:"stb", path:"images/stb.png"},
	];
	c.graphics = {};
	var totalFiles = imagesList.length;
	var loadedFiles = 0;
	for (var i=0, len=totalFiles; i<len; i++) {
	imageToLoad = imagesList[i];
	var img = new Image();
	img.onload = (function(event) {
	loadedFiles++;
	console.log ('loaded', event, loadedFiles, '/', totalFiles)
	if (loadedFiles >= totalFiles) {
	this.game.initGame();
	}
	}).bind(this);
	console.log ("loading: ", imageToLoad.path);
	img.src = imageToLoad.path;
	c.graphics[imageToLoad.name] = imageToLoad;
	};
	}
	return Preloader;
})();


c.Game = (function() {
	function countgame() {
		console.log("Count99 game starts.");
		this.canvas = document.getElementById('game-canvas');
		this.stage = new createjs.Stage(this.canvas);

		var preloader = new c.Preloader(this);
		
		var startButton = document.getElementById('start-button');
		startButton.onclick = (function(event) {
			var gamestartScene = document.getElementById('start');
			gamestartScene.classList.add('start-disappear');
			preloader.loadGraphics();
		}).bind(this);

		var restartButton = document.getElementById('restart-button');
		restartButton.onclick = (function(event) {
			var gameoverScene = document.getElementById('gameover');
			gameoverScene.classList.remove('gameover-appear');
			this.initGame();
		}).bind(this);

	}
	countgame.prototype.initGame = function() {
		for (var i=tiles; i >=1; i--) {
			var tile = new c.Tile(i);
			this.stage.addChild(tile);

			tile.x = Math.random()*(this.canvas.width-tile.width);
			tile.y = Math.random()*(this.canvas.height-tile.height);
			
			tile.onPress = (function(event) {
				if (event.target.number===next) {
					this.stage.removeChild(event.target);
					next++;
					document.getElementById('next-count').innerHTML = next;
					if (next > tiles) {
						score = next;
						next = 1;
						this.gameOver();
					}
					this.stage.update();
				} else {
					score = next;
					next = 1;
					this.gameOver();
				}

			}).bind(this);
		}
 		this.stage.update();
	}

	countgame.prototype.gameStart = function() {
		var gameStartScene = document.getElementById('start');
		gameStartScene.classList.add('start-disappear');

	};

	countgame.prototype.gameOver = function() {
		document.getElementById('next-count').innerHTML = next;
		var gameOverScene = document.getElementById('gameover');
		gameOverScene.classList.add('gameover-appear');

		var scoreAppear = document.getElementById('marks');
		scoreAppear.classList.add('marks-appear');
		document.getElementById('score').innerHTML = score-1;
	};
	return countgame;
})();

window.onload = function() {
	var game = new c.Game();
}