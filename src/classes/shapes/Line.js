class Line
{
  constructor(p1,p2)
  {
    try
    {
      if(!p1.equals(p2))
      {
        this.p1 = p1;
        this.p2 = p2;
        this.cAngular = (p1.y - p2.y) / (p1.x - p2.x); 
        if(Math.abs(this.cAngular) === Infinity)
        {
          this.cAngular = 0;
        }
        this.a = -this.cAngular;
        this.b = 1;
        this.c = -this.p1.y + this.cAngular * this.p1.x;
      }
      else
      {
        throw new Error("Os dois pontos da reta devem ser distintos");
      }
    }
    catch(erro)
    {
      console.error(erro.stack);
      console.error(p1.toString());
      console.error(p2.toString());
    }
  }

  toString()
  {
    return(
    `Line:
      ${this.p1.toString()} ${this.p2.toString()}
      m = ${this.cAngular} a = ${this.a} b = ${this.b} c = ${this.c}
    `);
  }
}