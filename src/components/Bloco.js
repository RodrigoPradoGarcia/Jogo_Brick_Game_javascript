class Bloco extends SquareCollision
{
  constructor(parent,p,w,h,cor)
  {
    super(parent,p,w,h);
    this.cor = cor;
    this.track(this.parent.bolinha);
    this.onBottomCollide(()=>{
      this.parent.bolinha.c.y += 5;
      this.parent.bolinha.flipY();
      this.parent.removeBlock(this);
    });
    this.onLeftCollide(()=>{
      this.parent.bolinha.c.x -= 5;
      this.parent.bolinha.flipX();
      this.parent.removeBlock(this);
    });
    this.onTopCollide(()=>{
      this.parent.bolinha.c.y -= 5;
      this.parent.bolinha.flipY();
      this.parent.removeBlock(this);
    });
    this.onRightCollide(()=>{
      this.parent.bolinha.c.x += 5;
      this.parent.bolinha.flipX();
      this.parent.removeBlock(this);
    });
  }

  dispose()
  {
    clearInterval(this.bottomInterval);
    clearInterval(this.topInterval);
    clearInterval(this.leftInterval);
    clearInterval(this.rightInterval);
  }

  draw()
  {
    const ctx = this.parent.ctx;
    ctx.fillStyle = this.cor;
    ctx.strokeStyle = "1px #888";
    ctx.fillRect(this.superiorEsquerdo.x,this.superiorEsquerdo.y,this.width,this.height);
    ctx.strokeRect(this.superiorEsquerdo.x,this.superiorEsquerdo.y,this.width,this.height);
  }
}