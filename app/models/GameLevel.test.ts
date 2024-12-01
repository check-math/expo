import { GameLevelModel } from "./GameLevel"

test("can be created", () => {
  const instance = GameLevelModel.create({})

  expect(instance).toBeTruthy()
})
