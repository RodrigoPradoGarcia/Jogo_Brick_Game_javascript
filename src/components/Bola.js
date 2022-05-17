class Bola extends Circle
{
  constructor(parent,p,raio,cor)
  {
    super(p,raio);
    this.parent = parent;
    this.cor = cor;

    let x = Math.floor( Math.random(6 - (-6) + 1) + (-6) );
    let y = Math.floor( Math.random(6 - 1 + 1) + 1 );
    x = 1;
    y = 1;
    const alpha = Math.sqrt(13/(x**2+y**2));
    this.velocidade =
    [
      [x*alpha],
      [y*alpha]
    ];
    setTimeout(()=>{
      this.movimento = setInterval(()=>{
        this.mover();
      },MOVEMENT_INTERVAL);
    },1000);
  }

  mover()
  {
    this.c.x += this.velocidade[0][0];
    this.c.y += this.velocidade[1][0];
    this.parent.draw();
  }

  draw()
  {
    const ctx = this.parent.ctx;
    ctx.fillStyle = this.cor;
    ctx.save();
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowColor = this.cor;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(this.c.x,this.c.y,this.r,0,Math.PI*2,false);
    ctx.fill();
    ctx.restore();
  }

  flipX()
  {
    this.velocidade = Matrix.multiply(
      [
        [-1,0],
        [0,1]  
      ]
    ,this.velocidade);

    this.velocidade = Matrix.multiply(
      [
        [1.007,0],
        [0,1.007]  
      ]
    ,this.velocidade);

    this.tocarAudio();
  }

  tocarAudio()
  {
    const audio = new Audio("./assets/bola.wav");
    audio.volume = 0.2;
    audio.play();
  }

  flipY()
  {
    this.velocidade = Matrix.multiply(
      [
        [1,0],
        [0,-1]  
      ]
    ,this.velocidade);

    this.velocidade = Matrix.multiply(
      [
        [1.007,0],
        [0,1.007]  
      ]
    ,this.velocidade);

    this.tocarAudio();
  }
}