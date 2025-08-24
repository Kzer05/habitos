import { useState } from 'react'
import { useHabits } from '../../context/HabitContext'
import Calendar from '../calendar/Calendar'
import './DateHeader.css'
import { CONTRACTED_DAYS_OF_WEEK } from '../../utils/constants'

export default function DateHeader() {
    const { currentDate, setCurrentDate } = useHabits()
    const [isCalendarOpen, setIsCalendarOpen] = useState(false)

    const date = new Date(currentDate)

    const now = new Date()
    const todayString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate() + 1).padStart(2, '0')}`

    const daysWeek = CONTRACTED_DAYS_OF_WEEK
    const dayWeek = daysWeek[date.getDay()]
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')

    const isToday = () => currentDate === todayString

    const toggleCalendar = () => setIsCalendarOpen(prev => !prev)

    const handleSelectDate = (newDate: string) => {
        setCurrentDate(newDate)
        setIsCalendarOpen(false)
    }

    const changeDay = (amount: number) => {
        const newDate = new Date(currentDate)
        newDate.setDate(newDate.getDate() + amount)
        const iso = newDate.toISOString().split('T')[0]
        setCurrentDate(iso)
    }

    return (
        <header className="date-header">
            <button onClick={() => changeDay(-1)} className="arrow">{'<'}</button>

            <div onClick={toggleCalendar} style={{ cursor: 'pointer' }}>
                <h2>{isToday() ? 'Hoje - ' : ''}{dayWeek}</h2>
                <h1>{day}/{month}</h1>
            </div>

            <button onClick={() => changeDay(1)} className="arrow">{'>'}</button>

            {isCalendarOpen && (
                <div className="calendar-background">
                    <div className="calendar-wrapper">
                        <Calendar
                            selectedDate={currentDate}
                            onSelectDate={handleSelectDate}
                        />
                    </div>
                </div>
            )}
        </header>
    )
}
