import { useEffect, useRef } from 'react'

// ─── Petal ─────────────────────────────────────────────────────────────────
function Petal(W,H){this.W=W;this.H=H;this.reset(true)}
Petal.prototype.reset=function(init){
  this.x=Math.random()*this.W;this.y=init?Math.random()*this.H:-20
  this.size=4+Math.random()*7;this.vy=0.35+Math.random()*0.85
  this.vx=(Math.random()-0.5)*0.5;this.angle=Math.random()*Math.PI*2
  this.spin=(Math.random()-0.5)*0.032
  var c=['rgba(242,207,196,','rgba(232,180,184,','rgba(212,204,232,','rgba(247,223,192,','rgba(210,228,208,']
  this.color=c[Math.floor(Math.random()*c.length)];this.alpha=0.38+Math.random()*0.28
}
Petal.prototype.update=function(){
  this.y+=this.vy;this.x+=this.vx+Math.sin(this.y*0.018)*0.36;this.angle+=this.spin
  if(this.y>this.H+20)this.reset(false)
}
Petal.prototype.draw=function(ctx){
  ctx.save();ctx.translate(this.x,this.y);ctx.rotate(this.angle)
  ctx.beginPath();ctx.ellipse(0,0,this.size*0.42,this.size,0,0,Math.PI*2)
  ctx.fillStyle=this.color+this.alpha+')';ctx.fill();ctx.restore()
}

// ─── Confetti ──────────────────────────────────────────────────────────────
function Confetti(W,H){this.W=W;this.H=H;this.reset(true)}
Confetti.prototype.reset=function(init){
  this.x=Math.random()*this.W;this.y=init?Math.random()*this.H:-16
  this.w=4+Math.random()*6;this.h=3+Math.random()*3
  this.vy=0.45+Math.random()*1.1;this.vx=(Math.random()-0.5)*0.7
  this.angle=Math.random()*Math.PI*2;this.spin=(Math.random()-0.5)*0.055
  this.wob=Math.random()*Math.PI*2;this.wobSpd=0.038+Math.random()*0.038
  this.shape=Math.floor(Math.random()*3)
  var p=['rgba(242,207,196,','rgba(232,180,184,','rgba(212,204,232,','rgba(247,223,192,','rgba(201,168,76,']
  this.color=p[Math.floor(Math.random()*p.length)];this.alpha=0.50+Math.random()*0.32
}
Confetti.prototype.update=function(){
  this.y+=this.vy;this.wob+=this.wobSpd;this.x+=this.vx+Math.sin(this.wob)*0.52;this.angle+=this.spin
  if(this.y>this.H+20)this.reset(false)
}
Confetti.prototype.draw=function(ctx){
  ctx.save();ctx.translate(this.x,this.y);ctx.rotate(this.angle)
  var a=this.alpha*Math.abs(Math.cos(this.wob*0.5))
  ctx.fillStyle=this.color+a+')'
  if(this.shape===0){ctx.fillRect(-this.w/2,-this.h/2,this.w,this.h)}
  else if(this.shape===1){ctx.beginPath();ctx.ellipse(0,0,this.w/2,this.h/2,0,0,Math.PI*2);ctx.fill()}
  else{ctx.beginPath();ctx.moveTo(0,-this.h);ctx.lineTo(this.w/2,0);ctx.lineTo(0,this.h);ctx.lineTo(-this.w/2,0);ctx.closePath();ctx.fill()}
  ctx.restore()
}

// ─── Hook ──────────────────────────────────────────────────────────────────
export function useParticles(canvasRef){
  const pageRef=useRef(0)

  useEffect(()=>{
    const canvas=canvasRef.current;if(!canvas)return
    const ctx=canvas.getContext('2d');let W,H,raf
    function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
    resize();window.addEventListener('resize',resize)

    var petals=[];for(var i=0;i<14;i++)petals.push(new Petal(W,H))
    var confetti=[];for(var j=0;j<65;j++)confetti.push(new Confetti(W,H))

    function loop(){
      var pg=pageRef.current
      petals.forEach(function(p){p.W=W;p.H=H})
      confetti.forEach(function(c){c.W=W;c.H=H})

      ctx.clearRect(0,0,W,H)

      // Petale și confetti pe toate paginile
      petals.forEach(function(p){p.update();p.draw(ctx)})
      confetti.forEach(function(c){c.update();c.draw(ctx)})


      raf=requestAnimationFrame(loop)
    }
    loop()
    return function(){cancelAnimationFrame(raf);window.removeEventListener('resize',resize)}
  },[canvasRef])

  return pageRef
}
