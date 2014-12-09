var c={};

c.Game = (function() {
	function countgame() {
		console.log("Count99 game starts.");
		this.canvas = document.getElementById('game-canvas');
		this.stage = new createjs.Stage(this.canvas);

		var shape = new createjs.Shape();
		shape.graphics.setStrokeStyle(1);
		shape.graphics.beginStroke("#000");
		shape.graphics.beginFill("#efefef");

		shape.graphics.rect(0,0,80,80);

		this.stage.addChild(shape);

 		this.stage.update();
	}
	return countgame;
})();

window.onload = function() {
	var game = new c.Game();
}