import { ViewStyle } from "react-native"
import { spacing } from "./spacing"

/* Use this file to define styles that are used in multiple places in your app. */
export const $styles = {
  row: { flexDirection: "row" } as ViewStyle,
  flex1: { flex: 1 } as ViewStyle,
  flexWrap: { flexWrap: "wrap" } as ViewStyle,

  container: {
    paddingTop: spacing.lg + spacing.xl,
    paddingHorizontal: spacing.lg,
  } as ViewStyle,

  toggleInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  } as ViewStyle,

  gapXss: {
    height: spacing.xxs,
    width: "100%",
  } as ViewStyle,

  gapXs: {
    height: spacing.xs,
    width: "100%",
  } as ViewStyle,

  gapSm: {
    height: spacing.sm,
    width: "100%",
  } as ViewStyle,

  gapMd: {
    height: spacing.md,
    width: "100%",
  } as ViewStyle,

  gapLg: {
    height: spacing.lg,
    width: "100%",
  } as ViewStyle,

  gapXl: {
    height: spacing.xl,
    width: "100%",
  } as ViewStyle,

  gapXxl: {
    height: spacing.xxl,
    width: "100%",
  } as ViewStyle,
}
