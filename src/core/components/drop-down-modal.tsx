import { TouchableOpacity, } from 'react-native'

import { t } from "i18next";

import Colors from "../../styles/colors";
import { Title } from "./screen-title.component";
import { changeRoute } from '../helpers/async-storage';
import { styles } from './index.style';
import { centralStyle } from '../../styles/constant.style';
import { onShare } from '../../pages/app/menu-screens/company-profile-screens/company-profile/call-back';

export const DropDownModal: React.FC<{ disableModal?: any, viewCallback?: any, editCallback?: any, navigation?: any, DATA?: any }> = ({ disableModal, editCallback, navigation, DATA, viewCallback }) => {
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
                                    if (item == t("Edit") || item == t('AddNewCart')) {
                                        disableModal()
                                        if (editCallback) item == t("Edit") ? editCallback(t("Edit")) : editCallback(false)
                                    } else if (item == t("Share")) {
                                        disableModal()
                                        onShare()
                                    }
                                    else if (item == t("View")) {
                                        viewCallback()
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

