import React, { useState } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { styles, text } from './NewPostStyle'

interface CategoryButtonProps {
    category: string
    onSelectCategory: (category: string) => void // 카테고리 선택 시 부모 컴포넌트로 전달할 콜백 함수
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
    category,
    onSelectCategory,
}) => {
    const [isSelected, setIsSelected] = useState<boolean>(false)

    const handleCategorySelect = () => {
        setIsSelected((prev) => !prev)
        onSelectCategory(category)
    }

    return (
        <TouchableOpacity
            style={[
                styles.categoryButton,
                isSelected ? styles.selectedCategoryButton : null,
            ]}
            onPress={handleCategorySelect}
        >
            <Text
                style={[
                    text.categoryButtonText,
                    isSelected ? text.selectedCategoryButtonText : null,
                ]}
            >
                {category}
            </Text>
        </TouchableOpacity>
    )
}

export default CategoryButton
