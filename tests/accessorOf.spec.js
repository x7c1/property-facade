import {accessorOf} from '../src/accessorOf';
import {expect} from 'chai';

describe('accessorOf', () => {

  const sample = accessorOf({
    a1: {
      b1: {
        c1: 11,
      },
      b2: [22, 44, 66],
      b3: [null, null, { c2: 88 }],
      b4: null,
      b5: undefined,
    },
  });

  it('can return a property from a nested object', () => {
    const x = sample.a1.b1.c1.or('foo');
    expect(x).to.equal(11);

    const x2 = sample.a1.b3[2].c2.or(null);
    expect(x2).to.equal(88);
  });

  it('can return a object from a nested object', () => {
    const x0 = sample.a1.b1.or(null);
    expect(x0.c1).to.equal(11);

    const x1 = sample.a1.b2.or(null);
    expect(x1[1]).to.equal(44);

    const x2 = sample.a1.b3[2].or(null);
    expect(x2.c2).to.equal(88);
  });

  it('can return an array item from a nested object', () => {
    const x0 = sample.a1.b2[1].or('foo');
    expect(x0).to.equal(44);
  });

  it('should return a default value if given key not found', () => {
    const x0 = sample.bar.a1.b1.c1.or('foo0');
    expect(x0).to.equal('foo0');

    const x1 = sample.a1.bar.b1.c1.or('foo1');
    expect(x1).to.equal('foo1');

    const x2 = sample.a1.b1.c1.bar.or('foo2');
    expect(x2).to.equal('foo2');

    const x3 = sample.a1.b2[100].or('foo3');
    expect(x3).to.equal('foo3');
  });


  it('should return a default value if target is null', () => {
    const x0 = sample.a1.b4.or('foo0');
    expect(x0).to.equal('foo0');

    const x1 = sample.a1.b4.bar.or('foo1');
    expect(x1).to.equal('foo1');
  });

  it('should return a default value if target is undefined', () => {
    const x0 = sample.a1.b5.or('foo0');
    expect(x0).to.equal('foo0');

    const x1 = sample.a1.b5.bar.or('foo1');
    expect(x1).to.equal('foo1');
  });

});
