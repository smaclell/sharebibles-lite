import { wrapLatitude, wrapLongitude } from '../../utils/geo';

describe('utils/geo', () => {
  describe('wrapLatitude', () => {
    it('does not wrap positive numbers', () => {
      expect(wrapLatitude(45)).toEqual(45);
    });

    it('does not wrap 90', () => {
      expect(wrapLatitude(90)).toEqual(90);
    });

    it('does wraps 90.1 to -89.9', () => {
      expect(wrapLatitude(90.1)).toEqual(-89.9);
    });

    it('does wraps 111 to -69', () => {
      expect(wrapLatitude(111)).toEqual(-69);
    });

    it('does not wrap negative numbers', () => {
      expect(wrapLatitude(-45)).toEqual(-45);
    });

    it('does not wrap -90 numbers', () => {
      expect(wrapLatitude(-90)).toEqual(-90);
    });

    it('does wraps -90.1 to 89.9', () => {
      expect(wrapLatitude(-90.1)).toEqual(89.9);
    });

    it('does wraps -100 to 10', () => {
      expect(wrapLatitude(-100)).toEqual(80);
    });
  });

  describe('wrapLongitude', () => {
    it('does not wrap positive numbers', () => {
      expect(wrapLongitude(45)).toEqual(45);
    });

    it('does not wrap 180', () => {
      expect(wrapLongitude(180)).toEqual(180);
    });

    it('does wraps 180.1 to -179.9', () => {
      expect(wrapLongitude(180.1)).toEqual(-179.9);
    });

    it('does wraps 190 to -170', () => {
      expect(wrapLongitude(190)).toEqual(-170);
    });

    it('does not wrap negative numbers', () => {
      expect(wrapLongitude(-45)).toEqual(-45);
    });

    it('does not wrap -180 numbers', () => {
      expect(wrapLongitude(-180)).toEqual(-180);
    });

    it('does wraps -180.1 to 179.9', () => {
      expect(wrapLongitude(-180.1)).toEqual(179.9);
    });

    it('does wraps -191 to 169', () => {
      expect(wrapLongitude(-191)).toEqual(169);
    });
  });
});
