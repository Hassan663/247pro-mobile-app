import React, {
    useRef
} from 'react';
import {
    View,
    Image,
    Text,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';

import {
    SLIDESDATA,
    changeSlide
} from './walk-through.components';
import { styles } from './walk-through.style';
import Button from '../../../core/components/button.component';
import Swiper from 'react-native-swiper';

const WalkThrough = ({ navigation }) => {
    const swiperRef = useRef(null);
    return (
        <Swiper
            ref={swiperRef}
            loop={false}
            autoplay
            style={styles.wrapper}
            showsButtons={false}
            showsPagination={false}
            autoplayDirection={true}
            autoplayTimeout={3} // Adjust the autoplay timeout as per your preference
            duration={1000} // 
        >
            {SLIDESDATA.map((item, index) => {
                return (
                    <View style={styles.slide} key={index}>

                        <ImageBackground
                            source={item.backgroundImage}
                            resizeMode="cover"
                            style={styles.image}
                        >
                            <View style={[styles.imgWrapper, styles.skipBtnWrapper]}>
                                {index !== 2 &&
                                    <Button
                                        title={`Skip`}
                                        titleStyle={styles.titleStyle}
                                        callBack={() => changeSlide(swiperRef,navigation)}
                                    />
                                }
                            </View>

                            <View style={styles.imgWrapper}>
                                <Image
                                    style={styles.slidesLogo}
                                    resizeMode='contain'
                                    source={require('../../../assets/splashLogo.png')}
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

                                    <TouchableOpacity onPress={() => changeSlide(swiperRef,navigation)}>
                                        <Image
                                            resizeMode='contain'
                                            source={item.nextIcon}
                                        />
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                );
            })}
        </Swiper>
    );
};

export default WalkThrough;
