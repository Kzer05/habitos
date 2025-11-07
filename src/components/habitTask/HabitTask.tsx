import { useEffect, useRef, useState } from "react"
import "./HabitTask.css"

interface HabitTaskProps {
    id: string
    name: string
    color: number
    progress: string
    done: boolean
    onClick: () => void
}

interface ConfettiPiece {
    id: number
    x: number
    y: number
    rotate: number
    color: string
    scale: number
}

export default function HabitTask({ id, name, color, progress, done, onClick }: HabitTaskProps) {
    const [confetti, setConfetti] = useState<ConfettiPiece[]>([])
    const [animationKey, setAnimationKey] = useState(0)
    const prevDone = useRef(done)

    useEffect(() => {
        // Detecta mudança de false -> true (tarefa concluída)
        if (!prevDone.current && done) {
            const colors = ["#ff4d4d", "#ffd633", "#4dff4d", "#33ccff", "#ff66cc", "#ff9933", "#66ff99", "#ff3366"]

            const pieces = Array.from({ length: 25 }).map((_, i) => ({
                id: i,
                x: (Math.random() - 0.5) * 200,
                y: Math.random() * -150 - 50,
                rotate: Math.random() * 720,
                color: colors[Math.floor(Math.random() * colors.length)],
                scale: Math.random() * 0.8 + 0.4,
            }))

            setConfetti(pieces)
            setAnimationKey((prev) => prev + 1) // 🔥 força recriação

            const timer = setTimeout(() => setConfetti([]), 1800)
            return () => clearTimeout(timer)
        }

        // Quando desmarca (true -> false)
        if (prevDone.current && !done) {
            setConfetti([])
        }

        prevDone.current = done
    }, [done])

    return (
        <div key={id} className="habit-wrapper">
            {/* 🎉 Confetes individuais */}
            {confetti.length > 0 && (
                <div key={animationKey} className="confetti-container">
                    {confetti.map((c) => (
                        <span
                            key={c.id}
                            className="confetti"
                            style={{
                                "--x": `${c.x}px`,
                                "--y": `${c.y}px`,
                                "--r": `${c.rotate}deg`,
                                "--s": c.scale,
                                "--color": c.color,
                            } as React.CSSProperties}
                        />
                    ))}
                </div>
            )}

            <div className={`habit color-${color}`} onClick={onClick}>
                <div>
                    <input type="checkbox" checked={done} readOnly />
                    <label>{name}</label>
                </div>
                <span>{progress}</span>
            </div>
        </div>
    )
}
