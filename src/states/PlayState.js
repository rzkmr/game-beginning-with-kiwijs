window.frameWidth = 750;
window.frameHeight = 600;

var PlayState = new Kiwi.State('PlayState');


PlayState.create = function () {
  this.game.stage.color = '000';

  this.ground = new Platform(this, 0, 505); 
  //The starting coordinates of the chopper
  this.startX = (this.game.stage.width / 2) - 46
  this.startY = (this.game.stage.height / 2) - 64;

  this.explodeGroup = new Kiwi.Group(this);
  this.enemyGroup = new Kiwi.Group(this);

  this.pipeDistance = 400;
  this.pipeGap = 260;

  //Background image
  // this.bg = new Kiwi.GameObjects.Sprite(this, this.textures.background, 0, 0);

  //Parallax Environment Groups
  this.grassGroup = new Kiwi.Group(this);
  this.bg1 = new Kiwi.Group(this);
  this.bg2 = new Kiwi.Group(this);
  this.bg3 = new Kiwi.Group(this);
  this.bg4 = new Kiwi.Group(this);
  this.bg5 = new Kiwi.Group(this);
  this.bg6 = new Kiwi.Group(this);
  this.bg7 = new Kiwi.Group(this);

  //chopper
  this.chopper = new Kiwi.GameObjects.Sprite(this, this.textures.chopper, this.startX, this.startY);
  this.choppaAnimation = this.chopper.animation.add('moving', [1, 2, 3, 4, 5, 6], 0.05, true, true);
  // this.men = new Kiwi.GameObjects.Sprite(this, this.textures.man, 100, 100);


  //Timers for enemy spawns
  this.timer = this.game.time.clock.createTimer('spawnTroop', 3, -1, true);
  this.timerEvent = this.timer.createTimerEvent(Kiwi.Time.TimerEvent.TIMER_COUNT, this.spawnSoldier, this);

  // this.tankTimer = this.game.time.clock.createTimer('tankTimer', 8, -1, true);
  // this.tankTimer.createTimerEvent(Kiwi.Time.TimerEvent.TIMER_COUNT, this.spawnTank, this);


  //Creating parallax bacground assets  
  for(var i = 0; i < 20; i++){//grass
    this.grassGroup.addChild(new Kiwi.GameObjects.Sprite(this, this.textures['grass'], i * 48, 504, true));
    this.grassGroup.addChild(new Kiwi.GameObjects.Sprite(this, this.textures['dirt'], i * 48, 552, true));

  }
  for(var i = 0; i < 4; i++){
    this.bg7.addChild(new Kiwi.GameObjects.Sprite(this, this.textures['bg7'], i*434, 0, true));//bg7
  }    
  for(var i = 0; i < 5; i++){
    this.bg6.addChild(new Kiwi.GameObjects.Sprite(this, this.textures['bg6'], i*346, 185, true));//bg6
  }    
  for(var i = 0; i < 10; i++){
    this.bg5.addChild(new Kiwi.GameObjects.Sprite(this, this.textures['bg5'], i*96, 253, true));//bg5
    this.bg4.addChild(new Kiwi.GameObjects.Sprite(this, this.textures['bg4'], i*96, 279, true));//bg4
  }    
  for(var i = 0; i < 3; i++){
    this.bg3.addChild(new Kiwi.GameObjects.Sprite(this, this.textures['bg3'], i*460, 305, true));//bg3
    this.bg2.addChild(new Kiwi.GameObjects.Sprite(this, this.textures['bg2'], i*460, 335, true));//bg2
    this.bg1.addChild(new Kiwi.GameObjects.Sprite(this, this.textures['bg1'], i*460, 381, true));//bg1
  } 

  //input
  this.left = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.A);
  this.right = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.D);
  this.up = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.W);
  this.down = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.S);



  //Background
  this.addChild(this.ground);
  this.addChild(this.bg7);
  this.addChild(this.bg6);
  this.addChild(this.bg5);
  this.addChild(this.bg4);
  this.addChild(this.bg3);
  this.addChild(this.bg2);
  this.addChild(this.bg1);
  // this.addChild(this.bg);

  //Foreground
  this.addChild(this.grassGroup);

  this.addChild(this.explodeGroup);
  this.addChild(this.enemyGroup);

  this.addChild(this.chopper);
}

