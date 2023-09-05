// @app
import React from 'react';
import { View } from 'react-native';

import Colors from '../../../../styles/colors';
import { centralStyle } from '../../../../styles/constant.style';
import { styles } from './share-qr.style';
import { Title } from '../../../../core/components/screen-title.component';

export const CreateBuisnessCartModal = () => {

    return (
        <View style={[
            centralStyle.XAndYCenter,
            styles.modalContainer]}>
            <View style={styles.createBuisnessCartContactModal}>
                <View style={centralStyle.XAndYCenter}>
                    <Title
                        type='Poppin-16'
                        weight='400'
                        title={`Contact is saved your Contacts`}
                        color={Colors.fontColor} />
                    <Title
                        type='Poppin-14'
                        weight='600'
                        line={'underline'}
                        title={`Contact is saved your Contacts`}
                        color={Colors.primary} />
                </View>
                <Title
                    type='Poppin-14'
                    weight='600'
                    title={`Close`}
                    color={Colors.black} />

            </View>
        </View>

    )
}