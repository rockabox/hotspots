export class Point {
    constructor (public x: number, public y: number) {}
    equals (point: Point) {
        return (this.x === point.x  && this.y === point.y);
    }
    gte (point: Point) {
        if (this.x >= point.x && this.y >= point.y) {
            return true;
        }
        return false;
    }
    lte (point: Point) {
        if (this.x <= point.x && this.y <= point.y) {
            return true;
        }
        return false;
    }
}
