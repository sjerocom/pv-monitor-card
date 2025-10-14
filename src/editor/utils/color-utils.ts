export function convertToHex(color: string): string {
    if (!color) return '#ffffff';

    if (color.startsWith('#')) {
        return color.length === 7 ? color : '#ffffff';
    }

    if (color.startsWith('rgba') || color.startsWith('rgb')) {
        const match = color.match(/\d+/g);
        if (match && match.length >= 3) {
            const r = parseInt(match[0]);
            const g = parseInt(match[1]);
            const b = parseInt(match[2]);
            return '#' + [r, g, b].map(x => {
                const hex = x.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            }).join('');
        }
    }

    return '#ffffff';
}