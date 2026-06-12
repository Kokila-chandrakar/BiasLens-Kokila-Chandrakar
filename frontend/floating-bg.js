/**
 * BiasLens Premium 3D Background - CSS ONLY
 * Ultra-lightweight replacement for Three.js
 */

class FloatingBackground {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        // Setup container
        this.container.style.position = 'fixed';
        this.container.style.top = '0';
        this.container.style.left = '0';
        this.container.style.width = '100vw';
        this.container.style.height = '100vh';
        this.container.style.overflow = 'hidden';
        this.container.style.zIndex = '1';
        this.container.style.pointerEvents = 'none';
        this.container.style.contain = 'strict';

        this.init();
    }

    init() {
        // Inject styles
        if (!document.getElementById('css-orb-styles')) {
            const style = document.createElement('style');
            style.id = 'css-orb-styles';
            style.textContent = `
                .css-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(60px);
                    opacity: 0.5;
                    animation: float 20s infinite ease-in-out alternate;
                    will-change: transform;
                }
                @keyframes float {
                    0% { transform: translate(0, 0) scale(1); }
                    100% { transform: translate(var(--tx), var(--ty)) scale(1.5); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .css-orb { animation: none !important; }
                }
            `;
            document.head.appendChild(style);
        }

        // Create Orbs
        const colors = ['rgba(112, 0, 255, 0.4)', 'rgba(0, 245, 255, 0.4)', 'rgba(255, 0, 128, 0.3)'];
        for (let i = 0; i < 5; i++) {
            const orb = document.createElement('div');
            orb.className = 'css-orb';
            
            const size = Math.random() * 300 + 200;
            orb.style.width = `${size}px`;
            orb.style.height = `${size}px`;
            
            orb.style.background = colors[i % colors.length];
            orb.style.left = `${Math.random() * 100}vw`;
            orb.style.top = `${Math.random() * 100}vh`;
            
            // Random translation variables for keyframes
            orb.style.setProperty('--tx', `${(Math.random() - 0.5) * 400}px`);
            orb.style.setProperty('--ty', `${(Math.random() - 0.5) * 400}px`);
            
            orb.style.animationDelay = `-${Math.random() * 20}s`;
            orb.style.animationDuration = `${15 + Math.random() * 15}s`;

            this.container.appendChild(orb);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // If it's still a canvas, replace it with a div to support child elements
    let bg = document.getElementById('bg-canvas');
    if (bg && bg.tagName.toLowerCase() === 'canvas') {
        const div = document.createElement('div');
        div.id = 'bg-canvas';
        bg.parentNode.replaceChild(div, bg);
    }
    new FloatingBackground('bg-canvas');
});
