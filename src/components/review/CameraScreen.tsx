import { View, TouchableOpacity, Image, Text, Alert, Linking, Modal, Pressable } from 'react-native'
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera'
import React, { useState, useEffect, useRef } from "react"
import { useNavigation } from '@react-navigation/native'
import { cameraOcrApi } from '@/api/review/cameraOcrApi'
import { styles, text } from './CameraScreenStyle'

export default function CameraScreen() {

  const navigation = useNavigation()
  
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [imageData, setImageData] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // [ERROR] `Property 'takePictureAsync' does not exist on type 'never'.` 해결 위해서 <any> 타입 지정
  const cameraRef = useRef<any>();

  const takePicture = async (image : any) => {
    try {
      const response = await cameraOcrApi(image)

      if (response) {
        console.log("<문자 인식 결과>\n" + response)
        setImageData(image)
        setIsModalVisible(true)
      
      } else {
        console.log("문자 인식 불가")
        setImageData(null)
      }
    } catch (error) {
      console.error('Error while recognizing: ', error)
    }
  }

  useEffect(() => {
    setImageData(imageData)
  }, []);

  useEffect(() => {
    setIsModalVisible(isModalVisible)
  }, []);
  


  /*
  granted: 권한이 부여되었는지 여부를 판단
  status: 권한의 허용 여부를 판단
  canAskAgain: 만약 사용자가 권한 여부를 거절하였을 경우 다시 물어볼 수 있는지 여부
  */

 /* 권한 상태 확인 및 요청 함수 */
 const checkPermissions = async () => {
  if (!permission) return; // 권한 정보가 없으면 리턴

  if (permission.status !== "granted") {  // 권한 거부
    if (!permission.canAskAgain) {
      Alert.alert(
        "알림",
        "영수증 인식을 위해서는 카메라 권한이 필요합니다.",
        [
          { text: "취소", style: "cancel" },
          {
            text: "설정 열기",
            onPress: () => {
              Linking.openSettings(); // 설정을 여는 기능
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      requestPermission();  // 권한 재요청 가능한 경우 재요청
    }
  }
};

useEffect(() => {
  checkPermissions(); // 컴포넌트가 마운트될 때 권한 상태 확인
}, [permission]);

/* 촬영 방향 (전, 후면) 교체 함수 */
function toggleCameraFacing() {
  setFacing(current => (current === 'back' ? 'front' : 'back'));
}

/* 사진 촬영 함수 */
const takePictureHandler = async () => {
  if (!cameraRef.current) return;
  
  // `quality`: 화질(0.1~1), `base64`로 인코딩
  try {
    await cameraRef.current.takePictureAsync({ quality: 0.5, base64: true }).then((result : any) => {takePicture(result.base64)})
  } catch (e) {
    console.log(e);
  }
}

/* 의사 선택 화면으로 넘기는 함수 */
const pressModalButton = () => {
  setIsModalVisible(false)
  // navigation.navigate('ChooseDoctor' as never)
}


return (
  <View style={styles.container}>

    <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {navigation.goBack()}}>
          <Image source={require('@/public/assets/x.png')} style={styles.iconImage}/>
        </TouchableOpacity>
        <View style={[styles.iconImage, { marginHorizontal: 30 }]}/>
        <TouchableOpacity style={styles.button} onPress={takePictureHandler}>
          <Image source={require('@/public/assets/cameraIcon.png')} style={styles.iconImage}/>
        </TouchableOpacity>
        <View style={[styles.iconImage, { marginHorizontal: 30 }]}/>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Image source={require('@/public/assets/refresh.png')} style={styles.iconImage}/>
        </TouchableOpacity>
      </View>
    </CameraView>

    <View style={{ position: 'absolute' }}>
      <Modal animationType="fade" visible={isModalVisible} transparent={true}>
        <View style={styles.modalView}>
          <Pressable style={{ flexDirection: 'row' }} onPress={pressModalButton}>
            <Text style={[text.modalText, { color: '#52A35D' }]}>영수증 인증</Text>
            <Text style={[text.modalText, { color: 'white' }]}>이 완료되었습니다</Text>
          </Pressable>
        </View>
      </Modal>
    </View>

  </View>

  
  );
}
