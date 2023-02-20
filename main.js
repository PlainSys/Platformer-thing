// Game Setup

//World.frameRate = 45;

// Create Sprites
var player = createSprite(20, 282);

//player.setAnimation("platform");
player.shapeColor = "darkcyan";
player.scale = 0.4;

// Controls
var speed = 4; //how fast the player can go
var grav = 0.4; //gravity of the player
var jumpforce = 7; //how high the player can jump
var dir = 1; //used for the blaster(1 = right, 0 = left)
var swim = false; //if true, allows player to fly freely

var touchingground = false;

var bullet = createSprite(50, -100 );
//bullet.setAnimation("rock");
bullet.shapeColor = "black";
bullet.scale = 0.1;

var gem = createSprite(0,-50);
gem.shapeColor = (rgb(255,74,74));
gem.scale = 0.3;

var gemcol = false; //checks if you collected the gym

var walls = createGroup();{
    walls.add(createSprite(22,347,160,50));
}

var hurtblock = createGroup(); //knockoff lava

var spike = createGroup(); //**mega man**
spike.setColorEach("green"); //this was to test out coloring groups, ignore it.

var end = createSprite(0, 0);
end.shapeColor = "yellow";
end.scale = 0.4;

var end2 = createSprite(0, 0);
end2.shapeColor = "yellow";
end2.scale = 0.4; //i suck at coding so I did this

var bonusend = createSprite(0, -50);
bonusend.shapeColor = "lightgreen";
bonusend.scale = 0.4;

var stageselect = false; //used only if gem is collected

var gemplat = createGroup();

//Data
var Lives = 2;
var Health = 10;

var camfollow = false; //if true, camera follows player like a traditional sidescroller
var camy = false; //if ture, the camera moves up if the player moves up.

var stage = 1; //stage number
var stagename = "nothing"; //Dosnt do anything then document the stages level

var timer = 0; //used for disappearing block

var displat = createSprite(200, -100, 50, 30); //the disappearing block
displat.shapeColor = "GRAY";
//var clearstate = 0;

//variables below are for random colors
var rred = randomNumber(0, 255);
var rgreen = randomNumber(0, 255);
var rblue = randomNumber(0, 255);

//function for moving camera
function checkCam(){
    if (camfollow == true) {
        if (player.x > 200){
            camera.x = player.x;
            camera.y = player.y;
            if (camy == false){
                camera.y = 200;
            } else{
                camera.y = player.y;
            }
        }
    }
}

function draw(){
    //Background
    background("skyblue");
    
    checkCam(); //calls the "checkCam" function

    // the shooting in this game is pointless...
    if (keyWentDown("x")) {
        if (dir == 1){
            bullet.x = player.x;
            bullet.y = player.y;
            bullet.velocityX = -9;
        }
        else if (dir == 0);{
            bullet.x = player.x;
            bullet.y = player.y;
            bullet.velocityX = 9;
        }
    }
    
    // Code detects if player is touching the end
    if (player.isTouching(end)) {
        if (stage == 0){
            stage += 1;
            player.x = 40;
            player.y = 282;
        }
        if (stage == 1){
            stage = 2;
            player.x = 40;
            player.y = 282;
        }
        //clearstate += 1;
        if (stage == 3){
            stage = 4;
            player.x = 40;
            player.y = 282;
            camera.x = 200;
            camera.y = 200;
        }
    }
    
    if (player.isTouching(end2)) {
        if (stage == 2){
            stage = 3;
            player.x = 40;
            player.y = 282;
        }
    }
    
    if (player.isTouching(gem)){
        gemcol = true;
        gem.visible = false;
    }
    
    if (player.isTouching(bonusend)){
        player.x = 0;
        player.y = 180;
        stageselect = true;
        camera.x = 200;
        camera.y = 200;
        walls.destroyEach();
    }
    
    //If player touches spike they lose a life
    if (player.isTouching(spike)) {
        player.x = 40;
        Lives -= 1;
        camera.x = 200; //makes sure the camera goes back
    }
    
    //Player lose health upon touching
    if (player.isTouching(hurtblock)) {
        Health -= 1;
    }
    
    if (Health <= 0){ //checks if the players health is zero
        player.x = 40;
        Lives -= 1;
        camera.x = 200;
    }
    
    //the code below calls the functions for each
    Movement();
    Gravity();
    ground();
    collision();
    
    if (stage == 0) {
        stage0();
    }
    else if (stage == 1){
        //clearstage0 = true;
        walls.destroyEach();
        stage1();
    }
    else if (stage == 2){
        walls.destroyEach();
        spike.destroyEach();
        hurtblock.destroyEach();
        stage2();
    }
    else if (stage == 3){
        walls.destroyEach();
        spike.destroyEach();
        stage3();
    }
    else if (stage == 4){
        walls.destroyEach();
        spike.destroyEach();
        stage4();
    }
    if (stageselect == true){
        //player.visible = false;
        fill("blue");
        text("You have unlocked the Stage Select",50,50);
        //text("Press a number on your keypad!",50,250);
        textSize(40);
        if (keyWentDown("1")){
            stage = 1;
            stage1();
        }
        if (keyWentDown("2")){
            stage = 2;
            stage2();
        }
        if (keyWentDown("3")){
            stage = 3;
            stage3();
        }
        if (keyWentDown("4")){
            stage = 4;
            stage4();
        }
        if (keyWentDown("5")){
            stage = 5;
            stage3();
            background(rgb(rred, rgreen, rblue));
            walls.setColorEach(rgb(rred, rgreen, rblue));
        }
        if (keyWentDown("6")){
            stage = 6;
            stage1();
            background(rgb(rred, rgreen, rblue));
            walls.setColorEach(rgb(rred, rgreen, rblue));
        }
    }
    
    //displays the sprites
    drawSprites();
    
    //Game over screen
    if (Lives <= -1){
        background("black");
        textFont("Monospace");
        textSize(40);
        fill("red");
        text("Game Over", 150, 250);
    }
}

