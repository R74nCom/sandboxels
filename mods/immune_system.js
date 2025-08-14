<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Immune System with Veins</title>
<style>
  body { margin: 0; background: #111; overflow: hidden; }
  canvas { display: block; margin: 0 auto; background: #222; }
</style>
</head>
<body>
<canvas id="canvas"></canvas>

<script>
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
resize();
window.addEventListener('resize', resize);

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Utility for random between min and max
function randRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Simple Vein class as line segments
class Vein {
  constructor(startX, startY, endX, endY) {
    this.start = {x: startX, y: startY};
    this.end = {x: endX, y: endY};
  }

  draw() {
    ctx.strokeStyle = '#3A8DFF';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
  }

  // Get closest point on this vein segment to a point (x,y)
  closestPoint(x, y) {
    const ax = this.start.x;
    const ay = this.start.y;
    const bx = this.end.x;
    const by = this.end.y;
    const apx = x - ax;
    const apy = y - ay;
    const abx = bx - ax;
    const aby = by - ay;
    const abLenSq = abx*abx + aby*aby;
    const dot = apx*abx + apy*aby;
    let t = dot / abLenSq;
    t = Math.max(0, Math.min(1, t)); // clamp between 0 and 1
    return { x: ax + abx * t, y: ay + aby * t };
  }
}

const veins = [
// Main vein vertical center
new Vein(canvas.width/2, 0, canvas.width/2, canvas.height),
// A few branches
new Vein(canvas.width/2, canvas.height/3, canvas.width/4, canvas.height/2),
new Vein(canvas.width/2, canvas.height/2, canvas.width*0.75, canvas.height*0.6),
new Vein(canvas.width/2, canvas.height*0.75, canvas.width*0.6, canvas.height*0.9),
];

// Base Cell class - moves along veins
class Cell {
  constructor(x, y, type = 'immune') {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = randRange(10, 20);
    this.type = type;
    this.color = (type === 'immune') ? 'rgba(0,200,255,0.7)' : 'rgba(255,50,50,0.7)';
    this.evolutionStage = 1;
    this.age = 0;
    this.hidden = false;
    this.targetVein = null; // Vein segment this cell follows
  }

  move() {
    // If no target vein, assign nearest
    if(!this.targetVein) {
      this.targetVein = veins.reduce((closest, vein) => {
        const cp = vein.closestPoint(this.x, this.y);
        const dist = Math.hypot(cp.x - this.x, cp.y - this.y);
        if(!closest || dist < closest.dist) {
          return { vein, cp, dist };
        }
        return closest;
      }, null).vein;
    }

    // Move towards closest point on vein smoothly
    const cp = this.targetVein.closestPoint(this.x, this.y);
    let dx = cp.x - this.x;
    let dy = cp.y - this.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if(dist > 1) {
      dx /= dist;
      dy /= dist;
      // Fluid-like velocity changes
      this.vx += dx * 0.1 + randRange(-0.05, 0.05);
      this.vy += dy * 0.1 + randRange(-0.05, 0.05);

      // Limit velocity
      this.vx = Math.max(Math.min(this.vx, 2), -2);
      this.vy = Math.max(Math.min(this.vy, 2), -2);

      this.x += this.vx;
      this.y += this.vy;
    } else {
      // Close enough - small random jitter
      this.vx += randRange(-0.1, 0.1);
      this.vy += randRange(-0.1, 0.1);
      this.x += this.vx;
      this.y += this.vy;
    }

    // Age & evolution growth
    this.age++;
    if(this.age % 300 === 0 && this.radius < 40) {
      this.radius += 2;
      this.evolutionStage++;
      if(Math.random() < 0.1) this.hidden = true;
    }
  }

  draw() {
    const gradient = ctx.createRadialGradient(this.x, this.y, this.radius * 0.2, this.x, this.y, this.radius);
    gradient.addColorStop(0, this.color.replace('0.7', '1'));
    gradient.addColorStop(1, this.color.replace('0.7', '0.1'));
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.radius * (1 + Math.sin(this.age * 0.05)*0.2), this.radius * (1 + Math.cos(this.age * 0.05)*0.2), 0, 0, Math.PI * 2);
    ctx.fill();

    if(this.hidden) {
      ctx.strokeStyle = 'gold';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, this.radius * 1.1, this.radius * 1.1, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  interact(cells) {
    if(this.type === 'cancer') {
      cells.forEach(c => {
        if(c.type === 'immune') {
          let dx = this.x - c.x;
          let dy = this.y - c.y;
          let dist = Math.sqrt(dx*dx + dy*dy);
          if(dist < this.radius + c.radius) {
            c.radius -= 0.3;
            this.radius -= 0.1;
            if(c.radius < 5) c.radius = 5;
            if(this.radius < 5) this.radius = 5;
          }
        }
      });
    }
  }
}

const cells = [];
for(let i=0; i<20; i++) {
  cells.push(new Cell(randRange(canvas.width/2-100, canvas.width/2+100), randRange(canvas.height/2-100, canvas.height/2+100), 'immune'));
}
for(let i=0; i<10; i++) {
  cells.push(new Cell(randRange(canvas.width/2-100, canvas.width/2+100), randRange(canvas.height/2-100, canvas.height/2+100), 'cancer'));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw veins
  veins.forEach(vein => vein.draw());

  // Move and draw cells
  cells.forEach(cell => {
    cell.move();
  });

  cells.forEach(cell => {
    cell.interact(cells);
  });

  cells.forEach(cell => {
    cell.draw();
  });

  requestAnimationFrame(animate);
}

animate();
</script>

</body>
</html>
