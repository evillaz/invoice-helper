const highlightText = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) => (part.toLowerCase() === query.toLowerCase() ? (
    <span key={i} style={{ backgroundColor: 'yellow' }} className="bg-yellow-200 font-bold">{part}</span>
  ) : (
    part
  )));
};

export default highlightText;
