import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    StyleProp,
    TextStyle,
} from 'react-native';

interface CategoryButtonProps {
    category: string;
    isSelected: boolean;
    onSelectCategory: (category: string) => void; // 카테고리 선택 시 부모 컴포넌트로 전달할 콜백 함수
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
    category,
    isSelected,
    onSelectCategory,
}) => {
    const handleCategorySelect = () => {
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

const styles = StyleSheet.create({
    categoryButton: {
        display: 'flex',
        width: 70,
        height: 33,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 500,
        backgroundColor: '#EEE',
        marginRight: 8,
    },
    selectedCategoryButton: {
        backgroundColor: '#52A55D',
    },
});

const text = {
    categoryButtonText: {
        color: '#232323',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22.4,
        letterSpacing: -0.8,
    },
    selectedCategoryButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22.4,
        letterSpacing: -0.8,
    },
} as {
    [key: string]: StyleProp<TextStyle>;
};
