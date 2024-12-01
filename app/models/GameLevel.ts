import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const GameLevelModel = types
  .model("GameLevel")
  .props({
    level: types.optional(types.string, ""),
    time: types.optional(types.number, 1),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setLevel(level: string) {
      self.level = level
    },
    setTime(time: number) {
      self.time = time
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface GameLevel extends Instance<typeof GameLevelModel> {}
export interface GameLevelSnapshotOut extends SnapshotOut<typeof GameLevelModel> {}
export interface GameLevelSnapshotIn extends SnapshotIn<typeof GameLevelModel> {}
export const createGameLevelDefaultModel = () => types.optional(GameLevelModel, {})
