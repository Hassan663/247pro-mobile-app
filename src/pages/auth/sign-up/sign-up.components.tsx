import { TouchableOpacity } from "react-native"
import { changeRoute } from "../../../core/helpers/async-storage"
import { styles } from "./sign-up.style"
import { Title } from "../../../core/components/screen-title.component"
import Colors from "../../../styles/colors"
import { centralStyle } from "../../../styles/constant.style"
import { t } from "i18next"


const handleMoreOptions = (navigation: any, name: any, disableModal: any) => {
    changeRoute(navigation, name)
    disableModal()
}

export const LanguageDropDown: React.FC<{ disableModal?: any, navigation?: any }> = ({ disableModal, navigation }) => {
    return (
        <TouchableOpacity
            activeOpacity={.9}
            onPress={() => { disableModal() }}
            style={styles.modalContainerAbs}>
            <TouchableOpacity
                activeOpacity={.9}
                onPress={() => {
                }}
                style={styles.modalContainer}>
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => { handleMoreOptions(navigation, 'ConnectionRequests', disableModal) }}>
                    <Title
                        title={t('ConnectionRequests')}
                        weight='400'
                        color={Colors.fontColor}
                        type='Poppin-12' />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={.8}
                    style={centralStyle.mt1}
                    onPress={() => { handleMoreOptions(navigation, 'NewCompany', disableModal) }}>
                    <Title
                        title={t('AddCompany')}
                        weight='400'
                        color={Colors.fontColor}
                        type='Poppin-12' />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={.8}
                    style={centralStyle.mt1}
                    onPress={() => { handleMoreOptions(navigation, 'NewContact', disableModal) }}>
                    <Title
                        title={t('AddContact')}
                        weight='400'
                        color={Colors.fontColor}
                        type='Poppin-12' />
                </TouchableOpacity>
            </TouchableOpacity>
        </TouchableOpacity >
    )
}