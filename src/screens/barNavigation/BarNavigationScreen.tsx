import { Outlet } from 'react-router-dom'
import HabitCreationMenu from '../../components/habitCreationMenu/HabitCreationMenu'
import Page from '../../components/screen/Page'
import NavBar from '../../components/navbar/NavBar'
import { useState } from 'react'

export default function BarNavigationScreen() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleSelectCreationMethod = (method: 'manual' | 'ai' | 'open') => {
        if (method === 'open') {
            setIsMenuOpen(true)
        } else {
            setIsMenuOpen(false)
        }
    }

    return (
        <Page>
            <Outlet />
            <HabitCreationMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onSelect={handleSelectCreationMethod}
            />
            <NavBar />
        </Page>
    )
}
