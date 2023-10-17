// @app
import React, {
    useState
} from 'react';
import {
    View,
    Image,
    TouchableOpacity,
} from 'react-native';


import Entypo from 'react-native-vector-icons/Entypo'
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';
import { styles } from './biz-card.style';
import { Title } from '../../../../core/components/screen-title.component';
import { platform } from '../../../../utilities';
import { centralStyle } from '../../../../styles/constant.style';
import { DropDownModal } from '../../../../core/components/drop-down-modal';
import { MODALDATAMULTICARDS } from './data';
import { t } from 'i18next';

export const ListCard = ({ navigation }: any) => {
    const [modalEnabled, setmodalEnabled] = useState(false)
    return (
        <>
            <View
                style={[centralStyle.row, styles.listContainer]}>
                <View style={styles.listImageContainer}>
                    <View style={[centralStyle.circle(RFPercentage(11)),]}>
                        <Image source={require('../../../../assets/app-images/userImg.png')} />
                    </View>
                </View>
                <View style={styles.listBody}>
                    <Title
                        type={`Poppin-18`}
                        weight='600'
                        color={Colors.black}
                        title='Personal' />
                    <Title
                        type={`Poppin-12`}
                        weight='500'
                        color={Colors.black}
                        title='George Lee' />
                    <Title
                        type={`Poppin-11-400`}
                        color={Colors.fontColor}
                        title='Architect ' />
                </View>
                <View
                    style={styles.dotContainer}>
                    <Entypo
                        onPress={() => { setmodalEnabled(!modalEnabled) }}
                        name={`dots-three-vertical`}
                        size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)} />

                </View>

            </View>
            {modalEnabled && <DropDownModal
                DATA={MODALDATAMULTICARDS}
                navigation={navigation}
                disableModal={() => setmodalEnabled(!modalEnabled)} />}
        </>
    )
}

export const CreateBuisnessCartModal = ({ disableModal, contactSaved }: any) => {

    return (
        <View style={[
            centralStyle.XAndYCenter,
            styles.modalContainer]}>
            <View style={styles.createBuisnessCartContactModal}>
                <View style={centralStyle.XAndYCenter}>
                    <Title
                        type='Poppin-16'
                        weight='400'
                        title={contactSaved ? t('Contactissavedtoandyour') : `Contact is saved your Contacts`}
                        color={Colors.fontColor} />
                    {!contactSaved ?
                        <Title
                            type='Poppin-14'
                            weight='600'
                            line={'underline'}
                            title={t('CreateYourFreeBusinessCard')}
                            color={Colors.primary} /> :
                        <Title
                            type='Poppin-16'
                            weight='400'
                            title={t('phoneContacts')}
                            color={Colors.fontColor} />
                    }

                </View>
                <TouchableOpacity onPress={() => disableModal()}>
                    <Title
                        type='Poppin-14'
                        weight='600'
                        title={`Close`}
                        color={Colors.black} />
                </TouchableOpacity>

            </View>
        </View>

    )
}