declare module 'react-native-easy-gestures' {
	import { Component, ReactNode } from 'react';
	import { GestureResponderEvent, ViewStyle } from 'react-native';
	type Props = {
		children?: ReactNode
		style?: ViewStyle
		rotatable?: boolean
		draggable?: boolean | {
			x?: boolean
			y?: boolean
		}
		scalable?: boolean | {
			min?: number
			max?: number
		}
		onStart?(event: GestureResponderEvent, styles: ViewStyle): void
		onChange?(event: GestureResponderEvent, styles: ViewStyle): void
		onEnd?(event: GestureResponderEvent, styles: ViewStyle): void
		onMultyTouchStart?(event: GestureResponderEvent, styles: ViewStyle): void
		onMultyTouchChange?(event: GestureResponderEvent, styles: ViewStyle): void
		onMultyTouchEnd?(event: GestureResponderEvent, styles: ViewStyle): void
		onRotateStart?(event: GestureResponderEvent, styles: ViewStyle): void
		onRotateChange?(event: GestureResponderEvent, styles: ViewStyle): void
		onRotateEnd?(event: GestureResponderEvent, styles: ViewStyle): void
		onScaleStart?(event: GestureResponderEvent, styles: ViewStyle): void
		onScaleChange?(event: GestureResponderEvent, styles: ViewStyle): void
		onScaleEnd?(event: GestureResponderEvent, styles: ViewStyle): void
	}
	export default class Gestures extends Component<Props> {
		reset(): void
	}
}