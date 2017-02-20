interface Bounds {
    top: number;
    left: number;
    width: number;
    height: number;
}

export class Point {
    'use strict';

    x: number;
    y: number;

    constructor (x, y) {
        this.x = x;
        this.y = y;
    }

    closestEdge (rect: Bounds, offset: number): Point {
        let test: Array<any> = [
                this.y - rect.top,
                rect.left + rect.width - this.x,
                rect.top + rect.height - this.y,
                this.x - rect.left
            ],
            lowest = 0;

        for (let i = 1; i < test.length; i++) {
            if (test[i] < test[lowest]) { lowest = i; }
        }

        return [
            new Point(this.x, rect.top - offset),
            new Point(rect.left + rect.width + offset, this.y),
            new Point(this.x, rect.top + rect.height + offset),
            new Point(rect.left - offset, this.y)
        ][lowest];
    };
}