PlayState.update = function () {
  Kiwi.State.prototype.update.call(this);

  this.updateParallax();
  this.checkEnemies();

  if (Kiwi.DEVICE.touch == false) {
      var x = 0;
      var y = 0;
      var update = false;

      if (this.left.isDown) {
          x -= 3;
          update = true;
          this.chopper.rotation = -(Math.PI / 12);
      }
      if (this.right.isDown) {
          x += 3;
          this.chopper.rotation = Math.PI / 12;
          update = true;
      }
      if (this.down.isDown) {
          y += 3;
          update = true;
          this.choppaAnimation.speed = 0.15;
      } else if (this.up.isDown) {
          y -= 3;
          this.choppaAnimation.speed = 0.05;
          update = true;
      }

      if (!update) {
          this.choppaAnimation.speed = 0.1;
          this.chopper.rotation = 0;
      }

      if (this.chopper.transform.y < 0) {
        this.chopper.transform.y = 0;
        //this.explodeGroup.addChild(new Explosion(this, this.chopper.transform.x, this.chopper.transform.y));
      }
      if (this.chopper.transform.x < 0) this.chopper.transform.x = 0;
      if (this.chopper.transform.y > frameHeight - 200) this.chopper.transform.y = frameHeight-200;
      if (this.chopper.transform.x > frameWidth -110) this.chopper.transform.x = frameWidth-110;

      this.chopper.x += x;
      this.chopper.y += y;
  }


}

PlayState.updateParallax = function(){
  //Ground
  for(var i =0; i < this.grassGroup.members.length;i++){
    this.grassGroup.members[i].transform.x -= 1;    
    if(this.grassGroup.members[i].transform.worldX <= -48){
      this.grassGroup.members[i].transform.x = 48*19;
    }
  }
  //bg1
  for(var i =0; i < this.bg1.members.length;i++){
    this.bg1.members[i].transform.x -= 1;   
    if(this.bg1.members[i].transform.worldX <= -460){
      this.bg1.members[i].transform.x = 460* (this.bg1.members.length - 1) ;
    }
  }
  //bg2
  for(var i =0; i < this.bg2.members.length;i++){
    this.bg2.members[i].transform.x -= 0.5;   
    if(this.bg2.members[i].transform.worldX <= -460){
      this.bg2.members[i].transform.x = 460*(this.bg2.members.length - 1);
    }
  }
  //bg3
  for(var i =0; i < this.bg3.members.length;i++){
    this.bg3.members[i].transform.x -= 0.3;   
    if(this.bg3.members[i].transform.worldX <= -460){
      this.bg3.members[i].transform.x = 460*(this.bg3.members.length - 1);
    }
  }
  //bg4
  for(var i =0; i < this.bg4.members.length;i++){
    this.bg4.members[i].transform.x -= 0.2;
    if(this.bg4.members[i].transform.worldX <= -96){
      this.bg4.members[i].transform.x = 96*(this.bg4.members.length - 1);
    }
  }
  //bg5
  for(var i =0; i < this.bg4.members.length;i++){
    this.bg5.members[i].transform.x -= 0.1;   
    if(this.bg5.members[i].transform.worldX <= -96){
      this.bg5.members[i].transform.x = 96*(this.bg5.members.length - 1);
    }
  }
  
  //bg7
  for(var i =0; i < this.bg7.members.length;i++){
    this.bg7.members[i].transform.x -= .25;   
    if(this.bg7.members[i].transform.worldX <= -434){
      this.bg7.members[i].transform.x = 434*(this.bg7.members.length - 1);
    }
  }

}

