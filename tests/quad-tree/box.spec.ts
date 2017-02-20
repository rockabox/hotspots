/// <reference path="../../typings/main/ambient/jasmine/jasmine.d.ts" />

import {Box} from '../../lib/quad-tree/box';
import {Point} from '../../lib/quad-tree/point';

describe('Box', () => {
    let boxA;

    beforeEach(() => {
        boxA = new Box(new Point(10, 20), new Point(98, 108));
    });

    describe('on instantiation', () => {
        it('should calculate the correct width', () => {
            expect(boxA.width).toBe(88);
        });

        it('should calculate the correct height', () => {
            expect(boxA.height).toBe(88);
        });
    });

    describe('contains', () => {
        it('should return true if a box contains a given Point', () => {
            expect(boxA.contains(new Point(55, 55))).toBe(true);
        });

        it('should return false if a box does not contain a given Point', () => {
            expect(boxA.contains(new Point(1, 10))).toBe(false);
        });
    });

    describe('overlaps', () => {
        it('should return false if the boxA right side is less than boxB left side', () => {
            let boxB = new Box(new Point(98, 0), new Point(120, 55));

            expect(boxA.overlaps(boxB)).toBe(false);
        });

        it('should return false if a boxA left side is larger than boxB right side', () => {
            let boxB = new Box(new Point(0, 0), new Point(10, 10));

            expect(boxA.overlaps(boxB)).toBe(false);
        });

        it('should return false if a boxA bottom is less than boxB top side', () => {
            let boxB = new Box(new Point(10, 109), new Point(98, 209));

            expect(boxA.overlaps(boxB)).toBe(false);
        });

        it('should return false if a boxA top is larger than boxB bottom side', () => {
            let boxB = new Box(new Point(10, 0), new Point(98, 19));

            expect(boxA.overlaps(boxB)).toBe(false);
        });

        it('should return true if a boxA overlaps boxB', () => {
            let boxB = new Box(new Point(55, 60), new Point(120, 150));

            expect(boxA.overlaps(boxB)).toBe(true);
        });
    });

    describe('containsBox', () => {
        it('should return false if boxB has partial overlapping', () => {
            let boxB = new Box(new Point(55, 60), new Point(120, 150));

            expect(boxA.containsBox(boxB)).toBe(false);
        });

        it('should return true if boxB is completely contained by boxA', () => {
            let boxB = new Box(new Point(55, 60), new Point(90, 88));

            expect(boxA.containsBox(boxB)).toBe(true);
        });
    });

    describe('split', () => {
        it('should return an array of four Boxes', () => {
            let split = boxA.split();

            expect(split.length).toBe(4);
        });

        it('should return an array of four equal Boxes 44x44', () => {
            let split = boxA.split();

            for (let i = 0; i < split.length; i++) {
                let box = split[i];

                expect(box.width).toBe(44);
                expect(box.height).toBe(44);
                expect(split[i] instanceof Box).toBe(true);
            }
        });
    });
});
