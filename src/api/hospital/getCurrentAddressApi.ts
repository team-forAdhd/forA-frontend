import axios from 'axios'

const getCurrentAddress = async (
    latitude: number,
    longitude: number,
    apiKey: string,
) => {
    try {
        const response = await axios.get(
            'https://maps.googleapis.com/maps/api/geocode/json',
            {
                params: {
                    latlng: `${latitude},${longitude}`,
                    key: apiKey,
                    language: 'ko',
                },
            },
        )
        if (response.data.status === 'OK') {
            return response.data.results[0]?.formatted_address
        } else {
            console.error('Error:', response.data.status)
            return null
        }
    } catch (error) {
        console.error('Geocoding API request failed:', error)
        return null
    }
}

export default getCurrentAddress
