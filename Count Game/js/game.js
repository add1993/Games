var c={};
var tiles = 4;
var next = 1;
c.Tile = (function(){
	function Tile(number) {
		this.initialize();

		this.number = number;
		this.width = this.height = 80;
		var shape = new createjs.Shape();
		shape.graphics.setStrokeStyle(1);
		shape.graphics.beginStroke("#000");
		shape.graphics.beginFill("#efefef");

		shape.graphics.rect(0,0,this.width,this.height);

		this.addChild(shape);
		var numberText = new createjs.Text(number, "24px Helvetica", "#ac1000");
		numberText.x = this.width/2;
		numberText.y = this.height/2;

		numberText.textAlign = "center";
		numberText.textBaseline = "middle";

		this.addChild(numberText);

	}
	var p = Tile.prototype = new createjs.Container();
	return Tile;
})();

c.Game = (function() {
	function countgame() {
		console.log("Count99 game starts.");
		this.canvas = document.getElementById('game-canvas');
		this.stage = new createjs.Stage(this.canvas);
		this.initGame();

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
						next = 1;
						this.gameOver();
					}
					this.stage.update();
				}

			}).bind(this);
		}
 		this.stage.update();
	}

	countgame.prototype.gameOver = function() {
		next = 1;
		document.getElementById('next-count').innerHTML = next;

		var gameOverScene = document.getElementById('gameover');
		gameOverScene.classList.add('gameover-appear');

	};
	return countgame;
})();

window.onload = function() {
	var game = new c.Game();
}