import React, { useEffect, useRef, useState } from 'react';
import { View, Image, SafeAreaView } from 'react-native';
import { changeRoute, getItem, setItem } from '../../../core/helpers/async-storage';
import { styles } from './splash.style';
import Button from '../../../core/components/button.component';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../router/auth';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { loginAction } from '../../../store/action/action';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { LoginModal } from '../../../core/modals/login.modal';
import { centralStyle } from '../../../styles/constant.style';
import Colors from '../../../styles/colors';
import { SPLASHSTATUSBAR } from '../../../store/constant/constant';
import { platform } from '../../../utilities';

type Navigation = StackNavigationProp<RootStackParamList>;

const initialState: LoginModal = {
  email: 'test1@gmail.com',
  password: 'Karachi@123',
};

const Splash: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const navigation = useNavigation<Navigation>();
  const timerRef: any = useRef(null);
  const [emailPass, setEmailPass] = useState<LoginModal>(initialState);

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
    dispatch(loginAction(emailPass))
    timerRef.current = setTimeout(() => {
      handleWalkThroughScreen();
    }, 2000);
    return () => {
      clearTimeout(timerRef.current);
    };

  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (platform == 'android') dispatch({ type: SPLASHSTATUSBAR, payload: true });
      return () => {
        dispatch({ type: SPLASHSTATUSBAR, payload: false });
      };
    }, [])
  );

  return (
    <SafeAreaView style={[centralStyle.flex1, { backgroundColor: Colors.primary }]}>
      <View style={styles.container} >
        <Button
          title="Skip"
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
