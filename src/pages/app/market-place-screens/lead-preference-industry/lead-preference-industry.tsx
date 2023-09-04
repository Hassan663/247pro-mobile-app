// @app
import React, {
    useState
} from 'react';
import {
    View,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';

import AntDesign from 'react-native-vector-icons/AntDesign'
import AppHeader from '../../../../core/components/app-headers';
import Colors from '../../../../styles/colors';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { styles } from './lead-preference-industry.style';
import { platform } from '../../../../utilities';
import { Title } from '../../../../core/components/screen-title.component';
import { centralStyle } from '../../../../styles/constant.style';
import { LPItem } from './component';

const LeadPreferenceIndustry: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {

    const [edit, setEdit] = useState(false)

    return (
        <SafeAreaView style={styles.container}>
            <AppHeader
                iconL1={
                    <AntDesign
                        onPress={() => changeRoute(navigation, 'pop')}
                        style={styles.mx2}
                        name={`left`} size={platform == 'ios' ? RFPercentage(2) : RFPercentage(3)} />
                }
                iconR1={
                    <AntDesign
                        style={styles.mx2}
                        name={`plus`}
                        onPress={() => changeRoute(navigation, 'industry')}
                        color={Colors.black}
                        size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(3)}
                    />
                }
                title={t(`Industry`)} />

            <View style={styles.titleWrapper}>
                <Title
                    weight='400'
                    type='Poppin-16'
                    title={t(`Theindustriesyouwillreceivejobleadsfrom`)} />
            </View>

            <TouchableOpacity
                activeOpacity={.8}
                style={[centralStyle.row, centralStyle.alignitemCenter, styles.titleContainer]}>
                <Title
                    title={t(`IndustryPreferences`)}
                    weight='600'
                    color={Colors.black}
                    type='Poppin-14' />
                {edit ?
                    <AntDesign
                        name={`check`}
                        onPress={() => setEdit(!edit)}
                        color={Colors.black}
                        size={RFPercentage(2.5)} />
                    :
                    <AntDesign
                        name={`edit`}
                        onPress={() => setEdit(!edit)}
                        color={Colors.black}
                        size={RFPercentage(2.5)} />
                }
            </TouchableOpacity>

            <FlatList
                data={[t(`Construction`), t(`Marketing`), t(`Sales`)]}
                contentContainerStyle={styles.listContentContainer}
                renderItem={({ item, index }) => <LPItem
                    item={item}
                    index={index}
                    edit={edit} />}
                keyExtractor={(item, index) => index.toString()}
            />

        </SafeAreaView>
    );
};

export default LeadPreferenceIndustry;
