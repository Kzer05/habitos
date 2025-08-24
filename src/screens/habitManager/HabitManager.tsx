import { useState } from 'react'
import './HabitManager.css'
import InputField from '../../components/inputField/InputField'
import DayWeekSelector from '../../components/dayWeekSelector/DayWeekSelector'
import ColorPicker from '../../components/colorPicker/ColorPicker'
import SubmitButton from '../../components/submitButton/SubmitButton'
import { useLocation, useNavigate } from 'react-router-dom'
import { useHabits } from '../../context/HabitContext'
import Habit from '../../models/Habit'
import { v4 as uuidv4 } from 'uuid'
import type CompletedDay from '../../models/CompletedDay'
import deleteImage from '../../assets/delete.png'


export interface HabitData {
    id?: string
    name: string
    description: string
    frequency: number
    daysOfTheWeek: number[]
    color: number
    completedDays?: CompletedDay[]
}

export default function HabitManager() {
    const navigate = useNavigate()
    const location = useLocation()
    const { habits, setHabits } = useHabits()

    const habitFromState = location.state as HabitData | undefined
    const isEdit = !!habitFromState?.id

    const [habit, setHabit] = useState<HabitData>({
        id: habitFromState?.id, // pode ser undefined se for novo
        name: habitFromState?.name || '',
        description: habitFromState?.description || '',
        frequency: habitFromState?.frequency || 1,
        daysOfTheWeek: habitFromState?.daysOfTheWeek || [],
        color: habitFromState?.color || 1,
        completedDays: habitFromState?.completedDays || []
    })

    const [errors, setErrors] = useState<{ [K in keyof HabitData]?: string }>({})

    const validate = () => {
        const newErrors: typeof errors = {}
        if (!habit.name) newErrors.name = 'Este campo é obrigatório'
        if (!habit.frequency || isNaN(habit.frequency)) newErrors.frequency = 'Somente números'
        if (habit.daysOfTheWeek.length === 0) newErrors.daysOfTheWeek = 'Selecione pelo menos um dia da semana'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (field: keyof HabitData, value: any) => {
        setHabit({ ...habit, [field]: value })
    }

    const handleSubmit = () => {
        if (!validate()) return

        if (isEdit && habit.id) {
            // Edição
            const updatedHabits = habits.map(h =>
                h.id === habit.id
                    ? new Habit(habit.id, habit.name, habit.description, habit.frequency, habit.color, habit.daysOfTheWeek, habit.completedDays)
                    : h
            )
            setHabits(updatedHabits)
        } else {
            // Novo hábito
            const newHabit = new Habit(
                uuidv4(), // gera um ID único
                habit.name,
                habit.description,
                habit.frequency,
                habit.color,
                habit.daysOfTheWeek
            )
            setHabits([...habits, newHabit])
        }

        navigate('/listHabits')
    }

    const handleDelete = () => {
        if (!habit.id) return
        const updatedHabits = habits.filter(h => h.id !== habit.id)
        setHabits(updatedHabits)
        navigate('/listHabits')
    }


    const handleReturn = () => {
        navigate('/listHabits')
    }

    return (
        <div className="habit-manager-container">
            <header className="habit-manager-header">
                <span onClick={handleReturn} className="back-button">&lt;</span>
                <h2>{isEdit ? 'Editar Hábito' : 'Criar Hábito'}</h2>
                {isEdit && (
                    <button className="delete-button" onClick={handleDelete}>
                        <img src={deleteImage} alt="Delete" />
                    </button>
                )}
            </header>


            <InputField
                label='Nome*'
                value={habit.name}
                onChange={(v) => handleChange('name', v)}
                error={errors.name}
                placeholder='Ex: Beber Água'
            />
            <InputField
                label='Descrição'
                value={habit.description}
                onChange={(v) => handleChange('description', v)}
                rows={5}
                placeholder='Ex: Melhora a saúde bebendo 10 copos de água por dia'
            />
            <InputField
                label='Quantidade de vezes por dia*'
                value={habit.frequency}
                onChange={(v) => handleChange('frequency', Number(v))}
                error={errors.frequency}
                type='number'
                placeholder='Ex: 10'
            />
            <DayWeekSelector
                selectedDays={habit.daysOfTheWeek}
                onChange={(days) => handleChange('daysOfTheWeek', days)}
                error={errors.daysOfTheWeek}
            />
            <ColorPicker
                selectedColor={habit.color}
                onChange={(color) => handleChange('color', color)}
            />
            <p className='obs'>* Campos Obrigatórios</p>
            <SubmitButton onClick={handleSubmit}>
                {isEdit ? 'Salvar Alterações' : 'Criar Hábito'}
            </SubmitButton>
        </div>
    )
}
