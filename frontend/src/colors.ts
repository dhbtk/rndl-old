import * as Color from "color";

export function colorForSpeedHsl(speed: number): string {
    const max = 120;
    const actualSpeed = speed > max ? max : speed;
    const h = (1.0 - speed/max) * 240;
    return `hsl(${h}, 100%, 50%)`;
}

export function colorForSpeed(speed: number): [number, number, number, number] {
    const hsl: string = colorForSpeedHsl(speed);
    const rgbArray: number[] = (Color(hsl) as any).rgb().array();
    rgbArray.push(1); // opacity
    return rgbArray as [number, number, number, number];
}
