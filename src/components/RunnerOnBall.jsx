import React, { useEffect, useRef } from 'react';

// Stylized animated boy running on a rotating ball (pseudo-3D canvas)
export default function RunnerOnBall({ className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let raf;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    function resize() {
      const { clientWidth, clientHeight } = canvas;
      canvas.width = clientWidth * DPR;
      canvas.height = clientHeight * DPR;
    }
    resize();
    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    const ball = { r: 70 * DPR, x: 160 * DPR, y: 140 * DPR, rot: 0 };

    function drawBall() {
      // base sphere
      const grd = ctx.createRadialGradient(
        ball.x - ball.r * 0.4,
        ball.y - ball.r * 0.4,
        ball.r * 0.2,
        ball.x,
        ball.y,
        ball.r
      );
      grd.addColorStop(0, '#7dd3fc');
      grd.addColorStop(1, '#0ea5e9');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();

      // band lines to simulate rotation
      ctx.save();
      ctx.translate(ball.x, ball.y);
      ctx.rotate(ball.rot);
      ctx.strokeStyle = 'rgba(255,255,255,0.6)';
      ctx.lineWidth = 2 * DPR;
      for (let i = -2; i <= 2; i++) {
        ctx.beginPath();
        ctx.ellipse(0, 0, ball.r * 0.95, ball.r * 0.35 + i * 3 * DPR, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // subtle shadow
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath();
      ctx.ellipse(ball.x, ball.y + ball.r * 0.9, ball.r * 0.9, ball.r * 0.25, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawRunner(t) {
      // simple figure running on top of ball
      const baseX = ball.x;
      const baseY = ball.y - ball.r - 6 * DPR;
      const stride = Math.sin(t * 0.005) * 0.8;

      // body
      ctx.strokeStyle = '#0ea5e9';
      ctx.lineWidth = 4 * DPR;
      ctx.lineCap = 'round';

      // torso
      ctx.beginPath();
      ctx.moveTo(baseX, baseY - 12 * DPR);
      ctx.lineTo(baseX, baseY - 40 * DPR);
      ctx.stroke();

      // head
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.arc(baseX, baseY - 52 * DPR, 8 * DPR, 0, Math.PI * 2);
      ctx.fill();

      // arms
      ctx.beginPath();
      ctx.moveTo(baseX, baseY - 30 * DPR);
      ctx.lineTo(baseX + 16 * DPR, baseY - 26 * DPR);
      ctx.moveTo(baseX, baseY - 30 * DPR);
      ctx.lineTo(baseX - 16 * DPR, baseY - 26 * DPR);
      ctx.stroke();

      // legs (animated)
      const legA = -0.8 + stride; // front
      const legB = 0.8 + -stride; // back
      const len = 24 * DPR;
      function leg(angle) {
        const x1 = baseX;
        const y1 = baseY - 12 * DPR;
        const x2 = x1 + Math.cos(angle) * len;
        const y2 = y1 + Math.sin(angle) * len;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      leg(legA);
      leg(legB);

      // shoe dots
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(baseX + Math.cos(legA) * len, baseY - 12 * DPR + Math.sin(legA) * len, 3 * DPR, 0, Math.PI * 2);
      ctx.arc(baseX + Math.cos(legB) * len, baseY - 12 * DPR + Math.sin(legB) * len, 3 * DPR, 0, Math.PI * 2);
      ctx.fill();
    }

    function loop(t) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // background
      const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bg.addColorStop(0, 'rgba(2,6,23,0.0)');
      bg.addColorStop(1, 'rgba(2,6,23,0.2)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // spin the ball based on time
      ball.rot = (t * 0.003) % (Math.PI * 2);
      drawBall();
      drawRunner(t);

      raf = requestAnimationFrame(loop);
    }

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className={"w-full max-w-md aspect-[4/3] mx-auto " + className}>
      <canvas ref={ref} className="w-full h-full" />
    </div>
  );
}
