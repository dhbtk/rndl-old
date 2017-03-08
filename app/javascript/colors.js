import Color from "color";

export function colorForSpeedHsl(speed) {
    const max = 120;
    const actualSpeed = speed > max ? max : speed;
    const h = (1.0 - speed/max) * 240;
    return `hsl(${h}, 100%, 50%)`;
}

export function colorForSpeed(speed) {
    const hsl = colorForSpeedHsl(speed);
    const rgbArray = Color(hsl).rgb().array();
    rgbArray.push(1); // opacity
    return rgbArray;
}
