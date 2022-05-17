var MOVEMENT_INTERVAL = 10;
var canvas;
var musica = new Audio("assets/musica.m4a");
musica.loop = true;

function iniciar()
{
  canvas = new Canvas('canvas','canvas');
}

function reiniciar()
{
  document.querySelector(`#reiniciar`).classList.add("d-none");
  this.canvas = new Canvas('canvas','canvas');
  //musica.play();
  this.canvas.canvas.style.boxShadow = "0px 0px 18px #90caf9";
}