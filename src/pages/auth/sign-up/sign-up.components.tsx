import { TouchableOpacity, View, StyleSheet } from "react-native";
import { setItem } from "../../../core/helpers/async-storage";
import { Title } from "../../../core/components/screen-title.component";
import Colors from "../../../styles/colors";
import { appLanguages } from "../../../utilities/languageData";
import i18n from "../../../i18n";
import { t } from "i18next";

const setLanguageAsync = async (lang) => {
    await setItem('languagecode', lang);
};

const onLanguageSelect = async (langId, disableModal, setSelectedTab, selectedTab) => {
    let lang = appLanguages.find((item) => item.id === langId);
    if (lang) {
        await i18n.changeLanguage(lang.code);
        await setLanguageAsync(lang.code);
        disableModal();
        setSelectedTab(t('English'));
    }
};

export const LanguageDropDown = ({ disableModal, setSelectedTab, selectedTab }) => {
    return (
        <View style={styles.dropdownContainer}>
            <View style={styles.languageContainer}>
                {appLanguages.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        activeOpacity={.8}
                        style={styles.languageOption}
                        onPress={() => onLanguageSelect(item.id, disableModal, setSelectedTab, selectedTab)}
                    >
                        <Title
                            title={item.code == 'en' ? 'English' : item.code == 'ch' ? '中国人' : 'Española'}
                            weight='400'
                            color={Colors.black}
                            type='Poppin-14'
                            customStyle={styles.languageText}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    dropdownContainer: {
        position: 'absolute',
        top: 50,  // Adjust this to position it right under your language icon
        right: 10,  // Align it with the right side
        width: 150,  // Adjust the width to make it smaller
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    languageContainer: {
        paddingVertical: 10,
    },
    languageOption: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
    },
    languageText: {
        fontSize: 16,
        color: Colors.black,
    },
});