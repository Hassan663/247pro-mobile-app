import { TouchableOpacity } from "react-native"
import { setItem } from "../../../core/helpers/async-storage"
import { styles } from "./sign-up.style"
import { Title } from "../../../core/components/screen-title.component"
import Colors from "../../../styles/colors"
import { appLanguages } from "../../../utilities/languageData"
import i18n from "../../../i18n"
import { t } from "i18next"


// CHANGE LANGUAGE 
const setLanguageAsync = async (lang: string) => {
    await setItem('languagecode', lang);
};
const onLanguageSelect = async (langId: string, disableModal: any, setSelectedTab: any, selectedTab: string) => {
    let lang = appLanguages.find((item) => item.id === langId);
    if (lang) {
        await i18n.changeLanguage(lang.code);
        await setLanguageAsync(lang.code);
        disableModal()
        console.log(lang.code,'selectedTabselectedTab')
        setSelectedTab(t('Phone'));
    }
};



export const LanguageDropDown: React.FC<{ disableModal?: any, setSelectedTab: any, selectedTab: string }> = ({ disableModal, setSelectedTab, selectedTab }) => {
    return (
        <TouchableOpacity
            activeOpacity={.9}
            onPress={disableModal}
            style={styles.modalContainerAbs}>
            <TouchableOpacity
                activeOpacity={.9}
                onPress={() => {
                }}
                style={styles.modalContainer}>
                {appLanguages.map((item) => (
                    <TouchableOpacity
                        activeOpacity={.8}
                        onPress={() => onLanguageSelect(item.id, disableModal, setSelectedTab, selectedTab)}>
                        <Title
                            title={item.code == 'en' ? 'English' : item.code == 'ch' ? '中国人' : 'Española'}
                            weight='400'
                            color={Colors.fontColor}
                            type='Poppin-12' />
                    </TouchableOpacity>
                ))}
            </TouchableOpacity>
        </TouchableOpacity >
    )
}