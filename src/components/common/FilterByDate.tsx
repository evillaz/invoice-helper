interface FilterByDateProps {
  startMonth: string;
  endMonth: string;
  startYear: string;
  endYear: string;
  onChangeStartMonth: (value: string) => void;
  onChangeEndMonth: (value: string) => void;
  onChangeStartYear: (value: string) => void;
  onChangeEndYear: (value: string) => void;
}

const FilterByDate = ({
  startMonth,
  endMonth,
  startYear,
  endYear,
  onChangeStartMonth,
  onChangeEndMonth,
  onChangeStartYear,
  onChangeEndYear,
}: FilterByDateProps): JSX.Element => (
  <div>
    <div>
      <label>
        Mes Inicio:
        <select value={startMonth} onChange={(e) => onChangeStartMonth(e.target.value)}>
          <option>-- Mes inicio --</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={`mesinicio${i + 1}`} value={String(i + 1).padStart(2, '0')}>
              {new Date(0, i).toLocaleString('es-PE', { month: 'long' })}
            </option>
          ))}
        </select>
      </label>
    </div>
    <div>
      <label>
        Año Inicio:
        <select value={startYear} onChange={(e) => onChangeStartYear(e.target.value)}>
          <option>-- Seleccionar año --</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </label>
    </div>

    <div>
      <label>
        Mes Fin:
        <select value={endMonth} onChange={(e) => onChangeEndMonth(e.target.value)}>
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
      <label>
        Año Inicio:
        <select value={endYear} onChange={(e) => onChangeEndYear(e.target.value)}>
          <option value="">-- Seleccionar año --</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </label>
    </div>
  </div>
);

export default FilterByDate;
