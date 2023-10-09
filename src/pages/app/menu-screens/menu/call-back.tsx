import { Alert, TouchableOpacity, View } from "react-native"
import { styles } from "./menu.style"
import { Title } from "../../../../core/components/screen-title.component"
import { changeRoute } from "../../../../core/helpers/async-storage"
import { t } from "i18next"

export const Item = ({ item, navigation }: any) => {
    const handleCallback = () => {
        if (item?.name == t('CompanyProfile')) {
            Alert.alert(t('Toaccessthisfeaturepleasevisitthewebinterface'))
            // changeRoute(navigation, 'CompanyProfile')
        }
        else if (item?.name == t('AccountSettings')) changeRoute(navigation, 'AccountSetting')
        else if (item?.name == t('BizCard')) changeRoute(navigation, 'BizCard')
        else if (item?.name == t('Tasks')) Alert.alert(t('Toaccessthisfeaturepleasevisitthewebinterface'))
        else if (item?.name == t('Contacts')) changeRoute(navigation, 'Contact')
        else if (item?.name == t('RolesAndPermissions')) Alert.alert(t('Toaccessthisfeaturepleasevisitthewebinterface'))
        else if (item?.name == t('UserAdmin')) Alert.alert(t('Toaccessthisfeaturepleasevisitthewebinterface'))
    }

    return (
        <TouchableOpacity
            onPress={handleCallback}
            activeOpacity={.9}
            style={[styles.itemContainer]}>
            {item.icon}
            <Title textAlignCenter='center' title={item.name} type='Poppin-12' weight='400' />
        </TouchableOpacity>

    )
}