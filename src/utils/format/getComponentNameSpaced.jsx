const getComponentNameSpaced = (Component) => {
  const name = Component.displayName || Component.name || 'Documento';
  return name.replace(/([A-Z])/g, ' $1').trim();
};

export default getComponentNameSpaced;
