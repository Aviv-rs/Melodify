import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffectUpdate } from '../../hooks/useEffectUpdate'
import { setUserMsg } from '../../store/actions/user.action'

export const UserMsg = () => {

  const msg = useSelector(storeState => storeState.userModule.msg)
  const dispatch = useDispatch()
  

  let timeoutIdRef = useRef(null)

  const onCloseMsg = () => {
    dispatch(setUserMsg(null))
  }

  useEffectUpdate(() => {

    if (!msg) return
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current)

    timeoutIdRef.current = setTimeout(() => {
      onCloseMsg()
    }, 3000)

    return () => {
      clearTimeout(timeoutIdRef.current)
      dispatch(setUserMsg(null))
    }
  }, [msg])

  const msgClass = msg?.type || ''
  return (
    <section className="user-msg-container" >
      {msg && <>
        {/* <button className='btn-close-msg' onClick={onCloseMsg}>x</button>  */}
        <div className={'user-msg ' + msgClass}>
          {msg.txt}
        </div> </>}
    </section>
  )

}
