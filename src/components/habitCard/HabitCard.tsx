import { useNavigate } from 'react-router-dom'
import { convertNumberToWeek } from '../../utils/functions'
import './HabitCard.css'
import type Habit from '../../models/Habit'

interface HabitCardProps {
    habit: Habit
}

export default function HabitCard({ habit: {id, name, description, frequency, color, daysOfTheWeek, completedDays, schedules}  }: HabitCardProps) {
    const navigate = useNavigate()

    const handleSelectHabit = () => {
        navigate('/habitManager', {
            state: {
                id,
                name,
                description,
                frequency,
                color: color,
                daysOfTheWeek,
                completedDays,
                schedules
            }
        })

    }

    return (
        <div className={`habit-card color-${color}`} onClick={handleSelectHabit}>
            <div className="habit-name">{name}</div>
            <div className="habit-days">
                {Array(7).fill(0).map((_, i) => (
                    <span key={i} className={`habit-day ${daysOfTheWeek.includes(i) ? "-active" : "-inactive"}`}>
                        {convertNumberToWeek(i)}
                    </span>
                ))}
            </div>
        </div>
    )
}
