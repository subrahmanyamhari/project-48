class Tool{
    constructor(scale,stat,dir,opponent,o_stat){
        this.x
        this.y
        this.scale = scale
        this.body = createSprite(this.x,this.y,10,10);
        this.image
        this.dir = dir
        this.stat = stat
        this.opponent = opponent;
        this.o_stat = o_stat;
    }
    use(x,y){
        // fixing positions of weapon
        this.body.x = x
        this.body.y = y

        // scaling weapon
        this.body.scale = 0.5;

        // giving control over weapon

        if(this.opponent === opponent){
            // setting angle of weapon
        this.body.pointTo(mouseX,mouseY);
            if (keyDown("1")){
                this.sword()
            }
            if (keyDown("2")){
                this.spear()
            }
        }
        this.body.mirrorY(this.dir);
        // damaging the opponent
        if (this.body.collide(this.opponent) && this.o_stat.damages <= 300 && this.stat.attack>0){
            this.o_stat.damages += this.stat.attack;
            this.opponent.x += -(this.o_stat.movement*40);
        }
    }

    // changing weapons image to a sword
    sword(){
        this.image = loadImage("assets/weapons/sword.png")
        this.body.addImage("weapon",this.image);
        this.stat.attack = 10;
        this.stat.speed = 9.5;
    }

    // changing weapons image to a spear
    spear(){
        var rand2= Math.round(random(1,2))
        switch (rand2){
            case 1:
                this.image = loadImage("assets/weapons/spear1.png");
                this.body.addImage("weapon",this.image);
                break;
            case 2:
                this.image = loadImage("assets/weapons/spear2.png");
                this.body.addImage("weapon",this.image);
                break;
            default:
                break;
        }
        this.stat.attack = 15;
        this.stat.speed = 6.75;
    }
    angle(){
        if(this.opponent === player && frameCount%50 === 0){
            var rand1 = Math.round(random(1,4))
            switch(rand1){
                case 1:
                    this.body.pointTo(mouseX+random(10,100),mouseY+(10,100));
                    break;
                case 2:
                    this.body.pointTo(player.x,player.y);
                    break;
                case 3:
                    this.body.pointTo(player.x+random(10,100),player.y+random(10,100));
                    break;
                case 4:
                    this.body.pointTo(mouseX,mouseY);
                    break;
            }
        }
    }
    direction(d){
        this.dir = d
    }
}