
//vytvoření proměnných
let gridSize =0;
let space =0;

let snake =[];
let food =[];

let dir =[];
let img;

let score =0;

document.addEventListener('keydown', function(k){ //metoda addEventListener (tlačítko keydown)
  dir = k.code; //přidává proměnné dir kod klavesy k
});

//funkce na načtení obrázku
function preload(){
  img = loadImage('gameover.jpg');
}

//funkce na vytvoření plátna
function setup() {
 createCanvas(1000, 1000);
 rectMode(CENTER);
 imageMode(CENTER);//zarovává obrázek do středu plátna
 frameRate(8);//počet snímků

 gridSize = 20; //počet kostiček za sebou
 space = width / gridSize;

 snake = new Snake();

 food = new Food();

  score = createP('Skóre:').position(80, 0).style('font-size: 60px; opacity: 0.3');//zobrazení skore
}
// funkce pro vykreslení objektů na plátno
function draw() {
  background(25, 60, 120);//barva pozadí

  //vyvolání funkcí
  if(!snake.dead){
    snake.move();
    snake.edges();
    snake.eat();
    snake.tail();
    snake.show();
  
    food.show();

  }else{
    image(img, width / 2, height / 2);
  }

//vytvoří pozadí bez výplně
  noFill();
  stroke(10, 20, 30);
  strokeWeight(space);

  rect(width / 2, height / 2, width, height);//nakreslí obdelník s tímto umístěním

  score.html('Skóre: ' + snake.length);//počítaní skore
}

//vytvoření hada
class Snake{

  //nastavuje počateční hodnotu
  constructor(){
    this.pos = createVector(500, 500);

    this.length = 1;//udavá počet parametrů ve funkci

    this.posHistory =[this.pos];

    this.dead = false;
  }
 
  //pohyb hada
  move(){
    if (dir === 'ArrowRight'){
      this.pos.x += space;//posouvá pozici x, přičítá k funkci space
    }else if (dir ==='ArrowLeft'){
      this.pos.x -= space;
    }else if (dir ==='ArrowUp'){
      this.pos.y -= space;
    }else if(dir === 'ArrowDown'){
      this.pos.y += space;
    }
  }


  //vytváří okraj plátna
  edges(){
    if(this.pos.x ===0 || this.pos.x === width || this.pos.y === 0 || this.pos.y === height){
      this.dead = true; //pokud had vstoupí do okraje zemře
    }

    for(let i = 0; i < this.posHistory.length - 1; i++){
      if(this.pos.x === this.posHistory[i].x && this.pos.y === this.posHistory[i].y){
        this.dead = true;//pokud had projde přes sebe umře
      }
    }
  }
  //generování pozice pro jídlo
  eat(){
    if(this.pos.x === food.x && this.pos.y === food.y){
      food.newPos();

      this.length += 1;

    }
  }
  //dráha (ocas) hada
  tail(){
    this.posHistory.push(this.pos.copy());

    if(this.posHistory.length > this.length){
      this.posHistory.splice(0, 1);
    }
  }


   show(){
    noStroke();
    fill(255);
    
    for(let i = 0; i < this.posHistory.length; i++){
      rect(this.posHistory[i].x, this.posHistory[i].y, space -5);
    }
  }
}
//vytvoření jídla a jeho pohybu
class Food{
  //nastaví počateční hodnoty, záleží na počtu kostiček hada
  constructor(){
    this.x = floor(random(1, gridSize)) * space;
    this.y = floor(random(1, gridSize)) * space;

    this.moved = false;
  }

  //generuje nové jídlo když ho had sní
  newPos(){
    this.moved = false;

    while(!this.moved){
      let newX = floor(random(1, gridSize)) * space;
      let newY = floor(random(1, gridSize)) * space;
  
      for(let i=0; i<snake.posHistory.length; i++){
        if(newX === snake.posHistory[i].x && newY === snake.posHistory[i].y){
          break;
        } else{
          if(i === snake.posHistory.length - 1){
            this.x = newX;
            this.y = newY;

            this.moved = true;
          }
        }
      }
    }

  }
//zobrazuje skryté, vybrané prvky
  show(){
    noStroke();
    fill(255, 50, 50);
    
    rect(this.x, this.y, space / 2);
  }
}