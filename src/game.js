//Initialise the Kiwi Game. 
var game = new Kiwi.Game('content', 'ChopperFly', null, { renderer: Kiwi.RENDERER_CANVAS });

//Add all the States we are going to use.
game.states.addState(LoadingState);
game.states.addState(PlayState);

game.states.switchState("LoadingState");