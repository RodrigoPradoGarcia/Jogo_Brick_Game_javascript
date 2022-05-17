class Matrix
{
  static multiply(a,b)
  {
    try
    {
      if(a[0].length !== b.length)
      {
        throw new Error("O número de colunas da primeira deve se rigual ao número de linahs da segunda");
      }

      const result = new Array(a.length);
      for(let i=0;i<a.length;i++)
      {
        result[i] = new Array(b[0].length);
      }
      
      for(let i=0;i<a.length;i++)
      {
        for(let j=0;j<b[0].length;j++)
        {
          let soma = 0;
          for(let k=0;k<a[0].length;k++)
          {
            soma += a[i][k] * b[k][j];
          }
          result[i][j] = soma;
        }
      }

      return result;
    }
    catch(e)
    {
      console.error(e.stack);
      console.log(JSON.stringify(a));
      console.log(JSON.stringify(b));
    }
  }
}