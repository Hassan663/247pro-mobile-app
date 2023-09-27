import { TouchableOpacity, View } from "react-native"
import { styles } from "./menu.style"
import { Title } from "../../../../core/components/screen-title.component"
import { changeRoute } from "../../../../core/helpers/async-storage"

export const Item = ({ item, navigation }: any) => {
    const handleCallback = () => { if (item?.name == `Company Profile`) changeRoute(navigation, 'CompanyProfile') }

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