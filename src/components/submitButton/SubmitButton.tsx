import './SubmitButton.css'
import type { ReactNode } from "react"

interface HabitSubmitButtonProps {
    children: ReactNode,
    onClick: () => void
}

export default function HabitSubmitButton({ children, onClick }: HabitSubmitButtonProps) {
    return (
        <button className="submit-button" onClick={onClick}>
            {children}
        </button>
    )
}