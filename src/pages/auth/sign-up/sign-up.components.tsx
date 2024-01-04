import { TouchableOpacity } from "react-native"
import { changeRoute, setItem } from "../../../core/helpers/async-storage"
import { styles } from "./sign-up.style"
import { Title } from "../../../core/components/screen-title.component"
import Colors from "../../../styles/colors"
import { centralStyle } from "../../../styles/constant.style"
import { t } from "i18next"
import { appLanguages } from "../../../utilities/languageData"
import i18n from "../../../i18n"


const handleMoreOptions = (navigation: any, name: any, disableModal: any) => {
    changeRoute(navigation, name)
    disableModal()
}

const setLanguageAsync = async (lang: string) => {
    await setItem('languagecode', lang);
};
const onLanguageSelect = async (langId: string) => {
    let lang = appLanguages.find((item) => item.id === langId);
    if (lang) {
        await i18n.changeLanguage(lang.code);
        await setLanguageAsync(lang.code);
        // setflag(!flag);
    }
};


{/* {
                        appLanguages.map((item) => (
                            <TouchableOpacity
                                activeOpacity={.8}
                                onPress={() => {
                                    console.log(item, 'itemitemitem')
                                    onLanguageSelect(item.id)
                                }}
                                style={{}}>
                                <View style={{ margin: RFPercentage(2) }}>
                                    <ScreenSubTitle title={item.code} />

                                </View>

                            </TouchableOpacity>
                        ))} */

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
                {appLanguages.map((item) => (
                    <TouchableOpacity
                        activeOpacity={.8}
                        onPress={() => onLanguageSelect(item.id)}>
                        <Title
                            title={item.code}
                            weight='400'
                            color={Colors.fontColor}
                            type='Poppin-12' />
                    </TouchableOpacity>
                ))}



            </TouchableOpacity>
        </TouchableOpacity >
    )
}