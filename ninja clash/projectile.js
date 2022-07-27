class Projectile{
    constructor(scale,stat,shoot,o_stat,opponent){
        this.stat = stat;
        this.scale = scale;
        this.edge;
        this.body;
        this.image;
        this.group = new Group()
        this.shoot = shoot;
        this.o_stat = o_stat;
        this.opponent = opponent;
    }
    use(x,y,edge){
        // fixing position of projectiles
        this.x = x;
        this.y = y;

        this.edge = edge;
        // writing code to shoot projectiles
        if (keyDown("3") && this.stat.throws>0){
            // creating projectile

            this.body = createSprite(this.x,this.y,10,10);
            this.group.add(this.body);
            // setting angle of the projectile
            if(! this.shoot){
                this.body.pointTo(mouseX,mouseY);
            }
            if(this.shoot){
                var rand1 = Math.round(random(1,4));
                switch(rand1){
                    case 1 || 2:
                        this.body.pointTo(player.x,player.y);
                        break;
                    case 3 || 4:
                        this.body.pointTo(player.x+random(-100,100),player.y+random(-100,100));
                        break;
                }
            }
            // giving projectile speed lifetime gravity and image
            this.body.setSpeedAndDirection(15,this.body.rotation);
            this.body.lifetime = 205;
            this.body.rotation+=4;
            this.body.scale = this.scale;

            var rand2 = Math.round(random(1,9));
            
            switch (rand2){
                case 1:
                    this.image = loadImage("assets/weapons/kunai-1.png");
                    this.body.addImage("throw",this.image);
                    break;
                case 2:
                    this.image = loadImage("assets/weapons/kunai-2.png");
                    this.body.addImage("throw",this.image);
                    break;
                case 3:
                    this.image = loadImage("assets/weapons/star1.png");
                    this.body.addImage("throw",this.image);
                    break;
                case 4:
                    this.image = loadImage("assets/weapons/star2.png");
                    this.body.addImage("throw",this.image);
                    break;
                case 5:
                    this.image = loadImage("assets/weapons/star3.png");
                    this.body.addImage("throw",this.image);
                    break;
                case 5:
                    this.image = loadImage("assets/weapons/star4.png");
                    this.body.addImage("throw",this.image);
                    break;
                case 6:
                    this.image = loadImage("assets/weapons/star5.png");
                    this.body.addImage("throw",this.image);
                    break;
                case 7:
                    this.image = loadImage("assets/weapons/star6.png");
                    this.body.addImage("throw",this.image);
                    break;
                case 8:
                    this.image = loadImage("assets/weapons/star7.png");
                    this.body.addImage("throw",this.image);
                    break;
                case 9:
                    this.image = loadImage("assets/weapons/star8.png");
                    this.body.addImage("throw",this.image);
                    break;
                default:
                    break;
            }
            // damaging the opponent
            if (this.opponent.bounce(this.group) && this.o_stat.damages <= 300){
                this.o_stat.damages += 2.5;
                this.opponent.x += -(this.o_stat.movement*10);
            }
            this.group.collide(edge)
            // subtracting number of projectiles
            this.stat.throws-=1;
        }
    }
}