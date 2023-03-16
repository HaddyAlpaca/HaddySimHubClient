import { GearPipe } from "./gear.pipe";

describe('GearPipe', () => {
  it('0 should return N', () => {
    const pipe = new GearPipe();
    const result = pipe.transform(0);
    expect(result).toBe('N');
  });

  it('Positive values should return just the number', () => {
    const pipe = new GearPipe();
    expect(pipe.transform(1)).toBe('1');
    expect(pipe.transform(6)).toBe('6');
    expect(pipe.transform(8)).toBe('8');
    expect(pipe.transform(12)).toBe('12');
  });

  it('Negative values should return just the "R" + number', () => {
    const pipe = new GearPipe();

    expect(pipe.transform(-1)).toBe('R1');
    expect(pipe.transform(-2)).toBe('R2');
    expect(pipe.transform(-3)).toBe('R3');
  });
});
