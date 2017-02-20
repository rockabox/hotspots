/// <reference path="../../typings/main/ambient/jasmine/jasmine.d.ts" />

import {Box} from '../../lib/quad-tree/box';
import {Point} from '../../lib/quad-tree/point';
import {Quadtree} from '../../lib/quad-tree/quad-tree';

describe('Quadtree', () => {
    let tree,
        maxRange;

    beforeEach(() => {
        maxRange = new Box(new Point(0, 0), new Point(100, 100));
        tree = new Quadtree(maxRange, 2);
    });

    describe('insert', () => {
        it('should not insert if a point is not within the max range', () => {
            tree.insert(new Point(101, 101));

            expect(tree.children).toBe(null);
            expect(tree.value.length).toBe(0);
        });

        it('should insert if a point is within the max range', () => {
            tree.insert(new Point(38, 38), 'point-1');

            expect(tree.children).toBe(null);
            expect(tree.value.length).toBe(1);
        });

        it('should set new value if a given point is the same as an existing one', () => {
            tree.insert(new Point(38, 38), 'point-1');
            tree.insert(new Point(38, 38), 'point-2');

            expect(tree.value[0].value = 'point-2');
        });

        it('should call subdivide into child quadrants if leaf nodes are larger than max', () => {
            spyOn(tree, 'subdivide').and.callThrough();

            tree.insert(new Point(31, 31), 'point-1');
            tree.insert(new Point(38, 38), 'point-2');
            tree.insert(new Point(58, 58), 'point-3');

            expect(tree.subdivide).toHaveBeenCalled();
            expect(tree.children.length).toBe(4);
            expect(tree.value.length).toBe(0);
        });
    });

    describe('removePoint', () => {
        let point1 = new Point(31, 31),
            point2 = new Point(38, 38);

        beforeEach(() => {
            tree.insert(point1, 'point-1');
            tree.insert(point2, 'point-2');
        });

        it('should not remove if a point is outside of max range', () => {
            tree.removePoint(new Point(101, 101));

            expect(tree.value.length).toBe(2);
        });

        it('should not remove anything if a point is within range but does not exist', () => {
            tree.removePoint(new Point(58, 58));

            expect(tree.value.length).toBe(2);
        });

        it('should remove if a point is within the max range', () => {
            tree.removePoint(point1);

            expect(tree.value.length).toBe(1);
            expect(tree.value[0].point).toBe(point2);
            expect(tree.value[0].value).toBe('point-2');
        });

        it('should remove from child nodes', () => {
            let tree0;

            tree.insert(new Point(58, 58), 'point-3');
            tree.insert(new Point(88, 88), 'point-4'); // Insert over max to subdivide

            tree0 = tree.children[0];

            expect(tree0.value.length).toBe(2); // Quadrant tree 0 contains point-1 point-2

            tree.removePoint(point1);

            expect(tree0.value.length).toBe(1); // Quadrant tree 0 contains point-1 point-2
            expect(tree0.value[0].value).toBe('point-2');
        });
    });

    describe('queryRange', () => {
        let point1 = new Point(31, 31),
            point2 = new Point(38, 38);

        beforeEach(() => {
            tree.insert(point1, 'point-1');
            tree.insert(point2, 'point-2');
        });

        it('should return no points when box lies outside of max range', () => {
            let boxB = new Box(new Point(101, 100), new Point(108, 108)),
                result;

            result = tree.queryRange(boxB);

            expect(result.length).toBe(0);
        });

        it('should return two points', () => {
            let boxB = new Box(new Point(90, 90), new Point(100, 100)),
                result;

            result = tree.queryRange(boxB);

            expect(result.length).toBe(0);
        });

        it('should return empty set of points when boxB has no points', () => {
            let boxB = new Box(new Point(30, 30), new Point(50, 50)),
                result;

            result = tree.queryRange(boxB);

            expect(result.length).toBe(2);
        });

        it('should query from child nodes when leaf nodes are larger than max', () => {
            let result;

            tree.insert(new Point(58, 58), 'point-3');
            tree.insert(new Point(88, 88), 'point-4'); // Insert over max to subdivide

            result = tree.queryRange(new Box(new Point(30, 30), new Point(50, 50)));

            expect(result.length).toBe(2);
            expect(result[0].value).toBe('point-1');
            expect(result[1].value).toBe('point-2');
        });
    });

    describe('queryPoint', () => {
        let point1 = new Point(31, 31),
            point2 = new Point(38, 38);

        beforeEach(() => {
            tree.insert(point1, 'point-1');
            tree.insert(point2, 'point-2');
        });

        it('should return null if no points exists', () => {
            let result,
                point3 = new Point(8, 8),
                tree0 = new Quadtree(maxRange, 1);

            result = tree0.queryPoint(point3);

            expect(result).toBe(null);
        });

        it('should return no points when point lies outside of max range', () => {
            let point3 = new Point(108, 108),
                result;

            result = tree.queryPoint(point3);

            expect(result).toBe(null);
        });

        it('should return one point when point exists', () => {
            let point3 = new Point(31, 31),
                result;

            result = tree.queryPoint(point3);

            expect(result).toBe('point-1');
        });

        it('should query from child nodes when leaf nodes are larger than max', () => {
            let result;

            tree.insert(new Point(58, 58), 'point-3');
            tree.insert(new Point(88, 88), 'point-4'); // Insert over max to subdivide

            result = tree.queryPoint(new Point(31, 31));

            expect(result).toBe('point-1');
        });
    });

    describe('clear', () => {
        it('should reset children and value', () => {
            tree.clear();

            expect(tree.children).toBe(null);
            expect(tree.value.length).toBe(0);
        });
    });
});
