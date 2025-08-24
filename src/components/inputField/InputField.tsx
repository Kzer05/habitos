import './InputField.css'

interface InputFieldProps {
    label: string
    value: string | number
    onChange: (value: string) => void
    error?: string
    type?: string
    placeholder?: string
    required?: boolean
    rows?: number
}

export default function InputField({
    label,
    value,
    onChange,
    error,
    type = 'text',
    placeholder,
    required = false,
    rows
}: InputFieldProps) {
    const isTextarea = rows !== undefined

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value
        const isNumber = type === 'number'

        if (isNumber) {
            const onlyNumbers = rawValue.replace(/\D/g, '')
            onChange(onlyNumbers)
        } else {
            onChange(rawValue)
        }
    }

    return (
        <div className="input-container">
            <label className={`input-label ${required ? 'required' : ''}`}>
                {label}
            </label>

            {isTextarea ? (
                <textarea
                    rows={rows}
                    placeholder={placeholder}
                    className={`input input-textarea ${error ? 'input-error-border' : ''}`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <input
                    type="text"
                    inputMode={type === 'number' ? 'numeric' : undefined}
                    pattern={type === 'number' ? '[0-9]*' : undefined}
                    placeholder={placeholder}
                    className={`input ${error ? 'input-error-border' : ''}`}
                    value={value}
                    onChange={handleOnChange}
                />

            )}

            {error && <span className="input-error-text">{error}</span>}
        </div>
    )
}
