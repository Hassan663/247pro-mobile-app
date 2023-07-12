import { changeRoute } from '../../../core/helpers/async-storage';

// DATA
export const SLIDESDATA = [
    { backgroundImage: require('../../../assets/slide1.png'), nextIcon: require('../../../assets/slide1NextBtn.png'), },
    { backgroundImage: require('../../../assets/slide2.png'), nextIcon: require('../../../assets/slide2NextBtn.png'), },
    { backgroundImage: require('../../../assets/slide3.png'), nextIcon: require('../../../assets/slide3NextBtn.png'), },
];
// DATA

// CHANGE SLIDES
export const changeSlide = (swiperRef, navigation) => {
    if (swiperRef.current) {
        const currentSlideIndex = swiperRef.current.state.index;
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex < SLIDESDATA.length) { swiperRef.current.scrollBy(1); }
        else { changeRoute(navigation, 'SignUp') }
    }
};
// CHANGE SLIDES