function stage0(){ //test stage   
    var plat1 = createSprite(256,326,50,50);
    
    background("white");
    walls.add(plat1);
    walls.add(createSprite(374,275,10,50));
    walls.add(createSprite(208,190,180,20));
    
    end.x = 15;
    end.y = 90;
    
    // if (stage == 1){
    //  clearstage0 = true;
    // }
    
    //if (clearstage0 == true){
        //walls.destroyEach();
    //}
    
    stagename = "Test Level";
}

function stage1(){
    var plat1 = createSprite(190,373,50,50); //this was to test something... ignore this
    
    end2.visible = false;
    
    background("skyblue");
    
    //platforms
    walls.add(createSprite(22,347,160,50));
    walls.add(plat1);
    walls.add(createSprite(374,335,150,50));
    walls.add(createSprite(394,220,30,180));
    hurtblock.add(createSprite(354, 120, 90, 30));
    walls.add(createSprite(194,235,190,30));
    spike.add(createSprite(194,220, 50, 30));
    walls.add(createSprite(0, 168, 90, 20));
    walls.setColorEach("green");
    hurtblock.setColorEach("red");
    spike.setColorEach("black");
    
    end.x = 0;
    end.y = 116;
    
    display();
    
    stagename = "Blooming Cliffs";
}

function stage2(){
    //background
    background("skyblue");
    
    end.visible = false;
    end2.visible = true;
    
    fill("brown");
    rect(124, 90, 85, 500);
    rect(0, 112, 200,500);
    rect(180, 95, 300, 500);
    
    fill("blue");
    rect(0,210, 500, 300);
    
    fill("yellow");
    ellipse(288, 1, 100, 100);
    
    //fix positions
    end2.x = 0;
    end2.y = 0;
    
    displat.x = 200;
    displat.y = 332;
    
    //platforms
    walls.add(createSprite(22,347,160,50));
    walls.add(createSprite(325, 289, 160, 25));
    spike.add(createSprite(305,268, 50, 30));
    walls.add(createSprite(399, 220, 50, 25));
    walls.add(createSprite(283, 155, 50, 25));
    walls.add(createSprite(15, 99, 50, 25));
    
    timer = timer + 0.033;
    
    //text(Math.round(timer), 250, 350);
    
    if (timer > 3){
        displat.y = 132;
    }
    
    if (timer > 6){
        displat.y = 332;
        timer = 0;
    }
    walls.setColorEach("darkred");
    
    display();
    stagename = "Flair Hills";
}

