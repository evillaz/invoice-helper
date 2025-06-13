const nameSpaced = (stringValue) => {
  const name = stringValue;
  return name.replace(/([A-Z])/g, ' $1').trim();
};

export default nameSpaced;
