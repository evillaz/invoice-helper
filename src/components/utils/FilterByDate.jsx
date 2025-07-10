import PropTypes from 'prop-types';

const FilterByDate = ({
  startMonth,
  endMonth,
  startYear,
  endYear,
  onChangeStartMonth,
  onChangeEndMonth,
  onChangeStartYear,
  onChangeEndYear,
}) => (
  <>
    <div>
      <label htmlFor="startMonth">
        Mes Inicio:
        <select id="startMonth" value={startMonth} onChange={(e) => onChangeStartMonth(e.target.value)}>
          <option value="">-- Mes inicio --</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={`mesinicio${i + 1}`} value={String(i + 1).padStart(2, '0')}>
              {new Date(0, i).toLocaleString('es-PE', { month: 'long' })}
            </option>
          ))}
        </select>
      </label>
    </div>

    <div>
      <label htmlFor="startYear">
        Año Inicio:
        <select id="startYear" value={startYear} onChange={(e) => onChangeStartYear(e.target.value)}>
          <option value="">-- Seleccionar año --</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </label>
    </div>

    <div>
      <label htmlFor="endMonth">
        Mes Fin:
        <select id="endMonth" value={endMonth} onChange={(e) => onChangeEndMonth(e.target.value)}>
          <option value="">-- Mes fin --</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={`mesfin${i + 1}`} value={String(i + 1).padStart(2, '0')}>
              {new Date(0, i).toLocaleString('es-PE', { month: 'long' })}
            </option>
          ))}
        </select>
      </label>
    </div>

    <div>
      <label htmlFor="endYear">
        Año Fin:
        <select id="endYear" value={endYear} onChange={(e) => onChangeEndYear(e.target.value)}>
          <option value="">-- Seleccionar año --</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </label>
    </div>
  </>
);

FilterByDate.propTypes = {
  startMonth: PropTypes.string.isRequired,
  endMonth: PropTypes.string.isRequired,
  startYear: PropTypes.string.isRequired,
  endYear: PropTypes.string.isRequired,
  onChangeStartMonth: PropTypes.func.isRequired,
  onChangeEndMonth: PropTypes.func.isRequired,
  onChangeStartYear: PropTypes.func.isRequired,
  onChangeEndYear: PropTypes.func.isRequired,
};

export default FilterByDate;
