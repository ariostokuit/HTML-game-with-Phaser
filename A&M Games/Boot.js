var A_MGames = {};

A_MGames.Boot = fucntion(game) {};

BunnyDefender.Boot.prototype = {
    preload: function() {},

    create:function(){
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = false;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = 270;
        this.scale.minHeight = 480;
        this.sccale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
    }
}