import { socketService, SOCKET_EMIT_ENTERED_STATION, SOCKET_EMIT_STATION_UPDATED, SOCKET_EMIT_ACTIVITY_LOG } from '../../services/socket.service'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
export const ActivityLog = () => {
    const { stationId } = useParams()
    const [messages, setMessages] = useState([])

    const onAddMsg = (data) => {
    console.log("🚀 ~ file: activity-log.jsx ~ line 9 ~ onAddMsg ~ data", data)
        const msg = {
            username: data.user.username,
            entityName: data.entity.name || data.entity.title,
            type: data.type,
        }
        setMessages(prevMsgs => [...prevMsgs, msg])
    }

    useEffect(() => {
        console.log('messages', messages);
    }, [messages])

    useEffect(() => {
        socketService.on(SOCKET_EMIT_ACTIVITY_LOG, onAddMsg)
        return () => {
            socketService.off(SOCKET_EMIT_ACTIVITY_LOG, (station) => { console.log('station', station) })
        }
    }, [])

    return (
        <div className='activity-log'>
            {messages.map((msg, idx) => {
                return <section key={idx} className="message-preview">
                    <div>{msg.username} </div>
                    <div>{msg.type} </div>
                    <div>{msg.entityName}</div>
                </section>
            }
            )
            }
        </div>
    )
}