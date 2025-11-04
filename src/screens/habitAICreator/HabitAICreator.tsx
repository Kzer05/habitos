import { useState } from 'react'
import axios from 'axios'
import './HabitAICreator.css'
import aiImage from '../../assets/AI.png'
import InputField from '../../components/inputField/InputField'
import SubmitButton from '../../components/submitButton/SubmitButton'
import { useNavigate } from 'react-router-dom'
import Modal from '../../components/modal/Modal'

interface HabitData {
    name: string
    description: string
    frequency: number
    color: number
    daysOfTheWeek: number[]
}

type ModalType = 'warn' | 'error' | 'success' | 'loading' | null

export default function HabitAICreator() {
    const navigate = useNavigate()

    const [habit, setHabit] = useState<HabitData>({
        name: '',
        description: '',
        frequency: 1,
        color: 0,
        daysOfTheWeek: [],
    })

    const [errors, setErrors] = useState<{ [K in keyof HabitData]?: string }>({})
    const [modalType, setModalType] = useState<ModalType>(null)
    const [modalMessage, setModalMessage] = useState('')
    const [apiResponse, setApiResponse] = useState<HabitData | null>(null)
    const [loading, setLoading] = useState(false)

    const validate = () => {
        const newErrors: typeof errors = {}
        if (!habit.description.trim()) newErrors.description = 'Este campo é obrigatório'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (field: keyof HabitData, value: any) => {
        setHabit({ ...habit, [field]: value })
    }

    const handleSubmit = async () => {
        if (!validate()) {
            setModalType('warn')
            setModalMessage('Por favor, descreva o seu hábito de outra forma')
            return
        }

        setLoading(true)
        setModalType('loading')
        setModalMessage('Estamos preparando tudo para você!')

        try {
            const response = await axios.post<HabitData>(
                'https://habitos-backend-gemini.onrender.com/habito',
                {
                    question: habit.description,
                },
                {
                    headers: {
                        authorization: 'Bearer revigorah-token',
                    },
                }
            )


            setApiResponse(response.data)
            setModalType('success')
            setModalMessage('Seu hábito foi criado com sucesso!')
        } catch (error: any) {
            setModalType('error')
            setModalMessage(error?.response?.data?.message || 'Um erro ocorreu, por favor tente novamente mais tarde')
        } finally {
            setLoading(false)
        }
    }

    const handleModalOk = () => {
        if (modalType === 'success' && apiResponse) {
            navigate('/habitManager', { state: apiResponse })
        }
        setModalType(null)
    }

    const handleReturn = () => {
        navigate('/listHabits')
    }

    return (
        <div className="habit-ai-creator-container">
            <header className="habit-ai-creator-header">
                <span onClick={handleReturn} className="back-button">&lt;</span>
                <h2>Gerar Hábito</h2>
            </header>

            <img src={aiImage} alt="AI" />

            <p>Descreva o hábito que deseja criar e prepararemos tudo para você!</p>

            <InputField
                label=""
                value={habit.description}
                placeholder='Ex: Gostaria de começar a beber 2 litros de água diariamente'
                onChange={(v) => handleChange('description', v)}
                rows={15}
                error={errors.description}
            />

            <SubmitButton onClick={handleSubmit}>
                {loading ? 'Gerando...' : 'Gerar Hábito'}
            </SubmitButton>

            {modalType && (
                <Modal
                    type={modalType}
                    message={modalMessage}
                    onClose={handleModalOk}
                />
            )}
        </div>
    )
}
