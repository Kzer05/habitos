import { useHabits } from '../../context/HabitContext'
import HabitTask from '../../components/habitTask/HabitTask'
import DateHeader from '../../components/dateHeader/DateHeader'
import Habit from '../../models/Habit'
import CompletedDay from '../../models/CompletedDay'
import { v4 as uuidv4 } from 'uuid'
import Space from '../../components/space/Space'

function getWeekDayIndex(dateStr: string) {
    const date = new Date(dateStr)
    return date.getDay()
}

function getProgress(habit: Habit, date: string): string {
    const completed = habit.completedDays?.find(cd => cd.date === date)
    if (!completed) return `0/${habit.frequency}`
    return `${completed.frequency}/${habit.frequency}`
}

export default function HomeScreen() {
    const { habits, setHabits, currentDate } = useHabits()
    const todayIndex = getWeekDayIndex(currentDate)

    const todayHabits = habits.filter(h => h.daysOfTheWeek.includes(todayIndex))

    function toggleHabitProgress(habit: Habit, habits: Habit[], setHabits: (h: Habit[]) => void, date: string) {
        const updatedHabits = habits.map(h => {
            if (h.id !== habit.id) return h

            const completedDays = h.completedDays ?? []
            const existing = completedDays.find(cd => cd.date === date)


            let newCompletedDays

            if (existing) {
                if (existing.done) {
                    // Remove o registro
                    newCompletedDays = completedDays.filter(cd => cd.date !== date)
                } else {
                    // Cria nova cópia do dia com frequência incrementada
                    const updatedDay = {
                        ...existing,
                        frequency: existing.frequency + 1,
                        done: existing.frequency + 1 >= existing.frequencyInDate,
                    }
                    newCompletedDays = completedDays.map(cd =>
                        cd.date === date ? updatedDay : cd
                    )
                }
            } else {
                const done = h.frequency === 1

                const newCompleted = new CompletedDay(
                    uuidv4(),
                    date,
                    h.frequency,
                    done
                )

                //seError(JSON.stringify(CompletedDay))
                newCompleted.frequency = 1
                newCompletedDays = [...completedDays, newCompleted]
            }

            // Retorna um novo habit
            return {
                ...h,
                completedDays: newCompletedDays
            }
        })

        setHabits(updatedHabits)
    }


    function isHabitDone(habit: Habit, date: string): boolean {
        const completed = habit.completedDays?.find(cd => cd.date === date)
        return completed?.done === true
    }

    return (
        <>
            <DateHeader />
            <div className="container">
                <div className="habits-title">Hábitos do Dia</div>
                {todayHabits.length > 0 ? todayHabits.map(habit => (
                    <HabitTask
                        key={habit.id}
                        id={habit.id}
                        name={habit.name}
                        color={habit.color}
                        progress={getProgress(habit, currentDate)}
                        done={isHabitDone(habit, currentDate)}
                        onClick={() => toggleHabitProgress(habit, habits, setHabits, currentDate)}
                    />
                )) : (<p>Sem hábitos para realizar neste dia</p>)}
                 <Space height={30} width="100%" />
            </div>
        </>
    )
}
