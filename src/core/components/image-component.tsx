import FastImage from 'react-native-fast-image'

interface ImageInterface {
    customStyle?: object;
    source: object | any;
    resizeMode?: boolean;
}

export const Img: React.FC<ImageInterface> = ({ source, customStyle, resizeMode, ...props }) => (
    <FastImage
        style={customStyle}
        source={source}
        resizeMode={resizeMode ? FastImage.resizeMode.contain : FastImage.resizeMode.cover}
        {...props}
    />
)