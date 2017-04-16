import {accessorOf} from '../src/accessorOf';
import {expect} from 'chai';

describe('accessorOf', () => {

  const sample = {
    a1: {
      b1: {
        c1: 11,
      },
      b2: [22, 44, 66],
      b3: [null, null, { c2: 88 }],
    },
  };

  it('can return a property from a nested object', () => {
    const accessor = accessorOf(sample);

    const x = accessor.a1.b1.c1.or('foo');
    expect(x).to.equal(11);

    const x2 = accessor.a1.b3[2].c2.or(null);
    expect(x2).to.equal(88);
  });

  it('can return a object from a nested object', () => {
    const accessor = accessorOf(sample);

    const x0 = accessor.a1.b1.or(null);
    expect(x0.c1).to.equal(11);

    const x1 = accessor.a1.b2.or(null);
    expect(x1[1]).to.equal(44);

    const x2 = accessor.a1.b3[2].or(null);
    expect(x2.c2).to.equal(88);
  });

  it('can return an array item from a nested object', () => {
    const accessor = accessorOf(sample);

    const x0 = accessor.a1.b2[1].or('foo');
    expect(x0).to.equal(44);
  });

  it('should return a default value if given key not found', () => {
    const accessor = accessorOf(sample);

    const x0 = accessor.bar.a1.b1.c1.or('foo0');
    expect(x0).to.equal('foo0');

    const x1 = accessor.a1.bar.b1.c1.or('foo1');
    expect(x1).to.equal('foo1');

    const x2 = accessor.a1.b1.c1.bar.or('foo2');
    expect(x2).to.equal('foo2');

    const x3 = accessor.a1.b2[100].or('foo3');
    expect(x3).to.equal('foo3');
  });

});
