class Geometry
{
  static distancePointLine(p,line)
  { 
    return Math.abs(line.a * p.x + line.b * p.y + line.c) / (Math.sqrt(line.a**2 + line.b**2));
  }

  static pointDistance(p1,p2)
  {
    const deltay = p2.y - p1.y;
    const deltax = p2.x - p1.x;
    const dist = Math.sqrt(deltax**2+deltay**2);
    return dist;
  }
}

class Collision
{
  static circleAndLine(c,l)
  {
    if(l.p1.x === l.p2.x)
    {
      return(
        c.c.x + c.r >= l.p1.x &&
        c.c.x - c.r <= l.p1.x &&
        c.c.y + c.r >= Math.min(l.p1.y,l.p2.y) &&
        c.c.y - c.r <= Math.max(l.p1.y,l.p2.y)
      );
    }
    else if(l.p1.y === l.p2.y)
    {
      return(
        c.c.y + c.r >= l.p1.y &&
        c.c.y - c.r <= l.p1.y &&
        c.c.x + c.r >= Math.min(l.p1.x,l.p2.x) &&
        c.c.x - c.r <= Math.max(l.p1.x,l.p2.x)
      );
    }
    else
    {
      const dist = Geometry.distancePointLine(c.c,l);
      return(
        dist < c.r &&
        c.c.x + c.r >= Math.min(l.p1.x,l.p2.x) &&
        c.c.x - c.r <= Math.max(l.p1.x,l.p2.x) &&
        c.c.y + c.r >= Math.min(l.p1.y,l.p2.y) &&
        c.c.y - c.r <= Math.max(l.p1.y,l.p2.y)
      );
    }
  }
}