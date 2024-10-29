import { View, TouchableOpacity, Image, Text, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { styles, text } from './ChooseDoctorStyle'

export default function ChooseDoctor() {

  const navigation = useNavigation()
  
  const [choice, setChoice] = useState<string>('')

  const selectChoice = (id : string) => {
    setChoice(id)
  }

  useEffect(() => {
    setChoice(choice)
  }, []);


  return (
    <View style={styles.container}>
    
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={1} onPress={() => {navigation.goBack()}}>
          <Image
            source={require('@/public/assets/back.png')}
            style={styles.iconImage}
          />
        </TouchableOpacity>
      </View>


      {/* 메시지 박스 */}
      <View style={styles.messageContainer}>
        <Text style={text.headerText}>칭찬을 남길 의사선생님을 선택해주세요</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={text.normalText}>의사</Text>
        <Text style={[text.normalText, { color: '#52A35D', marginLeft: 5 }]}>{doctorList.length}</Text>
      </View>


      {/* 스크롤 뷰 */}
      <View style={styles.scrollContainer}>
        <ScrollView style={{ flex: 1, width: '100%', backgroundColor: '#fff' }}>
          <View>
            {doctorList.map((data) => (
              // `Warning: Each child in a list should have a unique "key" prop.` 해결 위해 고유 key 부여
              <View style={{ flex: 1 }} key={data.doctorId}>
                <TouchableOpacity activeOpacity={1} onPress={() => selectChoice(data.doctorId)}
                                  style={[styles.boxContainer,
                                          choice === data.doctorId
                                            ? { backgroundColor: '#F4F9D9', borderColor: '#52A35D' }
                                            : { borderColor: '#EBEBEB' }
                                  ]}>
                  <Image
                    source={data.image ? {uri:data.image} : require('@/public/assets/defaultDoctor.png')}
                    style={styles.doctorImage}
                  />

                  <View style={{ left: 10, flexDirection: 'row' }}>
                    <Text style={{color: choice === data.doctorId ? '#52A35D' : '#232323' }}>
                      <Text style={[text.boxText, { fontWeight: 'bold' }]}>{data.name}</Text>
                      <Text style={text.boxText}> 선생님</Text>
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
            {
            <TouchableOpacity activeOpacity={1} onPress={() => selectChoice("NONE")}
                              style={[styles.boxContainer,
                                      choice === 'NONE'
                                        ? { backgroundColor: '#E4EAC9', borderColor: '#52A35D' }
                                        : { borderColor: '#EBEBEB' }
                              ]}>
              <Image
                source={require('@/public/assets/image.png')}
                style={styles.doctorImage}
              />

              <View style={{ left: 10 }}>
                <Text style={[text.boxText, {color: choice === 'NONE' ? '#52A35D' : '#232323' }]}>선택 안 함</Text>
              </View>
            </TouchableOpacity>
            }
          </View>
        </ScrollView>
      </View>


      {/* 하단 버튼 */}
      <TouchableOpacity activeOpacity={1}
                        disabled={choice ? false : true}
                        onPress={() => navigation.navigate('HospitalReview' as never)}
                        style={[styles.buttonContainer,
                                choice
                                  ? { backgroundColor: '#52A35D'}
                                  : { backgroundColor: '#EEE'}
                                ]}>
        <Text style={[text.buttonText,
                      choice
                        ? { color: 'white'}
                        : { color: '#232323'}
                    ]}>다음</Text>
      </TouchableOpacity>


    </View>
  )
}

// 더미 데이터
const doctorList = [
  {
      doctorId: 'D12345',
      name: '김코코',
      image: '',
        totalGrade: 4.5,
        totalReviewCount: 123,
        profile: 'Specialist in cardiology with over 20 years of experience.',
    },
    {
        doctorId: 'D67890',
        name: '김베니',
        image: '',
        totalGrade: 4.8,
        totalReviewCount: 89,
        profile:
            'Renowned neurologist known for her research in neurodegenerative diseases.',
    },
    {
        doctorId: 'D00000',
        name: '이동동',
        image: '',
        totalGrade: 3.9,
        totalReviewCount: 51,
        profile:
            '',
    },
]