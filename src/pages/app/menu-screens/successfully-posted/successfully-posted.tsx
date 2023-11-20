// @app
import React from 'react';
import {
    View,
    SafeAreaView,
} from 'react-native';

import Colors from '../../../../styles/colors';
import Button from '../../../../core/components/button.component';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { t } from 'i18next';
import { Title } from '../../../../core/components/screen-title.component';
import { styles } from './successfully-posted.style';
import { platform } from '../../../../utilities';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../styles/constant.style';
import { RFPercentage } from 'react-native-responsive-fontsize';

const SuccessfullyPosted: React.FC<{ navigation: any, }> = ({ navigation, }) => {
    return (
        <>
            <SafeAreaView style={[styles.container, centralStyle.justifyContentCenter]}>
                <View style={[styles.successContainer, centralStyle.selfCenter, centralStyle.alignitemCenter, centralStyle.justifyContentEvenly]}>
                    <View style={[centralStyle.circle(RFPercentage(10)), styles.checkContainer]}>
                        <AntDesign
                            name={'check'}
                            color={Colors.white}
                            size={platform == 'ios' ? RFPercentage(5) : RFPercentage(6)} />
                    </View>
                    <Title
                        title={t(`SuccessfullyPosted`)}
                        type='Poppin-16'
                        color={Colors.black}
                        weight='600' />
                    <View style={[centralStyle.width70]}>
                        <Button
                            callBack={() => changeRoute(navigation, 'ProFinder')}
                            title={t('GotoMyPostedJobs')} primary />
                    </View>

                </View>
            </SafeAreaView>
        </>
    );
};

export default SuccessfullyPosted;
