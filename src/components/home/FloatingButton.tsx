import React from 'react'
import {
    TouchableOpacity,
    Image,
    ViewStyle,
    ImageStyle,
    ImageSourcePropType,
} from 'react-native'

interface FloatingButtonProps {
    onPress: () => void
    source: ImageSourcePropType // 이미지 소스 타입
    style: ViewStyle // 버튼 컨테이너 스타일 타입
    iconStyle: ImageStyle // 이미지 스타일 타입
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
    onPress,
    source,
    style,
    iconStyle,
}) => {
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <Image source={source} style={iconStyle} />
        </TouchableOpacity>
    )
}

export default FloatingButton
