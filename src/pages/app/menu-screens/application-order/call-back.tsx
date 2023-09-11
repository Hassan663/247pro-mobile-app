import { View } from "react-native"
import { styles } from "./application-order.style"
import { Title } from "../../../../core/components/screen-title.component"

export const Item = ({ item }: any) => {

    return (
        <View style={[styles.itemContainer]}>
            {item.icon}
            <Title textAlignCenter='center' title={item.name} type='Poppin-12' weight='400' />
        </View>

    )
}