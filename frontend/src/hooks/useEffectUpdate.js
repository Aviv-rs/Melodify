import { useEffect, useRef } from "react"

export const useEffectUpdate = (cb, dependencies) => {

    const isMounted = useRef(false)
    
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return
        }
        cb()
    }, dependencies)
}