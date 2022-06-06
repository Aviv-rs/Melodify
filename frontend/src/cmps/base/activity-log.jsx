import { socketService, SOCKET_EMIT_ACTIVITY_LOG, SOCKET_EMIT_ACTIVITY_LOG_BRODCAST } from '../../services/socket.service'
import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { activityService } from '../../services/activity.service'
import { DefaultAvatarIcon } from '../../services/img.import.service'
export const ActivityLog = () => {
    const { stationId } = useParams()
    const [activities, setActivities] = useState([])
    const activityRef = useRef()

    useEffect(() => {
        loadActivities()
    }, [])

    const loadActivities = async () => {
        const activities = await activityService.query()
        if (activities) setActivities(activities)
    }

    useEffect(() => {
    }, [activities])

    useEffect(() => {
        socketService.on(SOCKET_EMIT_ACTIVITY_LOG, onAddActivity)
        socketService.on(SOCKET_EMIT_ACTIVITY_LOG_BRODCAST, onSetActivity)
        return () => {
            socketService.off(SOCKET_EMIT_ACTIVITY_LOG, (station) => { console.log('station', station) })
        }
    }, [])


    const onAddActivity = (data) => {
        const activity = getActivity(data)
        activityService.save(activity)
        setActivities(prevActivities => [...prevActivities, activity])
        // activityRef.current.scrollIntoView()
    }

    const onSetActivity = (data) => {
        const activity = getActivity(data)
        setActivities(prevActivities => [...prevActivities, activity])
        activityRef.current.scrollIntoView()
    }


    const getActivity = (data) => {
        return {
            createdBy: data.createdBy,
            entityName: data.entity.name || data.entity.title,
            type: data.type,
            isStation: data.isStation
        }
    }

    const getFormattedActivity = (activity) => {
        const entityValue = (activity.isStation) ? 'playlist :' : 'song :'
        const txts = [activity.type, entityValue, activity.entityName]
        return txts.join(' ')
    }

    return (
        <div className='activity-log'>
            <div>What's new ?</div>
            <div className='activity-log-container'>

                {activities.map((activity, idx) => {
                    return <section key={idx} className="activity-preview">
                        <div className='user-container'>

                            <div className='default-avatar-container'>
                                {(activity.createdBy?.avatar) ?

                                    <img src={activity.createdBy.avatar} alt="" />

                                    :

                                    <DefaultAvatarIcon />

                                }
                            </div>
                            <div className='username'>{activity.createdBy.fullname}</div>
                        </div>
                        {getFormattedActivity(activity)}


                        <div ref={activityRef}></div>
                    </section>
                }
                )
                }
            </div>
        </div>
    )
}