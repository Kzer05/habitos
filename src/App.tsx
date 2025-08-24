import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BarNavigationScreen from './screens/barNavigation/BarNavigationScreen'
import HomeScreen from './screens/home/HomeScreen'
import ListHabitsScreen from './screens/listHabits/ListHabitsScreen'
import HabitManager from './screens/habitManager/HabitManager'
import HabitAICreator from './screens/habitAICreator/HabitAICreator'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BarNavigationScreen />}>
                    <Route index element={<HomeScreen />} />
                    <Route path="listHabits" element={<ListHabitsScreen />} />
                </Route>

                <Route path="habitManager" element={<HabitManager />} />
                <Route path="habitAICreator" element={<HabitAICreator />} />
            </Routes>
        </BrowserRouter>
    )
}
