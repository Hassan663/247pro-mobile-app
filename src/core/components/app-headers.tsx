// // @app
// import React, { } from 'react';
// import {
//     View,
// } from 'react-native';

// import Colors from '../../styles/colors';
// import { Title } from './screen-title.component';
// import { styles } from './index.style';
// import { platform } from '../../utilities';
// import {
//     centralPosition,
//     centralStyle
// } from '../../styles/constant.style';

// const AppHeader: React.FC<{
//     withOutBorder?: boolean,
//     title?: string,
//     iconL1?: any,
//     iconR1?: any,
//     color?: string,
//     weight?: string,
//     type?: string,
//     iconR2?: any
// }> = ({ title, color, iconL1, iconR1, iconR2, weight, type, withOutBorder }) => {

//     return (
//         <View style={[styles.headerContainer, { borderBottomWidth: withOutBorder ? 0 : 1 }]}>
//             <View style={[centralStyle.flex1,]}>
//                 {iconL1}
//             </View>
//             <View style={[centralStyle.alignitemCenter, { flexGrow: platform == 'ios' ? 0 : 0 }]}>
//                 <Title title={title} color={color ? color : Colors.black} weight={weight ? weight : '400'} type={type ? type : 'Roboto-20'} />
//             </View>
//             <View style={[centralStyle.flex1, centralStyle.row, { justifyContent: centralPosition.flexEnd, alignItems: centralPosition.center }]}>
//                 {iconR1}
//                 {iconR2}
//             </View>
//         </View>

//     );
// };

// export default AppHeader;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../styles/colors';
import { styles } from './index.style';
import { platform } from '../../utilities';
import {
    centralPosition,
    centralStyle
} from '../../styles/constant.style';

const AppHeader: React.FC<{
    withOutBorder?: boolean,
    title?: string,
    iconL1?: any,
    iconR1?: any,
    color?: string,
    weight?: "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | "normal" | "bold",
    type?: string,
    iconR2?: any
}> = ({ title, color, iconL1, iconR1, iconR2, weight, type, withOutBorder }) => {
    return (
        <View style={[styles.headerContainer, { borderBottomWidth: withOutBorder ? 0 : 1 }]}>
            <View style={[centralStyle.flex1]}>
                {iconL1}
            </View>
            <View style={[centralStyle.alignitemCenter, { flexGrow: platform === 'ios' ? 0 : 0 }]}>
                {/* Title with truncation */}
                <Text
                    style={[
                        headerStyles.title,
                        {
                            color: color || Colors.black,
                            fontWeight: weight || '400',
                            fontSize: type ? parseInt(type.split('-')[1], 10) : 20, // Extract font size from type
                            fontFamily: type ? type.split('-')[0] : 'Roboto',
                        },
                    ]}
                    numberOfLines={1} // Limit to one line
                    ellipsizeMode="tail" // Truncate with "..."
                >
                    {title}
                </Text>
            </View>
            <View style={[centralStyle.flex1, centralStyle.row, { justifyContent: centralPosition.flexEnd, alignItems: centralPosition.center }]}>
                {iconR1}
                {iconR2}
            </View>
        </View>
    );
};

const headerStyles = StyleSheet.create({
    title: {
        textAlign: 'center',
    },
});

export default AppHeader;