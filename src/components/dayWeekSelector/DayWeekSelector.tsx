import './DayWeekSelector.css';
import { LETTER_DAYS_OF_WEEK } from "../../utils/constants";


interface DayWeekSelectorProps {
    selectedDays: number[]
    onChange: (days: number[]) => void
    error?: string
}

export default function DayWeekSelector({ selectedDays, onChange, error }: DayWeekSelectorProps) {
    const days = LETTER_DAYS_OF_WEEK;
    
    const toggleDay = (day: number) => {
        if (selectedDays.includes(day)) {
            onChange(selectedDays.filter(d => d !== day))
        } else {
            onChange([...selectedDays, day])
        }
    }

    return (
        <div className="form-group">
            <label>Dias da Semana*</label>
            <div className="days-selector">
                {days.map((day, index) => (
                    <button
                        key={index}
                        className={`day-btn ${selectedDays.includes(index) ? 'selected' : ''}`}
                        onClick={() => toggleDay(index)}
                        type="button"
                    >
                        {day}
                    </button>
                ))}
            </div>
            {error && <small className="error-text">{error}</small>}
        </div>
    )
}
