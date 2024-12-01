import { Button, Logo, Screen } from "@/components"
import { AppStackScreenProps } from "@/navigators"
import { $styles } from "@/theme"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { FC } from "react"
import { View, ViewStyle } from "react-native"

interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in navigation via hook
  const navigation = useNavigation<any>()

  const gotoStartGame = () => {
    navigation.navigate("StartGame")
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
        <View style={$button}>
          <Button onPress={gotoStartGame}>Start</Button>
          <View style={$styles.gapMd} />
          <Button>Leaderboard</Button>
          <View style={$styles.gapMd} />
          <Button>Setting</Button>
        </View>
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
