
var LoadingState = new KiwiLoadingScreen('LoadingState', 'PlayState', {width: frameWidth, height: frameHeight}, 'assets/img/loading/');

/**
* This preload method is responsible for preloading all your in game assets.
* @method preload
* @private
*/
LoadingState.preload = function () {
    
    //Make sure to call the super at the top.
    //Otherwise the loading graphics will load last, and that defies the whole point in loading them. 
    KiwiLoadingScreen.prototype.preload.call(this);

    this.addSpriteSheet('chopper', 'assets/img/choppa.png', 150, 117);
    this.addSpriteSheet('tank', 'assets/img/german-tank.png', 150, 117);
    this.addSpriteSheet('explosion', 'assets/img/explosion.png', 129, 133);
    this.addSpriteSheet('soldier', 'assets/img/character.png', 150, 117);
    this.addSpriteSheet('pipe', 'assets/img/pipe.png', 100, 100);
    // this.addSpriteSheet('background', 'assets/img/background.png', 768, 896);

    this.addImage('background', 'assets/img/jungle.png');
    // this.addImage('pipe', 'assets/img/pipe.png');
    // this.addSpriteSheet('restart', 'assets/img/restart.png', 214, 75);
    // this.addSpriteSheet('share', 'assets/img/share.png', 214, 75);

  //Environment Assets
	this.addImage('ground', 'assets/img/ground.png');
	this.addImage('grass', 'assets/img/ground-tiles/grass.png');
	this.addImage('dirt', 'assets/img/ground-tiles/dirt.png');
	this.addImage('bg1', 'assets/img/bg-layers/1.png');
	this.addImage('bg2', 'assets/img/bg-layers/2.png');
	this.addImage('bg3', 'assets/img/bg-layers/3.png');
	this.addImage('bg4', 'assets/img/bg-layers/4.png');
	this.addImage('bg5', 'assets/img/bg-layers/5.png');
	this.addImage('bg6', 'assets/img/bg-layers/6.png');
	this.addImage('bg7', 'assets/img/bg-layers/7.png');
};