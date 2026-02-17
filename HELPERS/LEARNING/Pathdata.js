var trackers = [];       // [{points, dots:[{el,index,speed}]}]
var tickInterval = 30;   // ms per tick
var DELTA = 2;           // spacing threshold between sampled points

// --------------------------
// Path Parser + Math (unchanged)
// --------------------------

function parsePath(d){
  var cmdRe = /([MLHVCAQZmlhvcaqz])([^MLHVCAQZmlhvcaqz]*)/g, match;
  var segments = [];
  while ((match = cmdRe.exec(d)) !== null){
    var cmd = match[1];
    var params = match[2].trim().split(/[\s,]+/).filter(Boolean).map(parseFloat);
    segments.push({cmd:cmd, params:params}); // keep case
  }
  return segments;
}

function linePoints(x1,y1,x2,y2){
  var pts=[],steps=Math.max(Math.abs(x2-x1),Math.abs(y2-y1));
  for(var i=0;i<=steps;i++){
    var t=i/steps;
    pts.push({x:x1+(x2-x1)*t, y:y1+(y2-y1)*t});
  }
  return pts;
}

function cubicPoints(x0,y0,x1,y1,x2,y2,x3,y3){
  var pts=[],steps=30;
  for(var i=0;i<=steps;i++){
    var t=i/steps,u=1-t;
    var x=u*u*u*x0+3*u*u*t*x1+3*u*t*t*x2+t*t*t*x3;
    var y=u*u*u*y0+3*u*u*t*y1+3*u*t*t*y2+t*t*t*y3;
    pts.push({x:x,y:y});
  }
  return pts;
}

function quadraticPoints(x0,y0,x1,y1,x2,y2){
  var pts=[],steps=30;
  for(var i=0;i<=steps;i++){
    var t=i/steps,u=1-t;
    var x=u*u*x0+2*u*t*x1+t*t*x2;
    var y=u*u*y0+2*u*t*y1+t*t*y2;
    pts.push({x:x,y:y});
  }
  return pts;
}

// Arc support
function arcPoints(x0,y0,rx,ry,phi,largeArc,sweep,x1,y1){
  var pts=[];
  var rad = phi*Math.PI/180;
  var dx=(x0-x1)/2, dy=(y0-y1)/2;
  var x1p=Math.cos(rad)*dx+Math.sin(rad)*dy;
  var y1p=-Math.sin(rad)*dx+Math.cos(rad)*dy;
  var lam=(x1p*x1p)/(rx*rx)+(y1p*y1p)/(ry*ry);
  if(lam>1){ var s=Math.sqrt(lam); rx*=s; ry*=s; }
  var sign=(largeArc==sweep)?-1:1;
  var num=rx*rx*ry*ry - rx*rx*y1p*y1p - ry*ry*x1p*x1p;
  var den=rx*rx*y1p*y1p+ry*ry*x1p*x1p;
  var c=Math.sqrt(Math.max(0,num/den))*sign;
  var cxp=c*rx*y1p/ry;
  var cyp=-c*ry*x1p/rx;
  var cx=Math.cos(rad)*cxp-Math.sin(rad)*cyp+(x0+x1)/2;
  var cy=Math.sin(rad)*cxp+Math.cos(rad)*cyp+(y0+y1)/2;
  function angle(u,v){
    var d=(u.x*v.x+u.y*v.y)/(Math.sqrt(u.x*u.x+u.y*u.y)*Math.sqrt(v.x*v.x+v.y*v.y));
    return (Math.acos(Math.max(-1,Math.min(1,d))));
  }
  var v1={x:(x1p-cxp)/rx,y:(y1p-cyp)/ry};
  var v2={x:(-x1p-cxp)/rx,y:(-y1p-cyp)/ry};
  var theta=angle({x:1,y:0},v1);
  if(v1.y<0) theta=-theta;
  var delta=angle(v1,v2);
  if(!sweep && delta>0) delta-=2*Math.PI;
  if(sweep && delta<0) delta+=2*Math.PI;
  var steps=30;
  for(var i=0;i<=steps;i++){
    var t=theta+delta*(i/steps);
    var x=cx+rx*Math.cos(rad)*Math.cos(t)-ry*Math.sin(rad)*Math.sin(t);
    var y=cy+rx*Math.sin(rad)*Math.cos(t)+ry*Math.cos(rad)*Math.sin(t);
    pts.push({x:x,y:y});
  }
  return pts;
}

function dist(p1,p2){ return Math.sqrt((p1.x-p2.x)**2+(p1.y-p2.y)**2); }
function angle(p1,p2){ return Math.atan2(p2.y-p1.y,p2.x-p1.x)*180/Math.PI; }

