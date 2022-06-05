import { socketService, SOCKET_EMIT_ENTERED_STATION, SOCKET_EMIT_STATION_UPDATED, SOCKET_EMIT_ACTIVITY_LOG } from '../../services/socket.service'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { activityService } from '../../services/activity.service'
export const ActivityLog = () => {
    const { stationId } = useParams()
    const [activities, setActivities] = useState([])

    useEffect(() => {
        loadActivities()
    }, [])

    const loadActivities = async () => {
        const activities = await activityService.query()
        if (activities) setActivities(activities)
    }


    
    useEffect(() => {
        console.log('activities', activities);
    }, [activities])

    useEffect(() => {
        socketService.on(SOCKET_EMIT_ACTIVITY_LOG, onAddActivity)
        return () => {
            socketService.off(SOCKET_EMIT_ACTIVITY_LOG, (station) => { console.log('station', station) })
        }
    }, [])


    const onAddActivity = (data) => {
        console.log("🚀 ~ file: activity-log.jsx ~ line 9 ~ onAddActivity ~ data", data)
        const activity = {
            createdBy: data.createdBy,
            entityName: data.entity.name || data.entity.title,
            type: data.type,
        }
        activityService.save(activity)
        setActivities(prevActivities => [...prevActivities, activity])
    }

    return (
        <div className='activity-log'>
            {activities.map((activity, idx) => {
                return <section key={idx} className="activity-preview">
                    <div>{activity.createdBy?.fullname} </div>
                    <div>{activity.type} </div>
                    <div>{activity.entityName}</div>
                </section>
            }
            )
            }
        </div>
    )
}