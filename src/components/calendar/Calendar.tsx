import { useState } from 'react'
import './Calendar.css'

interface CalendarProps {
    selectedDate: string
    onSelectDate: (date: string) => void
}

export default function Calendar({ selectedDate, onSelectDate }: CalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date(selectedDate))
    const now = new Date()
    const todayIso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate() + 1).padStart(2, '0')}`


    const getMonthYear = (date: Date) =>
        date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        return new Date(year, month + 1, 0).getDate()
    }

    // Return 0 for monday, 6 for sunday (start in monday)
    const getFirstDayIndex = (date: Date) => {
        const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
        return (day + 6) % 7 // change sunday for the end
    }

    const buildCalendar = () => {
        const daysInMonth = getDaysInMonth(currentDate)
        const firstDay = getFirstDayIndex(currentDate) + 1
        const days: (string | null)[] = Array(firstDay).fill(null)

        for (let d = 1; d <= daysInMonth; d++) {
            const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), d + 1)
            const iso = dayDate.toISOString().split('T')[0]
            days.push(iso)
        }

        return days
    }

    const handlePrev = () => {
        const newDate = new Date(currentDate)
        newDate.setMonth(currentDate.getMonth() - 1)
        setCurrentDate(newDate)
    }

    const handleNext = () => {
        const newDate = new Date(currentDate)
        newDate.setMonth(currentDate.getMonth() + 1)
        setCurrentDate(newDate)
    }

    const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
    const days = buildCalendar()

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={handlePrev}>&lt;</button>
                <span>{getMonthYear(currentDate)}</span>
                <button onClick={handleNext}>&gt;</button>
            </div>

            <div className="calendar-days">
                {daysOfWeek.map((d, i) => (
                    <div key={i}>{d}</div>
                ))}
            </div>

            <div className="calendar-grid">
                {days.map((iso, i) =>
                    iso ? (
                        <div
                            key={i}
                            className={`calendar-cell ${iso === selectedDate ? 'selected' : ''} ${iso === todayIso ? 'today' : ''}`}
                            onClick={() => onSelectDate(iso)}
                        >
                            {new Date(iso).getDate()}
                        </div>

                    ) : (
                        <div key={i} className="calendar-cell empty" />
                    )
                )}
            </div>
        </div>
    )
}
