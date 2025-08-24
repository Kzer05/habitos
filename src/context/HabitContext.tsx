import type { ReactNode } from "react"
import { createContext, useContext, useEffect, useState } from "react"
import Habit from "../models/Habit"

interface HabitContextType {
    habits: Habit[]
    setHabits: (h: Habit[]) => void
    currentDate: string
    setCurrentDate: (d: string) => void
}

const HabitContext = createContext<HabitContextType | undefined>(undefined)

const HABITS_KEY = "habits"

export function HabitProvider({ children }: { children: ReactNode }) {
    const [habits, setHabitsState] = useState<Habit[]>([])
    const [isLoaded, setIsLoaded] = useState(false) 

    const now = new Date()
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate() + 1).padStart(2, '0')}`
    const [currentDate, setCurrentDateState] = useState<string>(today)

    // Get data from localStorage
    useEffect(() => {
        const savedHabits = localStorage.getItem(HABITS_KEY)
        if (savedHabits) {
            try {
                const parsed = JSON.parse(savedHabits)
                const hydrated = parsed.map(
                    (h: any) =>
                        new Habit(
                            h.id,
                            h.name,
                            h.description,
                            h.frequency,
                            h.color,
                            h.daysOfTheWeek,
                        )
                )
                setHabitsState(hydrated)
            } catch (err) {
                console.error("Error loading habits from localStorage:", err)
            }
        }
        setIsLoaded(true) 
    }, [])

    // Save to localStorage only after load
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(HABITS_KEY, JSON.stringify(habits))
        }
    }, [habits, isLoaded])

    const setHabits = (newHabits: Habit[]) => setHabitsState(newHabits)
    const setCurrentDate = (newDate: string) => setCurrentDateState(newDate)

    return (
        <HabitContext.Provider
            value={{ habits, setHabits, currentDate, setCurrentDate }}
        >
            {children}
        </HabitContext.Provider>
    )
}

export function useHabits() {
    const context = useContext(HabitContext)
    if (!context) {
        throw new Error("useHabits must be used within a HabitProvider")
    }
    return context
}
