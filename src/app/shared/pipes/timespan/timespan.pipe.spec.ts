import { TimespanPipe } from './timespan.pipe';

describe('TimespanPipe', () => {
  const pipe = new TimespanPipe();

  it('Passing one hour and 7 minutes returns 1:07', () => {
    expect(pipe.transform(67)).toBe('1:07');
  });

  it('Passing 42 minutes returns 0:42', () => {
    expect(pipe.transform(42)).toBe('0:42');
  });

  it('Passing 25 hours and 14 minutes returns 25:14', () => {
    expect(pipe.transform((25 * 60) + 14)).toBe('25:14');
  });

  it('Passing a negative value of 1 hour and 15 minutes returns -1:15', () => {
    expect(pipe.transform(-75)).toBe('-1:15');
  });
});
