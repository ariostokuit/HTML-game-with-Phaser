A_MGame.Game = function(game){
    this.totalBunnies;
    this.bunnyGroup;
    this.totalSpacerocks;
    this.spacerockgroup;
};

A_MGame.Game.prototype = {
    create:function(){
        this.totalBunnies = 20;
        this.totalSpacerocks = 13;
        this.buildWorld();

    },

    buildWorld:function(){
        this.add.image(0,0,'sky');
        this.add.image(0,800,'hill');
        this.buildBunnies();
        this.buildSpaceRocks();
    },

    buildBunnies:function(){
        this.bunnygroup = this.add.group();
        this.bunnygroup.enableBody = true;
        for(var i = 0; i < this.totalBunnies;i++){
            var b = this.bunnygroup.create(this.rnd.integerInRange(-10,this.buildWorld.width-50),
    this.rnd.integerInRange(this.buildWorld.height-180,this.world.height-60), 'bunny','Bunny0000');
            b.anchor.setTo(0.5,0.5);
            b.body.moves = false;
            b.animations.add('Rest', this.game.math.numberArray(1,58));
            b.animations.add('Walk',this.game.math.numberArray(68,107));
            b.animations.play('Rest',24,true);
            this.assignBunnyMovement(b);
        }
    },

    assignBunnyMovement: function(b){
        bposition = Math.floor(this.rnd.realInRange(50,this.world.width-50));
        bdelay = this.rnd.integerInRange(2000,6000);
        if(bposition < b.x){
            b.scale.x = 1;
        }
        else{
            b.scale.x = -1;
        }
        t = this.add.tween(b).to({x:bposition},3500,Phaser.Easing.Quadratic.InOut,true,bdelay);
        t.onStart.add(this.startBunny,this);
        t.onComplete.add(this.stopBunny,this);
    },

    startBunny:function(b){
        b.animations.stop('Rest');
        b.animations.play('Walk', 24, true);
    },

    stopBunny:function(b){
        b.animations.stop('Walk');
        b.animations.play('Rest',24,true);
        this.assignBunnyMovement(b);
    },

    buildSpaceRocks:function(){
        this.spacerockgroup = this.add.group();
        for(var i = 0; i <this.totalSpacerocks;i++){
            var r = this.spacerockgroup.create(this.rnd.integerInRange(0,this.world.width),
            this.rnd.realInRange(-1500,0),'spacerock','SpaceRock0000');

            var scale = this.rnd.realInRange(0.3,1.0);
            r.scale.x = scale;
            r.scale.y = scale;
            this.physics.enable(r,Phaser.Physics.ARCADE);
            r.enableBody = true;
            r.body.velocity.y = this.rnd.integerInRange(200,400);
            r.animations.add('Fall');
            r.animations.paly('Fall',24,true);
            r.checkWorldBounds = true;
            r.events.onOutOfBounds.add(this.resetRock,this);

        }
    },

    resetRock: function(r){
        if(r.y > this.world.height){
            this.respawnRock(r);
        }
    },

    respawnRock: function(r){
        r.reset(this.rnd.integerInRange(0,this.world.width),this.rnd.realInRange(-1500,0));
        r.body.velocity.y=this.rnd.integerInRange(200,400);
    },


    update:function(){}
};