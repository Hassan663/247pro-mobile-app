// @app
import React from 'react';
import {
    Image,
    View,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';
import { centralStyle } from '../../../../styles/constant.style';
import { Title } from '../../../../core/components/screen-title.component';
import { platform } from '../../../../utilities';
import { styles } from './connection-requests.style';

interface RequestItem {
    name: string;
    type: string;
    photoURL: any; // You may need to specify the correct type for photoURL
}

interface Props {
    item: RequestItem;
}

export const RequestList: React.FC<Props> = ({ item }) => {
    return (
        <View style={[styles.listContianer, centralStyle.row]}>
            <View style={[styles.listProfile, centralStyle.justifyContentCenter]}>
                <Image source={item.photoURL} style={styles.profileImg} />
            </View>
            <View style={[styles.listBody, centralStyle.justifyContentCenter]}>
                <Title title={item.name} type='Poppin-14' weight='600' color={Colors.black} />
                <Title title={item.type} type='Poppin-14' weight='400' color={Colors.fontColor} />
            </View>
            <View style={[styles.markContainer, centralStyle.row, centralStyle.alignitemEnd, centralStyle.my1]}>
                <AntDesign
                    name={`check`}
                    size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(2.5)} />
                <AntDesign
                    name={`close`}
                    size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(2.5)} />

            </View>
        </View>
    )
}