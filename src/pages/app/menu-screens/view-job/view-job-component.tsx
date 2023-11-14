// @app
import React, { } from 'react';
import {
    View,
} from 'react-native';

import Colors from '../../../../styles/colors';
import { styles } from './view-job.style';
import { Title } from '../../../../core/components/screen-title.component';
import { centralStyle } from '../../../../styles/constant.style';

export const Row: React.FC<{ title: string, value: string }> = ({ title, value }) => {
    return (
        <View style={styles.rowContainer}>
            <View style={centralStyle.flex1}>
                <Title
                    title={title}
                    type='Poppin-14'
                    weight='400'
                    color={Colors.gray}
                />
            </View>
            <View style={[centralStyle.flex1]}>
                <Title
                    title={value}
                    textAlignCenter='right'
                    type='Poppin-14'
                    weight='400'
                    color={Colors.black}
                />
            </View>
        </View>
    );
};

