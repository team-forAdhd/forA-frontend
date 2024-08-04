import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

interface StarRatingProps {
    rating: number
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const filledStars = Math.floor(rating)
    const unfilledStars = 5 - filledStars

    return (
        <View style={styles.starContainer}>
            {Array(filledStars)
                .fill(null)
                .map((_, index) => (
                    <Image
                        key={`filled-${index}`}
                        source={require('@/public/assets/med/filledStar.png')}
                        style={styles.star}
                    />
                ))}
            {Array(unfilledStars)
                .fill(null)
                .map((_, index) => (
                    <Image
                        key={`unfilled-${index}`}
                        source={require('@/public/assets/med/unfilledStar.png')}
                        style={styles.star}
                    />
                ))}
        </View>
    )
}

const styles = StyleSheet.create({
    starContainer: {
        flexDirection: 'row',
    },
    star: {
        width: 20,
        height: 20,
        marginRight: 2,
    },
})

export default StarRating
