import { images } from "@/theme/images"
import { observer } from "mobx-react-lite"
import React, { useEffect, useMemo } from "react"
import { ImageStyle, StyleProp, View, ViewStyle } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated"

export interface LogoProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */

const LogoComponent: React.FC<LogoProps> = (props: LogoProps) => {
  const { style } = props
  const $styles = useMemo(() => [$container, style], [style])

  // Animation setup
  const spinValue = useSharedValue(0)
  const zoomValue = useSharedValue(1)

  useEffect(() => {
    spinValue.value = withRepeat(
      withSequence(withTiming(1, { duration: 3000 }), withTiming(0, { duration: 3000 })),
      -1,
    )

    zoomValue.value = withRepeat(
      withSequence(withTiming(1.2, { duration: 3000 }), withTiming(1, { duration: 3000 })),
      -1,
    )
  }, [spinValue, zoomValue])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${spinValue.value * 360}deg` }, { scale: zoomValue.value }],
    }
  })

  return (
    <View style={$styles}>
      <Animated.Image source={images.logo} style={[$logo, animatedStyle]} resizeMode="contain" />
    </View>
  )
}

export const Logo = React.memo(observer(LogoComponent))

const $container: ViewStyle = {
  justifyContent: "center",
}

const $logo: ImageStyle = {
  width: 200,
}