PlayState.checkEnemies = function(){
  // var bombs = this.bombGroup.members;
  var enemies = this.enemyGroup.members;

  for (var j = 0; j < enemies.length; j++){ //collides with enemy
    if(enemies[j].x < -200){
      enemies[j].destroy();
      break;
    }
  }
  // for (var i = 0; i < bombs.length; i ++){
  //   if(bombs[i].physics.overlaps(this.ground, true)){//collides with ground
  //     this.explodeGroup.addChild(new Explosion(this, bombs[i].x - 30, bombs[i].y-55));
  //     bombs[i].destroy();
  //     break;
  //   } 
  //   for (var j = 0; j < enemies.length; j++){ //collides with enemy
  //     if(bombs[i].physics.overlaps(enemies[j])){
  //       enemies[j].health --;
  //       this.explodeGroup.addChild(new Explosion(this, bombs[i].x -30, bombs[i].y));
  //       bombs[i].destroy();
  //       break;
  //     }
  //     if(enemies[j].x < -200){
  //       enemies[j].destroy();
  //       break;
  //     }

  //   }

  // }

}

PlayState.spawnSoldier = function(){
  var s = new EnemySoldier(this, this.game.stage.width + 50, 388);
  this.enemyGroup.addChild(s);

}

PlayState.spawnTank = function(){
  var t = new EnemyTank(this, this.game.stage.width + 50, 388);
  this.enemyGroup.addChild(t);
}


var Platform = function (state, x, y){
  Kiwi.GameObjects.Sprite.call(this, state, state.textures['ground'], x, y, true);
  this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));
  this.physics.immovable = true;

  Platform.prototype.update = function(){
    Kiwi.GameObjects.Sprite.prototype.update.call(this);
    this.physics.update();
  }

}
Kiwi.extend(Platform,Kiwi.GameObjects.Sprite);

var EnemySoldier = function (state, x, y){
  Kiwi.GameObjects.Sprite.call(this, state, state.textures['soldier'], x, y);

  this.animation.add('walk', [1, 2, 3, 4, 5, 6], 0.1, true);    
  this.animation.play('walk');

  this.box.hitbox = new Kiwi.Geom.Rectangle(50, 34, 50, 84);  
  this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));
  this.health = 1;
  this.scaleX = -1;

  EnemySoldier.prototype.update = function(){
    Kiwi.GameObjects.Sprite.prototype.update.call(this);
    this.physics.update();

    this.x -= 3;

    if(this.health <= 0){
      this.destroy();
    }
  }
}
Kiwi.extend(EnemySoldier,Kiwi.GameObjects.Sprite);

var EnemyTank = function (state, x, y){
  Kiwi.GameObjects.Sprite.call(this, state, state.textures['tank'], x, y);

  this.box.hitbox = new Kiwi.Geom.Rectangle(20, 20, 110, 100);
  this.physics = this.components.add(new Kiwi.Components.ArcadePhysics(this, this.box));

  this.health = 2;
  this.scaleX = -1;
  this.animation.add('walk', [1, 2, 3, 4, 5, 6], 0.1, true);    
    this.animation.play('walk');

    EnemyTank.prototype.update = function(){
      Kiwi.GameObjects.Sprite.prototype.update.call(this);
      this.physics.update();
      this.x -= 2;
      if(this.health <= 0){
        this.destroy();
      }

    }
}
Kiwi.extend(EnemyTank,Kiwi.GameObjects.Sprite);

var Explosion = function (state, x, y){
  Kiwi.GameObjects.Sprite.call(this, state, state.textures['explosion'], x, y);
  this.animation.add('explode', [0, 1, 2, 3, 4], 0.1, false);    
  this.animation.play('explode');

  Explosion.prototype.update = function(){
    Kiwi.GameObjects.Sprite.prototype.update.call(this);
    this.x -= 2;
    if(this.animation.currentCell == 4){
      this.destroy();
    }
  }
}
Kiwi.extend(Explosion,Kiwi.GameObjects.Sprite);

