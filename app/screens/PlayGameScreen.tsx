import { Button, Icon, Logo, Screen, Text } from "@/components"
import { useStores } from "@/models"
import { AppStackScreenProps } from "@/navigators"
import { $styles } from "@/theme"
import { useCountdown } from "@/utils/useCountdown"
import { useMath } from "@/utils/useMath"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { FC, useEffect, useState } from "react"
import { View, ViewStyle } from "react-native"

interface PlayGameScreenProps extends AppStackScreenProps<"PlayGame"> {}

export const PlayGameScreen: FC<PlayGameScreenProps> = observer(function PlayGameScreen() {
  // Pull in one of our MST stores
  const { gameLevelStore } = useStores()
  const { startQuiz, currentQuiz, endQuiz, submitAnswer, score, userRequest } = useMath()

  const [gameOver, setGameOver] = useState(false)
  // Pull in navigation via hook
  const navigation = useNavigation<any>()
  const [countdown, resetCountdown] = useCountdown(gameLevelStore.time * 60) // 60 seconds countdown

  useEffect(() => {
    startQuiz()
  }, [])

  const gotoHome = () => {
    navigation.replace("Home")
  }

  const handleCheckAnswer = (answer: "<" | ">" | "=") => {
    submitAnswer(answer)
  }

  const handlePlayAgain = () => {
    startQuiz()
    setGameOver(false)
  }

  useEffect(() => {
    if (countdown === 0) {
      endQuiz()
      setGameOver(true)
      resetCountdown()
    }
  }, [countdown, endQuiz, resetCountdown])

  const Game = () => {
    return (
      <View style={$container}>
        <Text text={countdown + "s"} size="xxl" weight="bold" />
        <Text text={`Score: ${score}`} size="xxl" weight="bold" />
        <View style={$styles.gapXxl} />
        <View style={$styles.gapXxl} />
        <View style={$expression1}>
          <View style={$expression1Content}>
            <Text text={currentQuiz.expression1.expression} size="xxl" />
            <Text text={currentQuiz.expression2.expression} size="xxl" />
          </View>
        </View>
        <View style={$styles.gapXxl} />
        <View style={$expression2}>
          <View style={$expressionContent}>
            <Button style={$styles.flex1} onPress={() => handleCheckAnswer("<")}>
              {"<"}
            </Button>
            <Button style={$styles.flex1} onPress={() => handleCheckAnswer("=")}>
              =
            </Button>
            <Button style={$styles.flex1} onPress={() => handleCheckAnswer(">")}>
              {">"}
            </Button>
          </View>
        </View>
      </View>
    )
  }

  const Result = () => {
    return (
      <View style={$resultContainer}>
        <View style={$containerResult}>
          <View style={$rowResult}>
            <Text text={`Answer:`} size="xl" weight="bold" />
            <Text text={`${userRequest.length}`} size="xl" weight="bold" />
          </View>
          <View style={$rowResult}>
            <Text text={`Correct:`} size="xl" weight="bold" />
            <Text text={`${userRequest.filter((v) => v.correct).length}`} size="xl" weight="bold" />
          </View>
          <View style={$rowResult}>
            <Text text={`Level:`} size="xl" weight="bold" />
            <Text text={`${gameLevelStore.level}`} size="xl" weight="bold" />
          </View>
          <View style={$rowResult}>
            <Text text={`Time:`} size="xl" weight="bold" />
            <Text text={`${gameLevelStore.time + "m"}`} size="xl" weight="bold" />
          </View>
          <View style={$rowResult}>
            <Text text={`Score: `} size="xl" weight="bold" />
            <Text text={`${score}`} size="xl" weight="bold" />
          </View>
        </View>
        <View style={$styles.gapXxl} />
        <View style={$root}>
          <Button onPress={() => handlePlayAgain()}>Play Again</Button>
          <View style={$styles.gapMd} />
          <Button onPress={() => gotoHome()}>Home</Button>
        </View>
      </View>
    )
  }

  return (
    <Screen
      style={[$root, $styles.container]}
      preset="scroll"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$root}
    >
      <View style={$back}>
        <Icon icon="back" onPress={gotoHome} />
      </View>
      <View style={$logo}>
        <Logo />
      </View>
      {!gameOver ? <Game /> : <Result />}
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $back: ViewStyle = {
  alignItems: "flex-start",
  width: "100%",
}

const $resultContainer: ViewStyle = {
  flex: 1,
  justifyContent: "space-between",
}

const $rowResult: ViewStyle = {
  width: "100%",
  justifyContent: "space-between",
  flexDirection: "row",
  alignItems: "center",
}

const $logo: ViewStyle = {
  flex: 1,
  alignItems: "center",
}

const $container: ViewStyle = {
  flex: 1,
  justifyContent: "space-between",
  alignItems: "center",
}

const $containerResult: ViewStyle = {
  flex: 1,
  alignItems: "center",
}

const $expression1: ViewStyle = {
  flexDirection: "row",
}

const $expression1Content: ViewStyle = {
  flexDirection: "row",
  flex: 1,
  justifyContent: "space-between",
}

const $expression2: ViewStyle = {
  flexDirection: "row",
}

const $expressionContent: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
}
