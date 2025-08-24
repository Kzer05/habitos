import { useNavigate } from 'react-router-dom'
import './HabitCreationMenu.css'
import aiImage from '../../assets/AI.png'
import createImage from '../../assets/create.png'


interface HabitCreationMenuProps {
    isOpen: boolean
    onClose: () => void
    onSelect: (method: 'manual' | 'ai' | 'open') => void
}

export default function HabitCreationMenu({ isOpen, onClose, onSelect }: HabitCreationMenuProps) {
    const navigate = useNavigate()

    const handleOnSelect = (method: 'manual' | 'ai' | 'open') => {
        onSelect(method)

        if (method == 'manual') return navigate('/habitManager')
        if (method == 'ai') return navigate('/habitAICreator')
    }

    return (
        <>
            {!isOpen && (
                <button className="floating-btn" onClick={() => onSelect('open')}>
                    +
                </button>
            )}

            <div className={`floating ${isOpen ? '-opened' : '-closed'}`}>
                <div className='create-habit-btn'>
                    <span>Criar hábito manualmente</span>
                    <button className="floating-btn manual" onClick={() => handleOnSelect('manual')}>
                        <img src={createImage} alt="create" />
                    </button>
                </div>
                <div className='create-habit-btn'>
                    <span>Criar hábito com IA</span>
                    <button className="floating-btn ai" onClick={() => handleOnSelect('ai')}>
                        <img src={aiImage} alt="AI" />
                    </button>
                </div>

            </div>

            {isOpen && (
                <div
                    onClick={onClose}
                    style={{ position: 'fixed', inset: 0, zIndex: 10 }}
                />
            )}
        </>
    )
}
