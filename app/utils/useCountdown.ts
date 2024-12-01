import { useState, useEffect, useCallback } from "react"

export const useCountdown = (initialSeconds: number): [number, () => void] => {
  const [seconds, setSeconds] = useState<number>(initialSeconds)

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1)
      }, 1000)

      return () => clearInterval(timerId)
    }
  }, [seconds])

  const resetCountdown = useCallback(() => {
    setSeconds(initialSeconds)
  }, [initialSeconds])

  return [seconds, resetCountdown]
}
