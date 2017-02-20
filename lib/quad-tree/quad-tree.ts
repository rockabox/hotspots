import {Box} from './box';
import {Point} from './point';

export class Quadtree {

    children = null;
    value = [];

    constructor (public box: Box, public max: number) {}
    insert (point, object) {
        // check if should contain point
        if (!this.box.contains(point)) {
            return this;
        }

        // if is a leaf node and not full, then insert
        // need to check if it already exists though
        let i;
        if (this.children === null && this.value.length < this.max) {
            for (i = 0; i < this.value.length; i++) {
                if (this.value[i].point.equals(point)) {
                    this.value[i].value = object;
                    return;
                }
            }
            this.value.push({ point: point, value: object });
            return this;
        }

        // if is a leaf node but full, call subdivide
        if (this.children === null) {
            this.subdivide();
        }

        // if is not a leaf node, call insert on child nodes
        for (i = 0; i < this.children.length; i++) {
            this.children[i].insert(point, object);
        }
        this.value = [];
        return this;
    }
    subdivide () {
        let i;
        // use box quadrant method to create 4 new equal child quadrants
        this.children = this.box.split();

        for (i = 0; i < this.children.length; i++) {
            this.children[i] = new Quadtree(this.children[i], this.max);
        }

        // try inserting each value into the new child nodes
        for (i = 0; i < this.value.length; i++) {
            for (let k = 0; k < this.children.length; k++) {
                this.children[k].insert(this.value[i].point, this.value[i].value);
            }
        }
    }
    queryRange (box) {
        // return all point/value pairs contained in range
        let result = [];
        this._queryRangeRec(box, result);
        return result;
    }
    _queryRangeRec (box, result) {
        // if query area doesn't overlap this box then return
        if (!this.box.overlaps(box)) {
            return;
        }

        // if leaf node with contained value(s), then check against contained objects
        let i;

        if (this.value.length > 0) {
            for (i = 0; i < this.value.length; i++) {
                let value = this.value[i].point,
                    high = new Point(value.x + box.width, value.y + box.height);

                if (box.contains(this.value[i].point) || box.contains(high)) {
                    result.push(this.value[i]);
                }
            }
            return;
        }

        // if has children, then make recursive call on children
        if (this.children !== null) {
            for (i = 0; i < this.children.length; i++) {
                this.children[i]._queryRangeRec(box, result);
            }
            return;
        }
    }
    queryPoint (point) {
        // return value if tree contains point
        if (!this.box.contains(point)) {
            return null;
        }

        if (this.value.length > 0) {
            for (let i = 0; i < this.value.length; i++) {
                if (this.value[i].point.equals(point)) {
                    return this.value[i].value;
                }
            }
        }

        if (this.children !== null) {
            let val = null;
            for (let i = 0; i < this.children.length; i++) {
                val = val || this.children[i].queryPoint(point);
            }
            return val;
        }
        return null;
    }
    removePoint (point) {
        // return if tree doesn't contain point
        if (!this.box.contains(point)) {
            return;
        }

        let i;

        if (this.value.length > 0) {
            for (i = 0; i < this.value.length; i++) {
                if (this.value[i].point.equals(point)) {
                    this.value.splice(i, 1);
                    return;
                }
            }
            return; // didn't contain point and is leaf node
        }

        if (this.children !== null) {
            for (i = 0; i < this.children.length; i++) {
                this.children[i].removePoint(point);
            }
        }
        return;
    }
    clear () {
        this.children = null;
        this.value = [];
    }
}
