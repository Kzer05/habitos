import HabitCard from '../../components/habitCard/HabitCard';
import Space from '../../components/space/Space';
import { useHabits } from '../../context/HabitContext'
import './ListHabitsScreen.css'

export default function ListHabitsScreen() {
    const { habits } = useHabits();

    return (
        <div className="list-habits-screen">
            <h2>Lista de Hábitos</h2>

            <div className="habit-list">
                {habits.length > 0 ? habits.map((habit) => (
                    <HabitCard key={habit.id} {...habit} />
                )) : 'Crie um novo habíto clicando no botão "+"'}
                <Space height={60} width="100%" />
            </div>
        </div>
    )
}
