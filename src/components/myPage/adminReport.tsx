import { useTranslation } from 'react-i18next';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import { styles, text } from './adminReportStyles';
import { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ProfileStoreContext } from '@/state/signupState';
import { Observer } from 'mobx-react';
import getUser from '@/api/myPage/getUser';
import updatePushNotificationApprovals from '@/api/myPage/putNotiApprove'; // 푸시 알림 승인 상태 업데이트
import { getUserProfileApi } from '@/api/getUserProfileApi';
import { useAuthStore } from '@/store/authStore'; // 사용자 인증 정보 저장
import { getReport } from '@/api/myPage/getReport';
import { postHandleReport } from '@/api/myPage/getReport'; 

interface Report {
    id: number;
    title: string;
    category: string;
    images: string[];
    likeCount: number;
    commentCount: number;
    viewCount: number;
    nickname: string;
    createdAt: string;
    reportTypeCounts: { [key: string]: number };
    anonymous: boolean;
    email: string;
}

export default function AdminReport () {
    const store = useContext(ProfileStoreContext); // 사용자 프로필 관련 데이터 관리
    const updateUser = useAuthStore((state) => state.updateUser); //updateUser 함수를 사용해서 사용자 정보를 업데이트 하는 데 사용
    const [report, setReport] = useState<Report[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const navigation = useNavigation()

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const data = await getReport();
                console.log("API Response:", JSON.stringify(data, null, 2));
                setReport(data?.postReportList ? data.postReportList : []);
            } catch (error) {
                console.error('Error fetching reported posts:', error);
                setReport([]);
            }
        };

        fetchReports();
    }, []);

    const handleOpenModal = (post) => {
        setSelectedReport(post)
        setModalVisible(true)
    };

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();
    };

    const handleReportAction = async (actionType: string) => {
        if (!selectedReport) return;
        try {
            const response = await postHandleReport(selectedReport.email, selectedReport.id, actionType);
            if (response) {
                Alert.alert("신고 처리 완료", "게시글이 정상적으로 처리되었습니다.");
            }
        } catch (error) {
            Alert.alert("오류 발생", "신고 처리 중 문제가 발생했습니다.");
        }
        setModalVisible(false);
    };

    return(
        <View style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('@/public/assets/back.png')}
                        style={styles.IconImage}
                    />
                </TouchableOpacity>
                <Text style={text.headerText}> 신고 내역</Text>
                <View style={styles.IconImage} />
            </View>
            <ScrollView contentContainerStyle={{paddingTop: 95}}>
                {Array.isArray(report) && report.length > 0 ? (
                    report.map((post) => (
                        <TouchableOpacity 
                            key={post.id || Math.random().toString(36).substr(2, 9)} 
                            style={styles.postContainer}
                            onPress={() => navigation.navigate('PostDetail', { postId: post.id })}>
                            <View style={styles.postInfo}>
                                <Text style={styles.postTitle}>
                                    {post.reportTypeCounts
                                        ? Object.entries(post.reportTypeCounts)
                                            .map(([type, count]) => `${type} ${count}회`)
                                            .join(', ')
                                        : "신고 없음"} 
                                    {post.title || "제목 없음"}
                                </Text>
                                <View style={styles.metaContainer}>
                                    <Text style={styles.category}>{post.category || "카테고리 없음"}</Text>
                                    <Text style={styles.metaText}>조회 {post.viewCount || 0}</Text>
                                    <Text style={styles.metaText}>좋아요 {post.likeCount || 0}</Text>
                                    <Text style={styles.metaText}>댓글 {post.commentCount || 0}</Text>
                                </View>
                                <Text style={styles.timeText}>{post.createdAt ? formatDate(post.createdAt) : "날짜 없음"}</Text>
                            </View>
                            {post.images?.length > 0 && (
                                <Image source={{ uri: post.images[0] }} style={styles.postImage} />
                            )}
                            {post.email && (
                                <TouchableOpacity 
                                    onPress={() => handleOpenModal(post)}
                                    style={styles.emailContainer}>
                                    <Text style={styles.emailText}>작성자 이메일: {post.email}</Text>
                                </TouchableOpacity>
                            )}
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={text.noDataText}>신고된 게시글이 없습니다.</Text>
                )}
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{selectedReport?.email}아이디에 조치를 취하겠습니까?</Text>
                        <TouchableOpacity onPress={() => handleReportAction('DAY_2_PAUSE')}>
                            <Text style={styles.modalOption}>2일 활동 정지와 글 삭제</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleReportAction('DAY_ALL_PAUSE')}>
                            <Text style={styles.modalOption}>영구 활동 정지와 글 삭제</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleReportAction('POST_DELETE')}>
                            <Text style={styles.modalOption}>글만 삭제하기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalCancel}>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
    
}