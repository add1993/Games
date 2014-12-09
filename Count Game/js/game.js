var c={};

c.Game = (function() {
	function countgame() {
		console.log("Count99 game starts.");
		this.canvas = document.getElementById('game-canvas');
		this.stage = new createjs.Stage(this.canvas);

	}
	return countgame;
})();