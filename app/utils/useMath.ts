import { useStores } from "@/models"
import { useState, useRef, useEffect } from "react"
import { Difficulties } from "./constants/game"

interface IExpression {
  value: number
  expression: string
}

interface IQuiz {
  expression1: IExpression
  expression2: IExpression
  result: ">" | "<" | "="
  correct: boolean
}

const TEMP_QUIZ: IQuiz = {
  expression1: {
    value: 0,
    expression: "0",
  },
  expression2: {
    value: 1,
    expression: "1",
  },
  correct: false,
  result: "=",
}

export const useMath = () => {
  // State variables
  const [userRequest, setUserRequest] = useState<IQuiz[]>([])
  const [isQuizActive, setIsQuizActive] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [duration, setDuration] = useState(0)
  const [lastQuestionTimestamp, setLastQuestionTimestamp] = useState(Date.now())
  const [currentDifficulty, setCurrentDifficulty] = useState(1)
  const [currentSymbol, setCurrentSymbol] = useState<string | null>(null)

  const currentQuiz = useRef<IQuiz>(TEMP_QUIZ)

  // Optional: Any side effects can be handled here, for example, starting a timer for timeLeft.
  useEffect(() => {
    if (isQuizActive) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => Math.max(0, prevTime - 1)) // Decrement timeLeft
      }, 1000)

      return () => clearInterval(timer) // Cleanup on unmount or when quiz is inactive
    }
  }, [isQuizActive])

  const getRandomNumber = (min: number = 1, max: number = 100) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  const getResultByExpression = (expr1: number, expr2: number): "<" | ">" | "=" => {
    return expr1 > expr2 ? ">" : expr1 < expr2 ? "<" : "="
  }
  const generateExpression = (min: number, max: number, numTerms: number): IExpression => {
    const operators = ["+", "-", "*", "/"]
    let expression: string = `${getRandomNumber(min, max)}` // Bắt đầu với số đầu tiên

    for (let i = 1; i < numTerms; i++) {
      const operator = operators[Math.floor(Math.random() * operators.length)]
      const num = getRandomNumber(min, max)
      expression += ` ${operator} ${num}`
    }

    const value: number = eval(expression)
    return { expression, value }
  }

  const { gameLevelStore } = useStores()

  const generateNewQuiz = () => {
    const { level } = gameLevelStore
    const min = level === Difficulties.EASY ? 1 : level === Difficulties.NORMAL ? 6801 : 969001
    const max = level === Difficulties.EASY ? 100 : level === Difficulties.NORMAL ? 6899 : 969999

    const numTerms = level === Difficulties.EASY ? 2 : level === Difficulties.NORMAL ? 2 : 3

    const expr1 = generateExpression(min, max, numTerms)
    const expr2 = generateExpression(min, max, numTerms)

    setCurrentSymbol(null)

    currentQuiz.current = {
      expression1: expr1,
      expression2: expr2,
      result: getResultByExpression(expr1.value, expr2.value),
      correct: false,
    }
  }

  const startQuiz = () => {
    setIsQuizActive(true)
    setTimeLeft(60)
    generateNewQuiz()
  }

  const submitAnswer = (answer: ">" | "<" | "=") => {
    const isCorrect = currentQuiz.current.result === answer
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1)
    }
    setCurrentSymbol(answer)
    setLastQuestionTimestamp(Date.now())
    setUserRequest((prev) => [...prev, { ...currentQuiz.current, correct: isCorrect }])
    generateNewQuiz()
  }

  const endQuiz = () => {
    setIsQuizActive(false)
    // Handle any final logic here (e.g., show the final score, reset state, etc.)
  }

  return {
    userRequest,
    currentQuiz: currentQuiz.current,
    currentSymbol,
    currentDifficulty,
    isQuizActive,
    score,
    timeLeft,
    duration,
    lastQuestionTimestamp,
    startQuiz,
    submitAnswer,
    endQuiz,
    setCurrentDifficulty,
  }
}
