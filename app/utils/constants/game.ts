import { IGameDifficulty, IGameType } from "../types/gameTypes"

export const GameDifficulties: IGameDifficulty[] = [
  {
    label: "Easy",
    value: "easy",
  },
  {
    label: "Normal",
    value: "normal",
    severity: "",
  },
  {
    label: "Hard",
    value: "hard",
    severity: "",
  },
]
export const Difficulties = {
  EASY: "easy",
  NORMAL: "normal",
  HARD: "hard",
}
export const DifficultiesByValue = ["Easy", "Normal", "Hard"]
export const GameTypes: IGameType[] = [
  {
    label: "1 minute",
    value: 60,
  },
  {
    label: "3 minutes",
    value: 180,
    severity: "",
  },
  {
    label: "5 minutes",
    value: 300,
    severity: "",
  },
]
