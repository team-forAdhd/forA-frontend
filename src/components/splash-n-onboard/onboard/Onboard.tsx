import React from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper'
import { styles, text } from './OnboardStyle'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

export default function OnboardingScreen() {
    const { t } = useTranslation('Onboard')
    const navigation = useNavigation()
   
  return (
    <Swiper
      style={styles.wrapper}
      showsButtons={false}
      loop={false}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
    >
      <View style={styles.slide}>
        <View style={styles.textBox}>
            <Text style={text.titleText}>{t('onboard-1-1')}<Text style={text.highlightText}>{t('onboard-1-2')}</Text>{t('onboard-1-3')}</Text>
        </View>
        <Image
            style={styles.image}
            source={require('@/public/assets/splash-n-onboard/onboard-1.png')}
        />
      </View>
      <View style={styles.slide}>
        <View style={styles.textBox}>
            <Text style={text.titleText}>{t('onboard-2-1')}<Text style={text.highlightText}>{t('onboard-2-2')}</Text></Text>
        </View>
        <Image
            style={styles.image}
            source={require('@/public/assets/splash-n-onboard/onboard-2.png')}
        />
      </View>
      <View style={styles.slide}>
        <View style={styles.textBox}>
            <Text style={text.titleText}><Text style={text.highlightText}>{t('onboard-3-1')}</Text>{t('onboard-3-2')}</Text>
        </View>
        <Image
            style={styles.image}
            source={require('@/public/assets/splash-n-onboard/onboard-3.png')}
        />
        <View>
        <TouchableOpacity 
            style={styles.button}
            onPress={() => {
                navigation.navigate('Home' as never)
            }}>
            <Text style={text.buttonText}>{t('onboard-button')}</Text>
        </TouchableOpacity>
      </View>
      </View>
    </Swiper>
  );
}