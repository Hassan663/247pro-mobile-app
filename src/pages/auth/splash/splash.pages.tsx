import React, {
  useEffect,
  useRef,
} from 'react';
import {
  View,
  Image,
  SafeAreaView
} from 'react-native';

import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  useFocusEffect,
  useNavigation
} from '@react-navigation/native';

import { styles } from './splash.style';
import Button from '../../../core/components/button.component';
import Colors from '../../../styles/colors';
import { platform } from '../../../utilities';
import { centralStyle } from '../../../styles/constant.style';
import { SPLASHSTATUSBAR } from '../../../store/constant/constant';
import { RootStackParamList } from '../../../router/auth';
import {
  changeRoute,
  getItem,
  setItem
} from '../../../core/helpers/async-storage';

type Navigation = StackNavigationProp<RootStackParamList>;

const Splash: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigation = useNavigation<Navigation>();
  const timerRef: any = useRef(null);

  const handleWalkThroughScreen = async () => {
    const isAppInstalled = await getItem('isAppInstalled');
    if (isAppInstalled) {
      changeRoute(navigation, 'SignIn');
    } else {
      await setItem('isAppInstalled', true);
      changeRoute(navigation, 'WalkThrough');
    }
  };

  const handleSkip = () => {
    clearTimeout(timerRef.current);
    handleWalkThroughScreen();
  };
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      handleWalkThroughScreen();
    }, 3000);
    return () => {
      clearTimeout(timerRef.current);
    };

  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (platform == 'android') dispatch({ type: SPLASHSTATUSBAR, payload: true });
    }, [])
  );

  return (
    <SafeAreaView style={[centralStyle.flex1, { backgroundColor: Colors.primary }]}>
      <View style={styles.container} >
        <Button
          title=" "
          callBack={handleSkip}
          customStyle={styles.customStyle}
          titleStyle={styles.titleStyle}
        />
      </View>
      <View style={styles.imgWrapper}>
        <Image source={require('../../../assets/auth-images/splashLogo.png')} />
      </View>
    </SafeAreaView>
  );
};

export default Splash;
