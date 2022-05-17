class Canvas
{
  constructor(obj,tag)
  {
    this.score = 0;
    document.querySelector(`#score`).innerHTML = this.score;
    this.maxScore = localStorage.getItem("score") || 0;
    document.querySelector(`#maxScore`).innerHTML = this.maxScore;
    this.baseScore = 10;

    this.keys = {};

    this.cor = "#313131";
    this.obj = obj;
    this.tag = tag;
    this.blocos = [];
    this.bolinha = null;
    this.plataforma = null;
    this.canvas = document.querySelector(`${this.obj}`);
    this.ctx = this.canvas.getContext("2d");
    this.initComponents();
    this.draw();
  }

  initComponents()
  {
    this.bolinha = new Bola(this,new Point(300,300),10,"#8ac9ff");
    this.quadrado = new SquareCollision(this,new Point(0,0),500,500);
    this.quadrado.track(this.bolinha);
    this.quadrado.onRightCollide(()=>{
      this.bolinha.x = 20;
      if(this.bolinha.velocidade[0][0] < 0)
      {
        this.bolinha.velocidade[0][0] *= -1;
      }
      this.bolinha.flipX();
    });
    this.quadrado.onBottomCollide(()=>{
      this.cor = "#e57373";
      this.draw();
      this.gameOver();
      clearInterval(this.bolinha.movimento);
      this.quadrado.dispose();
      this.blocos.forEach((bl)=>{
        bl.dispose();
      });
    });
    this.quadrado.onLeftCollide(()=>{
      this.bolinha.x = this.canvas.width - 20;
      if(this.bolinha.velocidade[0][0] > 0)
      {
        this.bolinha.velocidade[0][0] *= -1;
      }
      this.bolinha.flipX();
    });
    this.quadrado.onTopCollide(()=>{
      this.bolinha.y = 20;
      if(this.bolinha.velocidade[1][0] > 0)
      {
        this.bolinha.velocidade[1][0] *= -1;
      }
      this.bolinha.flipY();
    });

    for(let i=0;i<500;i+=50)
    {
      for(let j=0;j<200;j+=50)
      {
        this.addBlock(i,j);
      }
    }
    this.plataforma = new Plataforma(this,new Point(this.canvas.width/2 + 50,this.canvas.height - 45),60,40,"#7ff3a8");
    this.initEvents();
  }

  gameOver()
  {
    const audio = new Audio("assets/erro.wav");
    audio.play();
    const ctx = this.ctx;
    ctx.fillStyle = "white";
    ctx.font = "30px serif";
    ctx.fillText("Game Over!",this.canvas.width/2 - 50,this.canvas.height - 200);
    this.canvas.style.boxShadow = "0px 0px 18px red";
    localStorage.setItem('score',Math.max(this.score,(localStorage.getItem("score") || 0)));
    document.querySelector(`#reiniciar`).classList.remove("d-none");
    clearInterval(this.scoreInterval);
  }

  initEvents()
  {
    document.querySelector("body").addEventListener("keydown",(e)=>{
      if(!this.keys["ArrowLeft"] && !this.keys["ArrowRight"])
      {
        if(e.code === "ArrowLeft")
        {
          this.keys[e.code] = setInterval(()=>{
            this.plataforma.moveLeft();
          },MOVEMENT_INTERVAL);
        }
        else if(e.code === "ArrowRight")
        {
          this.keys[e.code] = setInterval(()=>{
            this.plataforma.moveRight();
          },MOVEMENT_INTERVAL);
        }
      }
    });

    document.querySelector("body").addEventListener("keyup",(e)=>{
      clearInterval(this.keys[e.code]);
      this.keys[e.code] = false;
    });
  }

  addBlock(x,y)
  {
    this.blocos.push(new Bloco(this,new Point(x,y),50,50,`rgb(${Math.floor(Math.random()*(256))},${Math.floor(Math.random()*(256))},${Math.floor(Math.random()*(256))})`));
  }

  removeBlock(block)
  {
    block.untrack(this.bolinha);
    this.blocos = this.blocos.filter((bl)=>{
      if(bl !== block)
      {
        return true;
      }
      else
      {
        bl.dispose();
        bl = null;
        return false;
      }
    });
    this.score += this.baseScore;
    this.baseScore += 10;
    document.querySelector(`#score`).innerHTML = this.score;
    if(this.blocos.length==0)
    {
      this.cor = "#2e7d32";
      this.draw();
      clearInterval(this.bolinha.movimento);
      this.quadrado.dispose();
      const ctx = this.ctx;
      ctx.fillStyle = "white";
      ctx.font = "30px serif";
      ctx.fillText("Vitória!",this.canvas.width/2 - 50,this.canvas.height - 200);
      this.canvas.style.boxShadow = "0px 0px 18px green";
      localStorage.setItem('score',Math.max(this.score,(localStorage.getItem("score") || 0)));
      document.querySelector(`#reiniciar`).classList.remove("d-none");
      clearInterval(this.scoreInterval);
      const audio = new Audio("assets/victory.wav");
      audio.play();
    }
  }

  draw()
  {
    const ctx = this.ctx;
    ctx.fillStyle = this.cor;
    ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
    this.blocos.forEach((b)=>{
      b.draw()
    });
    this.bolinha.draw();
    this.plataforma.draw();
  }
}