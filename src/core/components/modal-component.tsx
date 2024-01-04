// @app
import React from 'react';
import {
    View,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';
import Colors from '../../styles/colors';
import { platform } from '../../utilities';
import { Title } from './screen-title.component';
import { centralStyle } from '../../styles/constant.style';

interface Modal {
    navigation: any;
    cancel?: (termsModal: any) => void;
    callBack?: () => void;
    state?: boolean;
}



const ModalComp: React.FC<Modal> = ({ navigation, cancel, state, callBack }) => {
    return (
        <>
            <TouchableOpacity activeOpacity={1}
                onPress={() => cancel && cancel(!state)}
                style={[styles.container, centralStyle.XAndYCenter]} />
            <View style={styles.modalContainer}>
                <Title
                    type='Poppin-18'
                    color={Colors.black}
                    title={t(`Termsofservices`)}
                    textAlignCenter={'center'}
                    weight='600' />
                <View style={[centralStyle.row, centralStyle.wrap, centralStyle.justifyContentCenter]}>
                    <Text style={{ textAlign: 'center' }}>
                        <Text style={styles.text()}>{t(`To proceed please agree with`)} </Text>
                        <Text style={styles.text(Colors.primary)}>{t(`Termsofservices`)} </Text>
                        <Text style={styles.text()}>{t(`&`)} </Text>
                        <Text style={styles.text(Colors.primary)}>{t(`Privacypolicy`)}</Text>
                    </Text>
                </View>
                <View style={styles.modalBtn}>
                    <TouchableOpacity activeOpacity={.7}
                        onPress={() => cancel && cancel(!state)}
                    >
                        <Title
                            type='Poppin-14'
                            color={Colors.primary}
                            title={t(`Cancel`)}
                            weight='600' />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={.7}
                        onPress={() => callBack && callBack()}
                    >
                        <Title
                            type='Poppin-14'
                            color={Colors.primary}
                            title={t(`Continue`)}
                            weight='600' />
                    </TouchableOpacity>
                </View>
            </View>

        </>
    );
};


const styles = StyleSheet.create<any>({
    container: {
        position: 'absolute',
        height: "100%",
        width: "100%",
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    modalContainer: {
        height: '22%',
        width: '85%',
        backgroundColor: 'white', shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        borderRadius: RFPercentage(1.5),
        ...centralStyle.p2,
        ...centralStyle.selfCenter,
        position: 'absolute',
        top: '40%',
    },
    checkContainer: {
        backgroundColor: Colors.success
    },
    text: (color: string) => ({
        fontSize: platform == 'ios' ? RFPercentage(1.7) : RFPercentage(2.1),
        color: color ? color : Colors.fontColor,
        fontFamily: 'Poppins-Medium'
    }),
    modalBtn: [
        centralStyle.justifyContentAround,
        centralStyle.row,
        centralStyle.mt2
    ]
});




export default ModalComp;
