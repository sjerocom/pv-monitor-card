/**
 * Generiert CSS-Styles für die rotierende Punkte-Animation
 * @param color Farbe der Animation
 * @param duration Animationsdauer in Sekunden
 * @returns CSS-Style-String
 */
export function getRotatingDotsStyle(color: string, duration: number): string {
    return `
        position: absolute;
        top: -50%;
        left: -50%;
        right: -50%;
        bottom: -50%;
        border-radius: 50%;
        background: conic-gradient(
            rgba(0,0,0,0.2) 30deg,
            ${color} 88deg,
            rgba(255,255,255,1) 90deg,
            ${color} 92deg,
            rgba(0,0,0,0.2) 94deg,
            rgba(0,0,0,0.2) 160deg,
            ${color} 208deg,
            rgba(255,255,255,1) 210deg,
            ${color} 212deg,
            rgba(0,0,0,0.2) 214deg,
            rgba(0,0,0,0.2) 280deg,
            ${color} 328deg,
            rgba(255,255,255,1) 330deg,
            ${color} 332deg,
            rgba(0,0,0,0.2) 334deg,
            rgba(0,0,0,0.2) 360deg
        );
        animation: spin ${duration}s linear infinite;
        z-index: 0;
    `;
}

/**
 * Generiert CSS-Styles für die Partikel-Feld-Animation
 * @param color Farbe der Animation
 * @param duration Animationsdauer in Sekunden
 * @returns CSS-Style-String
 */
export function getParticleFieldStyle(color: string, duration: number): string {
    const opaqueColor = color.replace(/[\d.]+\)$/, '1)');

    return `
        position: absolute;
        top: -50%;
        left: -50%;
        right: -50%;
        bottom: -50%;
        border-radius: 50%;
        background: 
            radial-gradient(circle at 20% 30%, ${opaqueColor} 3px, transparent 3px),
            radial-gradient(circle at 60% 70%, ${opaqueColor} 4px, transparent 4px),
            radial-gradient(circle at 80% 20%, ${opaqueColor} 3px, transparent 3px),
            radial-gradient(circle at 30% 80%, ${opaqueColor} 3.5px, transparent 3.5px),
            radial-gradient(circle at 90% 60%, ${opaqueColor} 3px, transparent 3px),
            radial-gradient(circle at 15% 60%, ${opaqueColor} 4px, transparent 4px),
            radial-gradient(circle at 70% 40%, ${opaqueColor} 3px, transparent 3px),
            radial-gradient(circle at 40% 15%, ${opaqueColor} 3.5px, transparent 3.5px),
            radial-gradient(circle at 50% 50%, ${opaqueColor} 4px, transparent 4px),
            radial-gradient(circle at 25% 55%, ${opaqueColor} 3px, transparent 3px),
            radial-gradient(circle at 75% 65%, ${opaqueColor} 3.5px, transparent 3.5px),
            radial-gradient(circle at 85% 45%, ${opaqueColor} 3px, transparent 3px);
        background-size: 100% 100%;
        animation: particleFloat ${duration}s ease-in-out infinite;
        z-index: 0;
        opacity: 0.9;
    `;
}

/**
 * Generiert CSS-Styles für die elektrische Bogen-Animation
 * @param color Farbe der Animation
 * @param duration Animationsdauer in Sekunden
 * @returns CSS-Style-String
 */
export function getElectricArcStyle(color: string, duration: number): string {
    const brightColor = color.replace(/[\d.]+\)$/, '1)');
    const mediumColor = color.replace(/[\d.]+\)$/, '0.7)');
    const dimColor = color.replace(/[\d.]+\)$/, '0.3)');

    return `
        position: absolute;
        top: -50%;
        left: -50%;
        right: -50%;
        bottom: -50%;
        border-radius: 50%;
        background: 
            conic-gradient(
                from 0deg,
                transparent 0deg,
                ${dimColor} 1deg,
                ${brightColor} 3deg,
                ${mediumColor} 5deg,
                transparent 7deg,
                transparent 43deg,
                ${dimColor} 44deg,
                ${brightColor} 46deg,
                ${mediumColor} 48deg,
                transparent 50deg,
                transparent 88deg,
                ${dimColor} 89deg,
                ${brightColor} 91deg,
                ${mediumColor} 93deg,
                transparent 95deg,
                transparent 133deg,
                ${dimColor} 134deg,
                ${brightColor} 136deg,
                ${mediumColor} 138deg,
                transparent 140deg,
                transparent 178deg,
                ${dimColor} 179deg,
                ${brightColor} 181deg,
                ${mediumColor} 183deg,
                transparent 185deg,
                transparent 223deg,
                ${dimColor} 224deg,
                ${brightColor} 226deg,
                ${mediumColor} 228deg,
                transparent 230deg,
                transparent 268deg,
                ${dimColor} 269deg,
                ${brightColor} 271deg,
                ${mediumColor} 273deg,
                transparent 275deg,
                transparent 313deg,
                ${dimColor} 314deg,
                ${brightColor} 316deg,
                ${mediumColor} 318deg,
                transparent 320deg,
                transparent 360deg
            );
        animation: electricPulse ${duration}s ease-in-out infinite;
        z-index: 0;
    `;
}
