const determineSingleHexValue = (prefs, hextype) => {
  const tp = prefs.find((pref) => hextype.startsWith(pref.typename));
  if (tp) {
    return parseInt(tp.factor);
  } else {
    return 0;
  }
};

export const determineHexValue = (type_prefs, me, neighbours) => {
  if (type_prefs.incompatible.find((type) => me.startsWith(type))) {
    return -1;
  }
  return [me, ...neighbours].reduce(
    (cur, nb) => cur + determineSingleHexValue(type_prefs.preferences, nb),
    0
  );
};
