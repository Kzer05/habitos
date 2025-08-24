import './ColorPicker.css'

const QUANTITY_COLORS = 5;

interface HabitColorPickerProps {
    selectedColor: number
    onChange: (color: number) => void
}

export default function HabitColorPicker({ selectedColor, onChange }: HabitColorPickerProps) {
    return (   
        <div className="form-group">
            <label>Cores</label>
            <div className="color-picker">
                {Array(QUANTITY_COLORS).fill(0).map((_, index) => (
                    <button
                        key={index}
                        className={`color-circle color-${index + 1} ${selectedColor === index + 1 ? 'selected' : ''}`}
                        onClick={() => onChange(index + 1)}
                        type="button"
                    />
                ))}
            </div>
        </div>
    )
}
