import format, { padLeft } from './format';

describe('padLeft', () => {
  describe('when string is greater than or equal to desiredLength', () => {
    it('returns string unchanged', () => {
      expect(padLeft(5, ' ', '12345')).toEqual('12345');
      expect(padLeft(5, ' ', '123456')).toEqual('123456');
    });
  });

  describe('when string is less than desiredLength', () => {
    it('pads string with specifed char until desired length is hit', () => {
      expect(padLeft(5, ' ', '1234')).toEqual(' 1234');
      expect(padLeft(5, '-', '1234')).toEqual('-1234');
      expect(padLeft(5, '0', '12')).toEqual('00012');
    });
  });
});

describe('format', () => {
  it('formats millis as mm:ss:ccc', () => {
    expect(format(234)).toEqual('00:00.234');
    expect(format(12345)).toEqual('00:12.345');
    expect(format(123456)).toEqual('02:03.456')
  })
});
