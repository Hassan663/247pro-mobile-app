
import Fontisto from 'react-native-vector-icons/Fontisto'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Colors from '../../../../styles/colors'
import { centralStyle } from '../../../../styles/constant.style'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { t } from 'i18next'
export const SHARELISTDATA = [
    {
        icon: <Feather
            name={`lock`}
            color={Colors.black}
            style={centralStyle.mx2}
            size={RFPercentage(2.5)} />, title: t('Copycardlink')
    },
    {
        icon: <SimpleLineIcons
            name={`picture`}
            color={Colors.black}
            style={centralStyle.mx2}
            size={RFPercentage(2.5)} />,
        title: t('SaveQRtoPhotos')
    },
    {
        icon: <Fontisto
            name={`email`}
            color={Colors.black}
            style={centralStyle.mx2}
            size={RFPercentage(2.5)} />,
        title: t('ShareQRviaEmail'),
    },
    {
        icon: <Ionicons
            name={`chatbubble-outline`}
            color={Colors.black}
            style={centralStyle.mx2}
            size={RFPercentage(2.5)} />, title: t('ShareCardviaText')
    }, {
        icon: <Entypo
            name={`dots-three-horizontal`}
            color={Colors.black}
            style={centralStyle.mx2}
            size={RFPercentage(2.5)} />,
        title: t('Shareanotherway')
    },
] 