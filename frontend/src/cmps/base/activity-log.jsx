import { socketService, SOCKET_EMIT_ACTIVITY_LOG, SOCKET_EMIT_ACTIVITY_LOG_BRODCAST } from '../../services/socket.service'
import { useEffect, useRef, useState } from 'react'
import { activityService } from '../../services/activity.service'
import { DefaultAvatarIcon } from '../../services/img.import.service'
import ReactTimeAgo from 'react-time-ago'

export const ActivityLog = () => {
    const [activities, setActivities] = useState([])
    const activityRef = useRef()

    useEffect(() => {
        loadActivities()
    }, [])

    useEffect(() => {
        socketService.on(SOCKET_EMIT_ACTIVITY_LOG, onAddActivity)
        socketService.on(SOCKET_EMIT_ACTIVITY_LOG_BRODCAST, onSetActivity)
        return () => {
            socketService.off(SOCKET_EMIT_ACTIVITY_LOG)
            socketService.off(SOCKET_EMIT_ACTIVITY_LOG_BRODCAST)
        }
    }, [])

    const loadActivities = async () => {
        const activities = await activityService.query()
        activities.forEach(activity => console.log(new Date(activity.createdAt).getTime))
        if (activities) setActivities(activities)
    }



    const onAddActivity = async (activity) => {
        setActivities(prevActivities => [...prevActivities, activity])
    }

    const onSetActivity = (data) => {
        const activity = getActivity(data)
        setActivities(prevActivities => [...prevActivities, activity])

    }


    const getActivity = (data) => {
        return {
            createdBy: data.createdBy,
            entityName: data.entity.name || data.entity.title,
            type: data.type,
            isStation: data.isStation,
            createdAt: data.createdAt
        }
    }

    const getFormattedActivity = (activity) => {
        const entityValue = (activity.isStation) ? 'playlist:' : 'song:'
        const txts = [entityValue, activity.entityName]
        return txts.join(' ')
    }

    return (
        <div className="activity-log">
            <div className="title">What's new ?</div>
            <div className="activity-log-container">

                {activities && activities.map((activity, idx) => {
                    const formattedActivity = getFormattedActivity(activity)
                    console.log(activity.createdBy?.avatar)
                    return <section key={idx} className="activity-preview">
                        <div className="user-container">

                            <div className="default-avatar-container">
                                {(activity.createdBy?.avatar) ?
                                    <img src={activity.createdBy?.avatar} alt="" />
                                    :
                                    <DefaultAvatarIcon />
                                }
                            </div>
                            <div className="username">{activity.createdBy?.fullname || 'Guest'}</div>
                        </div>
                        {<div className="activity-content">
                            <span className="activity-type"
                                style={activity.type === 'liked' ? { color: '#2e77d0' } : { color: 'lightcoral' }}>
                                {activity.type + '  '}
                            </span>
                            {formattedActivity}
                        </div>}

                        <div className="activity-timestamp"> <ReactTimeAgo date={activity.createdAt || Date.now()} locale="en-US" /> </div>

                        <div ref={activityRef}></div>
                    </section>
                }
                )
                }
            </div>
        </div>
    )
}