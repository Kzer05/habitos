import { useNavigate } from 'react-router-dom'
import { convertNumberToWeek } from '../../utils/functions'
import './HabitCard.css'
import type CompletedDay from '../../models/CompletedDay'

interface HabitCardProps {
    id: string
    name: string
    description: string
    frequency: number
    color: number
    daysOfTheWeek: number[]
    completedDays?: CompletedDay[]
}

export default function HabitCard({ id, name, description, frequency, color, daysOfTheWeek, completedDays }: HabitCardProps) {
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
                completedDays
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
