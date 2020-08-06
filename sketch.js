const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine,world;
var ground;
var particles = [];
var plinkos = [];
var divisions = [];
var divisionHeight = 300;
var particle;
var score = 0;
var turn = 0;
var gameState = "start";

function setup() {
  createCanvas(800,800);
  engine = Engine.create();
  world = engine.world;

  particle = new Particle(mouseX,10,10,10);

  ground = new Ground(400,790,800,20);

  for(var k = 0; k <= width; k = k + 80)
  {
    divisions.push(new Divisions(k,height-divisionHeight/2,10,divisionHeight));
  } 

  for(var j = 40; j <= width; j = j + 50)
  {
    plinkos.push(new Plinko(j,75));
  }

  for(var j = 15; j <= width - 10; j = j + 50)
  {
    plinkos.push(new Plinko(j,175));
  }

  for(var j = 40; j <= width; j = j + 50)
  {
    plinkos.push(new Plinko(j,275));
  }

  for(var j = 15; j <= width - 10; j = j + 50)
  {
    plinkos.push(new Plinko(j,375));
  }
}


function draw() 
{
  background("black");  

  textSize(35);
  fill("white");
  text("Score: "+score,10,35);

  textSize(30);
  fill("white");
  text("100",15,550);
  text("100",95,550);
  text("200",175,550);
  text("200",255,550);
  text("300",335,550);
  text("300",415,550);
  text("400",495,550);
  text("400",575,550);
  text("500",655,550);
  text("500",735,550);

  Engine.update(engine);
  ground.display();

  if(gameState == "end")
  {
    textSize(100);
    text("Game Over",150,250);
  }

  /*if(frameCount % 60 == 0)
  {
    particles.push(new Particle(random(50,750),10,10));
  }*/

  for(var j = 0; j < plinkos.length; j++)
  {
    plinkos[j].display();
  }

  
  if(particle != null)
  {
    particle.display();
    if(particle.body.position.y > 750)
    {
      if(particle.body.position.x < 95)
      {
        score = score + 100;
        particle = null;
        if(turn >= 5)
        {
          gameState = "end";
        }
      }
      else if(particle.body.position.x < 255 && particle.body.position.x > 95)
      {
        score = score + 200;
        particle = null;
        if(turn >= 5)
        {
          gameState = "end";
        }
      }
      else if(particle.body.position.x < 415 && particle.body.position.x > 255)
      {
        score = score + 300;
        particle = null;
        if(turn >= 5)
        {
          gameState = "end";
        }
      }
      else if(particle.body.position.x < 575 && particle.body.position.x > 415)
      {
        score = score + 400;
        particle = null;
        if(turn >= 5)
        {
          gameState = "end";
        }
      }
      else
      {
        score = score + 500;
        particle = null;
        if(turn >= 5)
        {
          gameState = "end";
        }
      }
    }
  }

  for(var k = 0; k < divisions.length; k++)
  {
    divisions[k].display();
  }

  /*for(var i = 0; i < particles.length; i++)
  {
    particles[i].display();
  }*/

  stroke("yellow");
  line(0,475,800,475);
}

function mousePressed()
{
  if(gameState !== "end")
  {
    turn++;
    particle = new Particle(mouseX,10,10,10);
  }
}