import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 16,
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    backIcon: {
        width: 100,
        height: 100,
    },
    placeholder: {
        width: 24,
    },
    sortContainer: {
        alignItems: 'flex-end',
        marginBottom: 12,
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
    },
    sortIcon: {
        width: 16,
        height: 16,
        marginLeft: 6,
    },
    listContainer: {
        paddingBottom: 20,  // 하단 여백 추가 (스크롤 시 잘리지 않게)
    },
    pharmacyContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center', 
        width: 350,
    },
    image: {
        width: 70, 
        height: 70,  
        borderRadius: 10,
        resizeMode: 'contain',
        marginRight: 16,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 4,
        width: 60, 
    },
    bookmarkButton: {
        padding: 8,
        alignItems: 'center',  
        justifyContent: 'center',
    },
    bookmarkIcon: {
        width: 24,
        height: 30,
    },
});

export const text = {
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#232323',
    },
    sortText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#555',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#232323',
    },
    engName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4CAF50',
    },
    manufacturer: {
        fontSize: 12,
        color: '#888',
    },
};
