import { View } from 'react-native'

import Colors from "../../styles/colors"
import { centralStyle } from "../../styles/constant.style"
import { Title } from "./screen-title.component"

export const Error = ({ errorMessage }: any) => (
    <View style={centralStyle.selfCenter}>
        <Title
            type={'Poppin-12'}
            color={Colors.red}
            title={errorMessage} />
    </View>
)