function filterPoints(pts){
  var out=[pts[0]], last=pts[0];
  for(var i=1;i<pts.length;i++){
    if(dist(last,pts[i])>=DELTA){
      out.push(pts[i]);
      last=pts[i];
    }
  }
  return out;
}

function getPointsPath(pathData){
  var segs=parsePath(pathData);
  var x=0,y=0,pts=[];
  var startX=0,startY=0;
  for(var s=0;s<segs.length;s++){
    var seg=segs[s], p=seg.params;
    switch(seg.cmd){
      case 'M': x=p[0]; y=p[1]; startX=x; startY=y; pts.push({x:x,y:y}); break;
      case 'm': x+=p[0]; y+=p[1]; startX=x; startY=y; pts.push({x:x,y:y}); break;
      case 'L': pts=pts.concat(linePoints(x,y,p[0],p[1])); x=p[0]; y=p[1]; break;
      case 'l': pts=pts.concat(linePoints(x,y,x+p[0],y+p[1])); x+=p[0]; y+=p[1]; break;
      case 'H': pts=pts.concat(linePoints(x,y,p[0],y)); x=p[0]; break;
      case 'h': pts=pts.concat(linePoints(x,y,x+p[0],y)); x+=p[0]; break;
      case 'V': pts=pts.concat(linePoints(x,y,x,p[0])); y=p[0]; break;
      case 'v': pts=pts.concat(linePoints(x,y,x,y+p[0])); y+=p[0]; break;
      case 'C': pts=pts.concat(cubicPoints(x,y,p[0],p[1],p[2],p[3],p[4],p[5])); x=p[4]; y=p[5]; break;
      case 'c': pts=pts.concat(cubicPoints(x,y,x+p[0],y+p[1],x+p[2],y+p[3],x+p[4],y+p[5])); x+=p[4]; y+=p[5]; break;
      case 'Q': pts=pts.concat(quadraticPoints(x,y,p[0],p[1],p[2],p[3])); x=p[2]; y=p[3]; break;
      case 'q': pts=pts.concat(quadraticPoints(x,y,x+p[0],y+p[1],x+p[2],y+p[3])); x+=p[2]; y+=p[3]; break;
      case 'A': pts=pts.concat(arcPoints(x,y,p[0],p[1],p[2],p[3],p[4],p[5],p[6])); x=p[5]; y=p[6]; break;
      case 'a': pts=pts.concat(arcPoints(x,y,p[0],p[1],p[2],p[3],p[4],x+p[5],y+p[6])); x+=p[5]; y+=p[6]; break;
      case 'Z': case 'z': pts=pts.concat(linePoints(x,y,startX,startY)); x=startX; y=startY; break;
    }
  }
  pts=filterPoints(pts);
  for(var i=0;i<pts.length-1;i++){ pts[i].angle=angle(pts[i],pts[i+1]); }
  pts[pts.length-1].angle=pts[pts.length-2].angle;
  return pts;
}

// --------------------------
// Multi-path / Multi-dot system
// --------------------------

function addTracker(pathId, dotDefs){
  var pathEl = document.getElementById(pathId);
  var pts    = getPointsPath(pathEl.getAttribute("PathData"));
  var dotObjs = [];
  for(var i=0;i<dotDefs.length;i++){
    var d = dotDefs[i];
    var el = document.getElementById(d.id);
    dotObjs.push({el:el, index:d.start, speed:d.speed});
  }
  trackers.push({points:pts, dots:dotObjs});
}

function OnLoad(evt){
  // Path 1 with two dots
  addTracker("FlowPath1", [
    {id:"Dot1", start:0,   speed:-2},
    {id:"Dot2", start:1000,  speed:-2},
    {id:"Dot3", start:2000,  speed:-2},
    {id:"Dot4", start:3000,   speed:-2},
    {id:"Dot5", start:4000,  speed:-2},
    {id:"Dot6", start:5000, speed:-2},
    {id:"Dot7", start:6000,   speed:-2},
    {id:"Dot8", start:7000,  speed:-2},
    {id:"Dot9", start:8000, speed:-2},
  ]);

  
  

  setInterval(tick, tickInterval);
}

function tick(){
  for(var t=0;t<trackers.length;t++){
    var tr = trackers[t];
    if(tr.points.length==0) continue;

    for(var k=0;k<tr.dots.length;k++){
      var d = tr.dots[k];
      d.index = (d.index + d.speed) % tr.points.length;
      if(d.index < 0) d.index += tr.points.length;

      var pt = tr.points[Math.floor(d.index)];
      d.el.setAttribute("Left", pt.x - d.el.getAttribute("Width")/2);
      d.el.setAttribute("Top",  pt.y - d.el.getAttribute("Height")/2);
      d.el.setAttribute("Visibility","Visible");
    }
  }
}
