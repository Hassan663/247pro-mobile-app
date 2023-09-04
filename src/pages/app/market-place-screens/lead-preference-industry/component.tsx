import { View } from "react-native"

import AntDesign from 'react-native-vector-icons/AntDesign'
import { RFPercentage } from "react-native-responsive-fontsize"

import Colors from "../../../../styles/colors"
import { Title } from "../../../../core/components/screen-title.component"
import { centralStyle } from "../../../../styles/constant.style"
import { styles } from "./lead-preference-industry.style"

export const LPItem = ({ item, index, edit }: any) => {
    return (
        <View style={[centralStyle.row, centralStyle.alignitemCenter, styles.itemContainer(index)]}>
            <Title
                weight='400'
                color={Colors.black}
                type='Poppin-14'
                title={item} />
            {edit &&
                <AntDesign
                    color={Colors.fontColor}
                    name={'delete'}
                    size={RFPercentage(2)} />
            }
        </View>
    )
}