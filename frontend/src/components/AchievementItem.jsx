import { useDispatch } from 'react-redux'
import { deleteAchievement } from '../features/achievement/achievementSlice'
import { format } from 'date-fns'
import {
    Table,
    Button
} from 'reactstrap'

function AchievementItem({award}) {
    const dispatch = useDispatch()

    return (
        <tbody>
            <tr key={award._id}>
                <td className='td col-sm-2'>{format(new Date(award.years), 'MM/yyyy')}</td>
                <td className='td col-sm-5'>{award.name}</td>
                <td className='td col-sm-5'>{award.organization}</td>
            </tr>
        </tbody>
    )
}

export default AchievementItem