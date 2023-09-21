// @app
import React from 'react';
import {
    View,
    TouchableOpacity,
} from 'react-native';

import Colors from '../../../../styles/colors';
import { styles } from './new-contact.style';
import { Title } from '../../../../core/components/screen-title.component';
import { centralStyle } from '../../../../styles/constant.style';
import { changeRoute } from '../../../../core/helpers/async-storage';
import {
    captureImage,
    pickImage
} from './call-back';

import { t } from 'i18next';

export const PicImgModal = ({ setimageUriLocal, disableModal }: any) => {
    return (
        <TouchableOpacity
            activeOpacity={.8}
            onPress={() => { disableModal() }}
            style={[centralStyle.alignitemCenter, styles.uploadImageModal]}>
            <View style={styles.uploadImageModalContentContainer}>
                <TouchableOpacity onPress={() => {
                    captureImage(setimageUriLocal)
                    disableModal()
                }}
                    style={styles.captureBtn}>
                    <Title
                        title='Capture new'
                        type='Poppin-12'
                        weight='400'
                        color={Colors.fontColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    pickImage(setimageUriLocal)
                    disableModal()
                }}
                    style={styles.uploadBtn}>
                    <Title
                        title='Upload from gallery'
                        type='Poppin-12'
                        weight='400'
                        color={Colors.fontColor} />
                </TouchableOpacity>

            </View>
        </TouchableOpacity >
    )
}
export const LeftIcon = (navigation?: any) => (
    <TouchableOpacity
        onPress={() => changeRoute(navigation, 'pop')}
        activeOpacity={.8}
        style={styles.mx2}>
        <Title
            color={Colors.primary}
            type='Poppin-14'
            weight='600'
            title={t('Cancel')} />
    </TouchableOpacity>
)
export const RightIcon = (navigation?: any) => (

    <View style={styles.mx2}>
        <Title
            color={1 == 1 ? Colors.fontColor : Colors.primary}
            type='Poppin-14'
            weight='600'
            title={t('Done')} />
    </View>
)