function stage3(){
    camfollow = true;
    camy = true;
    end.visible = true;
    end2.visible = false;
    
    displat.visible = false;
    
    gem.x = 705;
    gem.y = 255;
    
    //background
    background("darkblue");
    
    fill("lightgrey");
    ellipse(0, 0, 300, 300); //moon
    
    fill(rgb(144,128,168));
    rect(0,130,4000,500);
    
    fill(rgb(80, 146, 148));
    shape(0, 100, 0, 400, 200, 400);
    
    walls.add(createSprite(690,136,30,340));
    walls.setColorEach(rgb(55, 37, 71));
    
    walls.add(createSprite(22,347,290,35));
    walls.add(createSprite(370,296,180,35));
    walls.add(createSprite(670,296,180,35));
    walls.add(createSprite(720,-36,90,25));
    walls.add(createSprite(950,-36,180,35));
    walls.add(createSprite(1250,66,180,35));
    
    walls.add(createSprite(990,226,180,35));
    walls.add(createSprite(1210,106,20,65));
    walls.add(createSprite(1600,68,200,35));
    walls.add(createSprite(1900,164,200,35));
    
    walls.setColorEach(rgb(66, 158, 3));
    
    end.x = 2000;
    end.y = 150;
    
    bonusend.x = 1600;
    bonusend.y = 276;
    
    if (gemcol == true){
        gemplat.add(createSprite(1400,232,200,35));
        gemplat.setColorEach(rgb(255,74,74));
    }
    
    //the ground
    fill("purple");
    rect(-1, 347, 160, 500);
    rect(280, 296, 180, 500);
    rect(580, 296, 180, 500);
    rect(860, -36, 180, 500);
    rect(1210, 85, 130, 500);
    rect(1505, 85, 170, 500);
    rect(1805, 164, 190, 500);
    rect(900, 224, 180, 500);
    
    display();
    
    stagename = "Night Fall";
}

function stage4(){
    swim = true;
    camfollow = true;
    camy = false;
    grav = 0.4;
    jumpforce= 3;
    
    
    background(rgb(51, 85, 255));
    
    walls.add(createSprite(0,-20,4000,100));
    walls.setColorEach(rgb(51, 85, 255));
    
    walls.add(createSprite(0,406,4000,100));
    walls.setColorEach(rgb(255, 238, 204));
    
    spike.add(createSprite(299,296, 50, 30));
    spike.add(createSprite(392,127, 50, 30));
    spike.add(createSprite(410,340, 200, 30));
    spike.add(createSprite(532,157, 50, 30));
    spike.add(createSprite(630,260, 200, 30));
    spike.add(createSprite(700,230, 200, 30));
    spike.add(createSprite(652,65, 50, 30));
    spike.add(createSprite(632,327, 50, 30));
    spike.add(createSprite(850,98, 200, 30));
    spike.add(createSprite(900,209, 50, 30));
    spike.setColorEach("black");
    
    stagename = "Rola Bay";
}

//inserts the HUD
function display(){
    fill(rgb(184,33,28));
    textFont("cursive");
    textSize(20);
    text("Lives:", 280, 30);
    text(Lives, 350, 30);
    fill(rgb(255, 78, 71));
    text("Health:", 280, 50);
    text (Health, 350, 50);
}

//Player Movement
function Movement(){
    if (keyDown("right") || keyDown("d")){
        player.x += speed;
        dir = 0;
    }
    
    if (keyDown("left") || keyDown("a")){
        player.x -= speed;
        dir = 1;
    }
    
    if (keyDown("z") || keyDown("j")){
        if (swim == false){
            if (touchingground)
                player.velocityY = -jumpforce; 
            } else {
                player.velocityY = -jumpforce; 
        }
        
    }
}

//Player gravity
function Gravity(){
    player.velocityY += grav;
}

function collision(){
    player.collide(walls);
    player.collide(displat);
    player.collide(gemplat);
  
    if (player.y > 400){
        player.x = 40;
        player.y = 300;
        player.setVelocity(0,0);
        Lives -= 1;
        camera.x = 200;
    }
}

function ground(){
    player.y += 0.5;
    touchingground = player.isTouching(walls) || player.isTouching(displat);
    player.y -= 0.5;
}