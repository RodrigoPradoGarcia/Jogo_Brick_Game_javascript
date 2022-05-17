class Plataforma
{
  constructor(parent,point,width,height,cor)
  {
    this.parent = parent;
    this.quadrado = new SquareCollision(this.parent,point,width,height);
    this.cor = cor;
    this.quadrado.track(this.parent.bolinha);
    this.quadrado.onTopCollide(()=>{
      const oldAlpha = this.parent.bolinha.velocidade[0][0]**2+this.parent.bolinha.velocidade[1][0]**2;

      let x = this.parent.bolinha.velocidade[0][0];
      let y = this.parent.bolinha.velocidade[1][0];
      const meio = new Point((this.quadrado.superiorDireito.x+this.quadrado.superiorEsquerdo.x)/2,this.quadrado.superiorEsquerdo.y);
      const dist = Geometry.pointDistance(meio,this.parent.bolinha.c);
      const mult = dist/this.quadrado.width;
      
      const angulo = Math.PI/6*((1-mult)+1);

      if(this.parent.bolinha.velocidade[0][0]<0)
      {
        x = -1*Math.cos(angulo);
        y = 1*Math.sin(angulo);
      }
      else
      {
        x = 1*Math.cos(angulo);
        y = 1*Math.sin(angulo);
      }
      const alpha = Math.sqrt(oldAlpha/(x**2+y**2));
      this.parent.bolinha.velocidade =
      [
        [x*alpha],
        [y*alpha]
      ];

      this.parent.baseScore = 10;
      this.parent.bolinha.c.y -= 5;
      this.parent.bolinha.flipY();
    });
    this.quadrado.onBottomCollide(()=>{
      this.parent.baseScore = 10;
      this.parent.bolinha.flipY();
    });
    this.quadrado.onLeftCollide(()=>{
      this.parent.baseScore = 10;
      this.parent.bolinha.c.x -= 15;
      this.parent.bolinha.flipX();
    });
    this.quadrado.onRightCollide(()=>{
      this.parent.baseScore = 10;
      this.parent.bolinha.c.x += 15;
      this.parent.bolinha.flipX();
    });
  }

  refreshCollisionDettection()
  {

  }

  moveLeft()
  {
    if(this.quadrado.superiorEsquerdo.x > 0)
    {
      this.quadrado.superiorEsquerdo.x -= 5;
      this.quadrado.inferiorEsquerdo.x -= 5;
      this.quadrado.superiorDireito.x -= 5;
      this.quadrado.inferiorDireito.x -= 5;

      this.quadrado.lineTop = new Line(this.quadrado.superiorEsquerdo,this.quadrado.superiorDireito);
      this.quadrado.lineBottom = new Line(this.quadrado.inferiorEsquerdo,this.quadrado.inferiorDireito);
      this.quadrado.lineLeft = new Line(this.quadrado.superiorEsquerdo,this.quadrado.inferiorEsquerdo);
      this.quadrado.lineRight = new Line(this.quadrado.superiorDireito,this.quadrado.inferiorDireito);
    }
    this.refreshCollisionDettection();
  }

  moveRight()
  {
    if(this.quadrado.superiorEsquerdo.x + this.quadrado.width < this.parent.canvas.width)
    {
      this.quadrado.superiorEsquerdo.x += 5;
      this.quadrado.inferiorEsquerdo.x += 5;
      this.quadrado.superiorDireito.x += 5;
      this.quadrado.inferiorDireito.x += 5;

      this.quadrado.lineTop = new Line(this.quadrado.superiorEsquerdo,this.quadrado.superiorDireito);
      this.quadrado.lineBottom = new Line(this.quadrado.inferiorEsquerdo,this.quadrado.inferiorDireito);
      this.quadrado.lineLeft = new Line(this.quadrado.superiorEsquerdo,this.quadrado.inferiorEsquerdo);
      this.quadrado.lineRight = new Line(this.quadrado.superiorDireito,this.quadrado.inferiorDireito);
    }
    this.refreshCollisionDettection();
  }

  draw()
  {
    const ctx = this.parent.ctx;
    ctx.fillStyle = this.cor;
    ctx.save();
    ctx.shadowOffestX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.cor;
    ctx.fillRect(this.quadrado.superiorEsquerdo.x,this.quadrado.superiorEsquerdo.y,this.quadrado.width,this.quadrado.height);
    ctx.restore();
  }
}