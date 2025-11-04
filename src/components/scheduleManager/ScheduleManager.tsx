import { useState } from "react"
import "./ScheduleManager.css"

interface ScheduleManagerProps {
    schedules: string[]
    onChange: (schedules: string[]) => void
}

export default function ScheduleManager({ schedules, onChange }: ScheduleManagerProps) {
    const [newSchedule, setNewSchedule] = useState("")
    const [editingIndex, setEditingIndex] = useState<number | null>(null)

    const formatToHHMMSS = (value: string) => {
        if (!value) return ""
        const [hours, minutes] = value.split(":")
        return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:00`
    }

    const handleAdd = () => {
        if (!newSchedule) return
        const formatted = formatToHHMMSS(newSchedule)
        if (!schedules.includes(formatted)) {
            onChange([...schedules, formatted].sort())
            setNewSchedule("")
        }
    }

    const handleDelete = (index: number) => {
        const updated = schedules.filter((_, i) => i !== index)
        onChange(updated)
    }

    const handleEdit = (index: number) => {
        const timeWithoutSeconds = schedules[index].slice(0, 5)
        setNewSchedule(timeWithoutSeconds)
        setEditingIndex(index)
    }

    const handleSaveEdit = () => {
        if (editingIndex === null || !newSchedule) return
        const formatted = formatToHHMMSS(newSchedule)
        const updated = [...schedules]
        updated[editingIndex] = formatted
        onChange(updated.sort())
        setNewSchedule("")
        setEditingIndex(null)
    }

    return (
        <div className="schedule-manager">
            <h3>Horário</h3>
            <div className="schedule-list">
                {schedules.length === 0 ? (
                    <p className="empty">Nenhum horário adicionado</p>
                ) : (
                    schedules.map((time, index) => (
                        <div key={index} className="schedule-item">
                            <span>{time.slice(0, 5)}</span>
                            <div className="actions">
                                <button className="edit" onClick={() => handleEdit(index)}>Editar</button>
                                <button className="delete" onClick={() => handleDelete(index)}>Excluir</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="add-schedule">
                <input
                    type="time"
                    value={newSchedule}
                    onChange={(e) => setNewSchedule(e.target.value)}
                />
                {editingIndex !== null ? (
                    <button className="save" onClick={handleSaveEdit}>Salvar</button>
                ) : (
                    <button className="add" onClick={handleAdd}>Adicionar</button>
                )}
            </div>
        </div>
    )
}
