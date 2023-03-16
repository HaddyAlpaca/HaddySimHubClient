import { LapTimePipe } from "./laptime.pipe";

describe('LaptimePipe', () => {
  const pipe = new LapTimePipe();

  it('Check formatting of laptime 01:34.421', () => {
    const milliseconds = 1 * 60 * 1000 + 34 * 1000 + 421;
    expect(pipe.transform(milliseconds)).toBe('01:34.421');
  });

  it('Check formatting of laptime 02:05.009', () => {
    const milliseconds = 2 * 60 * 1000 + 5 * 1000 + 9;
    expect(pipe.transform(milliseconds)).toBe('02:05.009');
  });

  it('Check formatting of laptime 61:15.123', () => {
    const milliseconds = 61 * 60 * 1000 + 15 * 1000 + 123;
    expect(pipe.transform(milliseconds)).toBe('61:15.123');
  });

});
