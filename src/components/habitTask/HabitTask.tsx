import './HabitTask.css'

interface HabitTaskProps {
    id: string
    name: string
    color: number
    progress: string
    done: boolean
    onClick: () => void
}

export default function HabitTask({ id, name, color, progress, done, onClick }: HabitTaskProps) {
    return (
        <div key={id} className={`habit color-${color}`} onClick={onClick} >
            <div>
                <input type="checkbox" checked={done} readOnly/>
                <label>
                    {name}
                </label>
            </div>
            <span>{progress}</span>
        </div>
    )
}
