import { Button, Logo, Screen } from "@/components"
import { useStores } from "@/models"
import { AppStackScreenProps } from "@/navigators"
import { $styles } from "@/theme"
import { GameLevel } from "@/utils/enum"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { FC, useCallback, useState } from "react"
import { View, ViewStyle } from "react-native"

interface StartGameScreenProps extends AppStackScreenProps<"StartGame"> {}

enum Step {
  SETTING_LEVEL,
  SETTING_TIME,
}

export const StartGameScreen: FC<StartGameScreenProps> = observer(function StartGameScreen() {
  const rootStore = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  // states
  const [step, setStep] = useState<Step>(Step.SETTING_LEVEL)

  const gotoPlayGame = useCallback(() => {
    navigation.navigate("PlayGame")
  }, [])

  const handleSetupLevel = useCallback((level: GameLevel) => {
    rootStore.gameLevelStore.setLevel(level)
    setStep(Step.SETTING_TIME)
  }, [])

  const handleSetupTime = useCallback((time: number) => {
    rootStore.gameLevelStore.setTime(time)
    gotoPlayGame()
  }, [])

  const SettingLevel = () => {
    return (
      <View style={$button}>
        <Button onPress={() => handleSetupLevel(GameLevel.EASY)}>Easy</Button>
        <View style={$styles.gapMd} />
        <Button onPress={() => handleSetupLevel(GameLevel.MEDIUM)}>Normal</Button>
        <View style={$styles.gapMd} />
        <Button onPress={() => handleSetupLevel(GameLevel.HARD)}>Hard</Button>
      </View>
    )
  }

  const SettingTime = () => {
    return (
      <View style={$button}>
        <Button onPress={() => handleSetupTime(1)}>1 minute</Button>
        <View style={$styles.gapMd} />
        <Button onPress={() => handleSetupTime(3)}>3 minutes</Button>
        <View style={$styles.gapMd} />
        <Button onPress={() => handleSetupTime(5)}>5 minutes</Button>
      </View>
    )
  }

  return (
    <Screen
      style={[$root, $styles.container]}
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={$root}
    >
      <View style={$container}>
        <Logo />
        {step === Step.SETTING_LEVEL && <SettingLevel />}
        {step === Step.SETTING_TIME && <SettingTime />}
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  height: "100%",
}

const $button: ViewStyle = {
  flex: 1,
  width: "60%",
  justifyContent: "center",
}
