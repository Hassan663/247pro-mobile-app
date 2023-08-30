// @app
import React, { } from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    TextInput,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';

import AppHeader from '../../../core/components/app-headers';
import Colors from '../../../styles/colors';
import { styles } from './industry.style';
import { Title } from '../../../core/components/screen-title.component';
import { centralStyle } from '../../../styles/constant.style';
import { CheckBoxRow } from './component';
import { changeRoute } from '../../../core/helpers/async-storage';

const Industry: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    return (
        <View style={{ flex: 1 }}>
            <AppHeader
                iconL1={
                    <TouchableOpacity
                        activeOpacity={.8}
                        onPress={() => changeRoute(navigation, 'pop')} style={styles.mx2}>
                        <Title
                            title={t('Cancel')}
                            weight={'600'}
                            color={Colors.primary}
                            type={'Poppin-14'} />
                    </TouchableOpacity>
                }
                iconR1={
                    <View style={styles.mx2}>
                        <Title
                            title={t('Done')}
                            weight={'600'}
                            color={Colors.primary}
                            type={'Poppin-14'} />
                    </View>

                }
                title={t(`Industry`)} />

            <View style={[centralStyle.container,]}>
                <View style={[styles.inputContainer, centralStyle.XAndYCenter]}>
                    <AntDesign
                        name={'search1'}
                        color={Colors.fontColor}
                        size={RFPercentage(3)} />
                    <TextInput
                        placeholder={t('SearchJobs')}
                        style={[centralStyle.flex1, styles.px2]} />
                </View>
                <FlatList
                    data={[t('Construction'), t('Marketing'), t('Sales'), t('Software')]}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <CheckBoxRow item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />

            </View>
        </View>
    );
};

export default Industry;
