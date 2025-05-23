import PropTypes from 'prop-types';

const TableHeader = ({ headerData }) => (
  <tr className="header">
    {headerData.map((title) => (
      <th key={title}>{title}</th>
    ))}
  </tr>
);

TableHeader.propTypes = {
  headerData: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TableHeader;
