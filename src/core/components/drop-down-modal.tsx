import { TouchableOpacity, View } from 'react-native'

import { t } from "i18next";
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from "../../styles/colors";
import { Title } from "./screen-title.component";
import { changeRoute } from '../helpers/async-storage';
import { styles } from './index.style';
import { centralStyle } from '../../styles/constant.style';

export const DropDownModal: React.FC<{ disableModal?: any, editCallback?: any, navigation?: any, DATA?: any }> = ({ disableModal, editCallback, navigation, DATA }) => {
    return (

        <TouchableOpacity
            activeOpacity={.9}
            onPress={() => { disableModal() }}
            style={styles.modalContainerAbs}>
            <TouchableOpacity
                activeOpacity={.9}
                onPress={() => {
                    disableModal()
                    changeRoute(navigation, 'leadPreference')
                }}
                style={styles.modalContainer}>

                {DATA ?
                    DATA.map((item: string, index: number) => {
                        return (
                            <TouchableOpacity
                                key={index.toString()}
                                onPress={() => {
                                    if (item == t("Edit")) {
                                        disableModal()
                                        editCallback()
                                    }
                                }}
                                activeOpacity={.8}
                                style={[centralStyle.my05,]}>
                                <Title
                                    title={item}
                                    weight='400'
                                    color={Colors.fontColor}
                                    type='Poppin-14' />
                            </TouchableOpacity>

                        )
                    })
                    :
                    <>
                        <Title
                            title={t('PostaJob')}
                            weight='400'
                            color={Colors.fontColor}
                            type='Poppin-14' />
                        <Title
                            title={t('LeadPreference')}
                            weight='400'
                            color={Colors.fontColor}
                            type='Poppin-14' />
                        <Title
                            title={t('MyFavorJobs')}
                            weight='400'
                            color={Colors.fontColor}
                            type='Poppin-14' />
                    </>
                }
            </TouchableOpacity>
        </TouchableOpacity >
    );
};

