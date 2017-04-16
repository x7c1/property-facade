const Processes = (target, name) => {
  const toUnknown = {
    when: () => typeof target === 'undefined',
    next: () => accessorOf({ or: value => value }),
  };
  const toReturn = {
    when: () => typeof target[name] === 'function' && (name === 'or'),
    next: () => target[name],
  };
  const toObject = {
    when: () => typeof target[name] === 'object',
    next: () => accessorOf(target[name], { or: () => target[name] }),
  };
  const toDefault = {
    when: () => true,
    next: () => accessorOf({ or: () => target[name] }),
  };
  const all = [
    toUnknown,
    toReturn,
    toObject,
    toDefault
  ];
  return {
    run: () => all.find(_ => _.when()).next(),
  };
};

export const accessorOf = (...underlyings) => {
  return new Proxy(underlyings, {
    get: (targets, name) => {
      const target = targets.find(_ => name in _);
      return Processes(target, name).run();
    },
  });
};
