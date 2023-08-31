// @app
import React, {
    useState
} from 'react';
import {
    Text,
    View,
    Image,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../styles/colors';
import { Title } from '../../../core/components/screen-title.component';
import { centralStyle } from '../../../styles/constant.style';
import { styles } from './job-detail.style';
import { t } from 'i18next';

export const Attachments = ({ item }: any) => {
    const [isInfoOpened, setIsInfoOpened] = useState(false)

    return (
        <View style={[styles.my1, centralStyle.row]}>
            <View style={[styles.itemImgContainer, centralStyle.alignitemCenter]}>
                <Image source={item.IMAGE} resizeMode='contain' style={styles.itemImg} />
            </View>
            <View style={styles.itemBody}>
                <View style={[centralStyle.row, styles.tagsWrapper]}>
                    {item.tags.map((item: any) => {
                        return (
                            <View style={styles.tagContainer} >
                                <Title
                                    weight='400'
                                    title={item}
                                    color={Colors.fontColor}
                                    type={`Poppin-12`} />
                            </View>
                        )
                    })}
                    <Text
                        ellipsizeMode={'tail'}
                        numberOfLines={isInfoOpened ? undefined : 1}
                        style={styles.itemDescription}
                    >
                        {t('JobDescriptionMsg')}
                    </Text>
                </View>
            </View>
            <View style={styles.arrowIcon}>
                <AntDesign
                    name={isInfoOpened ? 'down' : `up`}
                    onPress={() => setIsInfoOpened(!isInfoOpened)}
                    color={Colors.black}
                    size={RFPercentage(2.5)} />
            </View>
        </View>
    )
}