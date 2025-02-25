import React, { useRef } from 'react';
import { Animated, Dimensions, PanResponder } from 'react-native';

export default function AnimatedContainer({
    scrollable,
    children,
}: {
    scrollable: boolean;
    children: React.ReactNode;
}) {
    const screenHeight = Dimensions.get('window').height;
    const translateY = useRef(new Animated.Value(screenHeight * 0.7)).current;
    const lastGestureY = useRef(screenHeight * 0.7);

    const SNAP_POINTS = {
        TOP: screenHeight * 0.2,
        MIDDLE: screenHeight * 0.5,
        BOTTOM: screenHeight * 0.7,
    };

    const snapToPoint = (point: number) => {
        lastGestureY.current = point;
        Animated.spring(translateY, {
            toValue: point,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const getClosestSnapPoint = (y: number) => {
        const points = [
            SNAP_POINTS.TOP,
            SNAP_POINTS.MIDDLE,
            SNAP_POINTS.BOTTOM,
        ];
        return points.reduce((prev, curr) =>
            Math.abs(curr - y) < Math.abs(prev - y) ? curr : prev,
        );
    };

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                // Only respond to vertical gestures
                return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
            },
            onPanResponderGrant: () => {
                translateY.setValue(lastGestureY.current);
            },
            onPanResponderMove: (_, gestureState) => {
                if (scrollable) {
                    const newY = lastGestureY.current + gestureState.dy;
                    // Limit the movement between top and bottom positions
                    if (newY >= SNAP_POINTS.TOP && newY <= SNAP_POINTS.BOTTOM) {
                        translateY.setValue(newY);
                    }
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                const currentY = lastGestureY.current + gestureState.dy;
                const snapPoint = getClosestSnapPoint(currentY);
                snapToPoint(snapPoint);
            },
        }),
    ).current;
    return (
        <Animated.View
            style={{
                height: screenHeight - 200,
                width: '100%',
                transform: [{ translateY }],
                backgroundColor: 'white',
                zIndex: 10,
                borderRadius: 20,
                flexDirection: 'column',
            }}
            {...(scrollable ? panResponder.panHandlers : {})}
        >
            {children}
        </Animated.View>
    );
}
