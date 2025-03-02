import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles, text } from '../../TodayNewPost/screens/NewPostStyle';

interface CategoryButtonProps {
    selected: string;
    category: string;
    onSelectCategory: (category: string) => void; // 카테고리 선택 시 부모 컴포넌트로 전달할 콜백 함수
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
    selected,
    category,
    onSelectCategory,
}) => {
    const isSelected = selected.includes('30대')
        ? '30대' === category.slice(0, 3)
        : selected === category;
    const handleCategorySelect = () => {
        if (category.includes('30대')) {
            onSelectCategory('30대 이상');
            return;
        }
        onSelectCategory(category);
    };

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
    );
};

export default CategoryButton;
