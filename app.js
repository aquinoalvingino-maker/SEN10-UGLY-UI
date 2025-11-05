console.log("Welcome to the Ugly UI Page!");

// Example of a simple interactive element
document.querySelector('h1').addEventListener('click', function() {
    alert('You clicked the header!');
});

// New: eye-catching page-load animation (header glitch + canvas confetti)
window.addEventListener('load', function() {
    const header = document.querySelector('h1');
    if (header) {
        headerGlitch(header, 2500);
    }
    confettiBurst(3000);
});

function headerGlitch(el, duration = 2000) {
    const original = el.textContent;
    const colors = ['#ff3b3b', '#ffd23f', '#3bff9e', '#3b8bff'];
    let start = performance.now();
    const id = setInterval(() => {
        const now = performance.now();
        if (now - start > duration) {
            clearInterval(id);
            el.textContent = original;
            el.style.textShadow = '';
            return;
        }
        // quick random offset + colored shadow for a "glitch" feel
        const c = colors[Math.floor(Math.random() * colors.length)];
        const x = (Math.random() - 0.5) * 10;
        const y = (Math.random() - 0.5) * 10;
        el.style.textShadow = `${x}px ${y}px 6px ${c}, ${-x}px ${-y}px 6px rgba(0,0,0,0.2)`;
    }, 80);
}

function confettiBurst(duration = 2500) {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const DPR = window.devicePixelRatio || 1;
    function resize() {
        canvas.width = innerWidth * DPR;
        canvas.height = innerHeight * DPR;
        canvas.style.width = innerWidth + 'px';
        canvas.style.height = innerHeight + 'px';
        ctx.scale(DPR, DPR);
    }
    resize();
    addEventListener('resize', resize);

    const colors = ['#FF605C', '#FFBD44', '#00CA4E', '#3B82F6', '#A78BFA', 'orange', 'cyan'];
    const pieces = [];
    for (let i = 0; i < 80; i++) {
        pieces.push({
            x: Math.random() * innerWidth,
            y: -10 - Math.random() * 200,
            vx: (Math.random() - 0.5) * 6,
            vy: 2 + Math.random() * 6,
            r: 6 + Math.random() * 8,
            color: colors[Math.floor(Math.random() * colors.length)],
            rot: Math.random() * Math.PI * 2,
            vr: (Math.random() - 0.5) * 0.2,
            life: 1
        });
    }

    let start = performance.now();
    function draw(now) {
        const t = now - start;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let p of pieces) {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.06; // gravity
            p.rot += p.vr;
            p.life = 1 - Math.min((t / duration) * 1.2, 1);
            ctx.save();
            ctx.globalAlpha = Math.max(p.life, 0);
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.fillStyle = p.color;
            // small rounded rectangle as confetti
            ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
            ctx.restore();
        }
        if (t < duration + 600) {
            requestAnimationFrame(draw);
        } else {
            cleanup();
        }
    }
    function cleanup() {
        removeEventListener('resize', resize);
        if (canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
        }
    }
    requestAnimationFrame(draw);
}
