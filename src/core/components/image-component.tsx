import React from 'react';
import FastImage from 'react-native-fast-image';

interface ImageInterface {
    customStyle?: object;
    source: object | any;
    resizeMode?: boolean;
}

const placeholderImage = {
    uri: 'https://via.placeholder.com/150', 
};

export const Img: React.FC<ImageInterface> = ({ source, customStyle, resizeMode, ...props }) => (
    <FastImage
        style={customStyle}
        source={source?.uri ? source : placeholderImage}  // Use placeholder if source is not provided
        resizeMode={resizeMode ? FastImage.resizeMode.contain : FastImage.resizeMode.cover}
        {...props}
    />
);