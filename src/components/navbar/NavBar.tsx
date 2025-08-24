import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './NavBar.css'
import homeImage from '../../assets/home.png'
import listImage from '../../assets/list.png'


export default function NavBar() {
    const navigate = useNavigate()
    const location = useLocation()

    const [selected, setSelected] = useState<'home' | 'listHabits'>(() => {
        if (location.pathname === '/listHabits') return 'listHabits'
        return 'home'
    })

    useEffect(() => {
        if (location.pathname === '/listHabits') setSelected('listHabits')
        else setSelected('home')
    }, [location.pathname])

    const goTo = (section: 'home' | 'listHabits') => {
        setSelected(section)
        if (section === 'home') navigate('/')
        else if (section === 'listHabits') navigate('/listHabits')
    }

    return (
        <nav id='navbar'>
            <button
                className={selected === 'home' ? '-selected' : ''}
                onClick={() => goTo('home')}
            >
                <img src={homeImage} alt="Home" />
            </button>
            <button
                className={selected === 'listHabits' ? '-selected' : ''}
                onClick={() => goTo('listHabits')}
            >
                <img src={listImage} alt="List" />
            </button>
        </nav>
    )
}
