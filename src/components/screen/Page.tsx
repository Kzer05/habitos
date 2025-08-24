import type { ReactNode } from 'react'
import './Page.css'

interface PageProps {
    children: ReactNode
}

export default function Page({ children }: PageProps) {
    return (
        <div className="page">
            {children}
        </div>
    )
}
