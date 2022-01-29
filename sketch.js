{var trex, ground1, groundInvisible, cloud, obstacles;
var trexRunning, trexCollided;
var groundMoving;
var cloudsMoving;
var o1, o2, o3, o4, o5, o6;
var gameOver, restart;
var picGameOver, picRestart;
var gamestate = "play";}

function preload() {
	trexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");
	trexCollided = loadImage("trex_collided.png");
	cloudsMoving = loadImage("cloud.png");
	o1 = loadImage("obstacle1.png");
	o2 = loadImage("obstacle2.png");
	o3 = loadImage("obstacle3.png");
	o4 = loadImage("obstacle4.png");
	o5 = loadImage("obstacle5.png");
	o6 = loadImage("obstacle6.png");
	groundMoving = loadImage("ground2.png");
	gameOver = loadImage("gameOver.png");
	restart = loadImage("restart.png");
}

function setup() {
	createCanvas(400, 400);

	trex = createSprite(50,275);
	trex.addAnimation("running",trexRunning);
	trex.scale = 0.6;

	ground = createSprite(300,300);
	ground.addImage("moving",groundMoving);

	groundInvisible = createSprite(200,310,ground.width,5);
	groundInvisible.visible = false;

	obstaclesGroup = new Group();
	cloudsGroup = new Group();

	picGameOver = createSprite(150,150);
	picGameOver.addAnimation("gameover",gameOver);
	picGameOver.scale = 0.5;
	picGameOver.visible = false;

	picRestart=createSprite(150,190);
	picRestart.addAnimation("restart",restart);
	picRestart.scale = 0.5;
	picRestart.visible= false;
}

function draw(){
	if(frameCount%1000 >= 0 && frameCount%1000 <=499){
		background(255,255,255);
	}
	else if(frameCount%1000 >=500 && frameCount%1000 <= 999){
		background(30,30,30);
	}

	trex.collide(groundInvisible);

	camera.position.x = trex.x + 150;

  	if(gamestate == "play"){
    	trex.velocityX = 10;
    	if(trex.x >= ground.x+70){
      		ground.x = ground.x + ground.width/2;
			groundInvisible.x = ground.x;	
    	} 

    	console.log(trex.y);

		if(keyDown("space") && trex.y>278){
			trex.velocityY = -15;
		}  
    
		spawnClouds();
		spawnObstacles();
    
		trex.velocityY = trex.velocityY + 1;

		if(trex.isTouching(obstaclesGroup)){
			gamestate = "end";
		}
  	}

  	if(gamestate == "end"){
		trex.velocityY = 0;
		trex.velocityX = 0;
		ground.velocityX=0;
		cloudsGroup.setLifetimeEach(-1);
		obstaclesGroup.setLifetimeEach(-1);
		trex.pause();
		picGameOver.x = trex.x + 150;
		picGameOver.visible = true;
		picRestart.x = trex.x + 150;
		picRestart.visible = true;
  	}

	if(mousePressedOver(picRestart)){
    	reset();
  	}
  	drawSprites();
}

function spawnClouds(){
	if(frameCount%60 ==0){
		cloud = createSprite(trex.x + 400,random(50,140));
		cloud.addImage("spawn",cloudsMoving);
		cloud.velocityX = 0;
		cloud.lifetime = 100;
		cloudsGroup.add(cloud);
	} 
}  

function spawnObstacles(){
  	if(frameCount%100 == 0 && frameCount > 0){
		obstacles = createSprite(trex.x + 400,275);
		obstacles.scale = 0.7;
		var num = Math.round(random(1,6));
		switch (num){
		case 1:
			obstacles.addImage("no1",o1);
			break;
			
		case 2:
			obstacles.addImage("no1",o2);
			break;
			
		case 3:
			obstacles.addImage("no1",o3);
			break;
			
		case 4:
			obstacles.addImage("no1",o4);
			break;
			
		case 5:
			obstacles.addImage("no1",o5);
			break;
			
		case 6:
			obstacles.addImage("no1",o6);
			break;  
			
		default:
			break;
		}  

		obstacles.velocityX = 0;
		obstaclesGroup.add(obstacles);
  	}
}  

function reset(){
	gamestate = "play";
	picRestart.visible = false;
	picGameOver.visible = false;
	trex.play();
	cloudsGroup.destroyEach();
	obstaclesGroup.destroyEach();
}