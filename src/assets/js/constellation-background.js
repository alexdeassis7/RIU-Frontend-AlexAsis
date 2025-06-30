(function () {
    const canvas = document.getElementById("constellation-canvas");
    if (!canvas) return;
  
    const ctx = canvas.getContext("2d");
    const PARTICLE_COUNT = 150;
    const PARTICLE_RADIUS = 2;
    const PARTICLE_SPEED = 0.5;
    let particles = [];
  
    function generateParticles(w, h) {
      particles = Array.from({ length: PARTICLE_COUNT }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * PARTICLE_SPEED,
        vy: (Math.random() - 0.5) * PARTICLE_SPEED
      }));
    }
  
    function resizeCanvas() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      generateParticles(width, height);
    }
  
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
  
    function draw() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvas.width !== width || canvas.height !== height) {
        resizeCanvas();
      }
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  
        ctx.beginPath();
        ctx.arc(p.x, p.y, PARTICLE_RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = "#7e57c2";
        ctx.fill();
      });
  
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(126, 87, 194, ${1 - dist / 120})`;
            ctx.stroke();
          }
        }
      }
  
      requestAnimationFrame(draw);
    }
  
    draw();
  })();
  