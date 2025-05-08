const formatDate = (dateStr) => {
  const date = new Date(dateStr);

  const day = String(date.getDate()).padStart(2, '0'); // Adds leading zero if necessary
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11, so we add 1
  const year = date.getFullYear();

  return {
    day,
    month,
    year,
  };
};

export default formatDate;
