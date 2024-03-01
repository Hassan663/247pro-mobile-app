import React, {
    useRef
} from 'react';
import {
    View,
    Image,
    Text,
    ImageBackground,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
} from 'react-native';

import {
    SLIDESDATA,
    changeSlide
} from './walk-through.components';
import { styles } from './walk-through.style';
import Button from '../../../core/components/button.component';
import Swiper from 'react-native-swiper';
import { RootStackParamList } from '../../../router/auth';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { centralStyle } from '../../../styles/constant.style';
import { platform } from '../../../utilities';
import { SPLASHSTATUSBAR } from '../../../store/constant/constant';
import { useDispatch } from 'react-redux';

type Navigation = StackNavigationProp<RootStackParamList>;

interface PaginationProps {
    isSelected: boolean;
}

const WalkThrough: React.FC = () => {
    const navigation = useNavigation<Navigation>();
    const swiperRef = useRef(null);
    const dispatch = useDispatch()

    useFocusEffect(
        React.useCallback(() => {
            if (platform == 'android') dispatch({ type: SPLASHSTATUSBAR, payload: 'walkThrough' });
            return () => {
                dispatch({ type: SPLASHSTATUSBAR, payload: false });
            };
        }, [])
    );
    return (
        <>
            {/* <StatusBar barStyle="dark-content" hidden={false} translucent={true} /> */}
            <Swiper
                ref={swiperRef}
                loop={false}
                autoplay
                style={styles.wrapper}
                showsButtons={false}
                showsPagination={false}
                autoplayDirection={true}
                autoplayTimeout={3} // Adjust the autoplay timeout as per your preference
            // duration={1000} 
            >
                {SLIDESDATA.map((item, index) => {
                    return (
                        <View style={styles.slide} key={index.toString()}>

                            <ImageBackground
                                source={item.backgroundImage}
                                resizeMode="cover"
                                style={styles.image}
                            >
                                <SafeAreaView style={centralStyle.flex1}>
                                    <View style={[styles.imgWrapper, styles.skipBtnWrapper]}>
                                        {index !== 2 &&
                                            <Button
                                                title={`Skip`}
                                                titleStyle={styles.titleStyle}
                                                callBack={() => changeSlide(swiperRef, navigation)}
                                            />
                                        }
                                    </View>

                                    <View style={styles.imgWrapper}>
                                        <Image
                                            style={styles.slidesLogo}
                                            resizeMode='contain'
                                            source={require('../../../assets/auth-images/splashLogo.png')}
                                        />

                                        <Text style={styles.WalkThroughTitle}>
                                            Leads and Software for Contractors and Beyond
                                        </Text>

                                        <View style={styles.slideFooterContainer}>

                                            <View style={styles.paginationWrapper}>

                                                {SLIDESDATA.map((_, i) => (
                                                    <View
                                                        key={i}
                                                        style={styles.pagination(i === index)}
                                                    ></View>
                                                ))}

                                            </View>

                                            <TouchableOpacity onPress={() => changeSlide(swiperRef, navigation)}>
                                                <Image
                                                    resizeMode='contain'
                                                    source={item.nextIcon}
                                                />
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                </SafeAreaView>
                            </ImageBackground>
                        </View>
                    );
                })}
            </Swiper>
        </>
    );
};

export default WalkThrough;
