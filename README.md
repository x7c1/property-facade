# property-facade

Provides safe access to deep nested properties of JavaScript Object.

## Install

```
yarn add property-facade
```

## Example

```JavaScript
import { accessorOf } from 'property-facade';
const sample = accessorOf({
  a1: {
    b1: {
      c1: 11,
    },
    b3: [null, null, { c2: 88 }],
    b4: null,
    b5: undefined,
  },
});
```

You can get a given default value even if the target path not resolved.

```js
// a1.abcde not exist
const x1 = sample.a1.abcde.b1.c1.or('foo1');
expect(x1).to.equal('foo1');

// b2[100] not exist
const x2 = sample.a1.b2[100].or('foo2');
expect(x2).to.equal('foo2');

```

Also `null` and `undefined` are ignored in the same way.

```js
// no need to write lots of cumbersome undefined or null checks.
const x0 = sample.a1.b4.or('foo0');
expect(x0).to.equal('foo0');

const x0 = sample.a1.b5.or('foo0');
expect(x0).to.equal('foo0');
```

It returns, of course, a target value if the path resolved.

```js
const x1 = sample.a1.b1.c1.or('foo');
expect(x1).to.equal(11);

const x2 = sample.a1.b3[2].c2.or(null);
expect(x2).to.equal(88);
```