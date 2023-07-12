import React, { useEffect, useRef } from 'react';
import { View, Image } from 'react-native';
import { changeRoute, getItem, setItem } from '../../../core/helpers/async-storage';
import { styles } from './splash.style';
import Button from '../../../core/components/button.component';

const Splash = ({ navigation }) => {
  const timerRef = useRef(null);

  const handleWalkThroughScreen = async () => {
    const isAppInstalled = await getItem('isAppInstalled');
    if (isAppInstalled) {
      changeRoute(navigation, 'SignUp');
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
    }, 2000);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Skip"
        callBack={handleSkip}
        customStyle={styles.customStyle}
        titleStyle={styles.titleStyle}
      />
      <View style={styles.imgWrapper}>
        <Image source={require('../../../assets/splashLogo.png')} />
      </View>
    </View>
  );
};

export default Splash;
