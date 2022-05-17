class SquareCollision
{
  constructor(parent,superiorEsquerdo,width,height)
  {
    //referência ao componente pai
    this.parent = parent;

    //vértices do quadrado
    this.superiorEsquerdo = superiorEsquerdo;
    this.superiorDireito = new Point(this.superiorEsquerdo.x + width,this.superiorEsquerdo.y);
    this.inferiorEsquerdo = new Point(this.superiorEsquerdo.x,this.superiorEsquerdo.y + height);
    this.inferiorDireito = new Point(this.superiorEsquerdo.x + width,this.superiorEsquerdo.y + height);

    //dimensões do quadrado
    this.width = width;
    this.height = height;

    //arestas do quadrado
    this.lineTop = new Line(this.superiorEsquerdo,this.superiorDireito);
    this.lineBottom = new Line(this.inferiorEsquerdo,this.inferiorDireito);
    this.lineLeft = new Line(this.superiorEsquerdo,this.inferiorEsquerdo);
    this.lineRight = new Line(this.superiorDireito,this.inferiorDireito);

    //lista de objetos para detectar colisão
    this.trackingObjects = [];
  }

  track(obj)
  {
    this.trackingObjects.push(obj);
  }

  untrack(obj)
  {
    this.trackingObjects = this.trackingObjects.filter((ob)=>{
      return ob !== obj
    });
  }

  dispose()
  {
    clearInterval(this.topInterval);
    clearInterval(this.bottomInterval);
    clearInterval(this.leftInterval);
    clearInterval(this.rightInterval);
  }

  onTopCollide(callback)
  {
    this.topCallback = callback;
    this.topInterval = setInterval(()=>{
      this.trackingObjects.forEach((ob)=>{
        if(Collision.circleAndLine(ob,this.lineTop))
        {
          this.topCallback(ob);
        }
      });  
    },MOVEMENT_INTERVAL);
  }

  onBottomCollide(callback)
  {
    this.bottomCallback = callback;
    this.bottomInterval = setInterval(()=>{
      this.trackingObjects.forEach((ob)=>{
        if(Collision.circleAndLine(ob,this.lineBottom))
        {
          this.bottomCallback(ob);
        }
      });  
    },MOVEMENT_INTERVAL);
  }

  onLeftCollide(callback)
  {
    this.leftCallback = callback;
    this.leftnterval = setInterval(()=>{
      this.trackingObjects.forEach((ob)=>{
        if(Collision.circleAndLine(ob,this.lineLeft))
        {
          this.leftCallback(ob);
        }
      });  
    },MOVEMENT_INTERVAL);
  }

  onRightCollide(callback)
  {
    this.rightCallback = callback;
    this.rightInterval = setInterval(()=>{
      this.trackingObjects.forEach((ob)=>{
        if(Collision.circleAndLine(ob,this.lineRight))
        {
          this.rightCallback(ob);
        }
      });  
    },MOVEMENT_INTERVAL);
  }
}