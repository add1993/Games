var c={};

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

		var tile = new c.Tile(99);
		this.stage.addChild(tile);

		tile.x = Math.random()*(this.canvas.width-tile.width);
		tile.y = Math.random()*(this.canvas.height-tile.height);

 		this.stage.update();
	}
	return countgame;
})();

window.onload = function() {
	var game = new c.Game();
}