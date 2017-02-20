import {Point} from './point';

export class Box {

    height: number;
    width: number;

    constructor (public low: Point, public high: Point) {
        this.height = Math.abs(high.y - low.y);
        this.width = Math.abs(high.x - low.x);
    }
    contains (point: Point) {
        if (this.low.lte(point) && this.high.gte(point)) {
            return true;
        }
        return false;
    }
    overlaps (box: Box) {
        if (this.high.x <= box.low.x) return false; // a is left of b
        if (this.low.x >= box.high.x) return false; // a is right of b
        if (this.high.y <= box.low.y) return false; // a is above b
        if (this.low.y >= box.high.y) return false; // a is below b

        return true;
    }
    containsBox (box: Box) {
        return this.contains(box.low) && this.contains(box.high);
    }
    split () {
        let result = [];

        result.push(
            new Box(this.low, new Point((this.low.x + this.high.x) / 2, (this.low.y + this.high.y) / 2)));

        result.push(new Box(new Point((this.low.x + this.high.x) / 2, this.low.y),
                    new Point(this.high.x, (this.low.y + this.high.y) / 2)));

        result.push(new Box(new Point((this.low.x + this.high.x) / 2, (this.low.y + this.high.y) / 2), this.high));

        result.push(new Box(new Point(this.low.x, (this.low.y + this.high.y) / 2),
                    new Point((this.low.x + this.high.x) / 2, this.high.y)));

        return result;
    }
}
