/// <reference path="../../typings/main/ambient/jasmine/jasmine.d.ts" />

import {Point} from '../../lib/quad-tree/point';

describe('Point', () => {
    let point;

    beforeEach(() => {
        point = new Point(8, 88);
    });

    describe('equals', () => {
        it('should return true if they match', () => {
            expect(point.equals(new Point(8, 88))).toBe(true);
        });

        it('should return false if they do not match', () => {
            expect(point.equals(new Point(8, 100))).toBe(false);
        });
    });

    describe('greater than or equal', () => {
        it('should return true if it is greater than', () => {
            expect(point.gte(new Point(8, 10))).toBe(true);
        });

        it('should return false if it is less than', () => {
            expect(point.gte(new Point(888, 88))).toBe(false);
        });
    });

    describe('less than or equal', () => {
        it('should return true if it is less than', () => {
            expect(point.lte(new Point(8, 10))).toBe(false);
        });

        it('should return false if it is greater than', () => {
            expect(point.lte(new Point(888, 88))).toBe(true);
        });
    });
});
