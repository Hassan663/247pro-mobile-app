import { changeRoute } from '../../../core/helpers/async-storage';

// DATA
export const SLIDESDATA = [
    { backgroundImage: require('../../../assets/auth-images/slide1.png'), nextIcon: require('../../../assets/auth-images/slide1NextBtn.png'), },
    { backgroundImage: require('../../../assets/auth-images/slide2.png'), nextIcon: require('../../../assets/auth-images/slide2NextBtn.png'), },
    { backgroundImage: require('../../../assets/auth-images/slide3.png'), nextIcon: require('../../../assets/auth-images/slide3NextBtn.png'), },
];
// DATA

// CHANGE SLIDES
export const changeSlide = (swiperRef: any, navigation: any) => {
    if (swiperRef.current) {
        const currentSlideIndex = swiperRef.current.state.index;
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex < SLIDESDATA.length) { swiperRef.current.scrollBy(1); }
        else { changeRoute(navigation, 'SignIn') }
    }
};
// CHANGE SLIDES
