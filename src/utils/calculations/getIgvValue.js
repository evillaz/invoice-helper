const getIgvValue = (amount) => {
  const factor = 10 ** 4;
  return Math.ceil((amount / 1.18) * factor) / factor;
};

export default getIgvValue;
