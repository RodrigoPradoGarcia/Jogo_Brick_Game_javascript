class Circle
{
  constructor(c,r)
  {
    try
    {
      this.c = c;
      this.r = r;
      if(r == 0)
      {
        throw new Error("Raio não pode ser igual a 0");
      }
    }
    catch(erro)
    {
      console.error(erro.stack);
      console.log();
    }
  }

  toString()
  {
    return(
    `Circle: 
      center: ${this.c.toString()} radius: ${this.r.toString()}
    `);
  }
}