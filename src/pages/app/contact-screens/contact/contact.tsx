// @app
import React, {
    useState
} from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    FlatList,
    TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import AppHeader from '../../../../core/components/app-headers';
import { styles } from './contact.style';
import { centralStyle } from '../../../../styles/constant.style';
import { platform } from '../../../../utilities';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { t } from 'i18next';
import { Title } from '../../../../core/components/screen-title.component';
import Colors from '../../../../styles/colors';
import Input from '../../../../core/components/input.component';
import Button from '../../../../core/components/Button';
const Contact: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [selectedTab, setSelectedTab] = useState('')
    return (
        <>

            <AppHeader
                iconL1={<AntDesign style={centralStyle.mx2} name={`left`} size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(2.5)} />}
                iconR1={<AntDesign name={`plus`} size={platform == 'ios' ? RFPercentage(2.5) : RFPercentage(2.5)} />}
                iconR2={<Entypo style={centralStyle.mx2} name={`dots-three-vertical`} size={platform == 'ios' ? RFPercentage(2) : RFPercentage(2.5)} />}
                type='Poppin-18'
                weight='600'
                title={t(`Contacts`)} />
            <View style={[centralStyle.flex1, { backgroundColor: 'white' }]}>
                <View style={centralStyle.row}>
                    <TouchableOpacity
                        onPress={() => setSelectedTab(t('Contacts'))}
                        activeOpacity={.9} style={[{
                            flex: 1,
                            borderBottomWidth: 1,
                            borderColor: selectedTab == t('Contacts') ? Colors.primary : Colors.lightGrey,
                            height: RFPercentage(5),

                        }, centralStyle.XAndYCenter]}>
                        <Title
                            weight='600'
                            type='Poppin-14' color={selectedTab == t('Contacts') ? Colors.primary : Colors.fontColor} title={t('Contacts')} />

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setSelectedTab(t('Company (200)'))}
                        activeOpacity={.9} style={[{
                            flex: 1, height: RFPercentage(5),
                            borderBottomWidth: 1,
                            borderColor: selectedTab == t('Company (200)') ? Colors.primary : Colors.lightGrey,

                        }, centralStyle.XAndYCenter]}>
                        <Title type='Poppin-14'
                            weight='600'
                            color={selectedTab == t('Company (200)') ? Colors.primary : Colors.fontColor}
                            title={t('Company (200)')} />
                    </TouchableOpacity>
                </View>
                <View style={[{ height: RFPercentage(6), borderBottomWidth: 1, borderBottomColor: Colors.lightGrey },]}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        contentContainerStyle={centralStyle.XAndYCenter}
                        data={['Client', 'Pro', 'Supplier', 'Staff']}
                        renderItem={({ item }) => {
                            return (
                                <View style={[centralStyle.px2, centralStyle.py05, { backgroundColor: Colors.inputBgColor, borderRadius: RFPercentage(.5) }, centralStyle.mx2]}>
                                    <Title
                                        weight='400'
                                        type='Poppin-12' color={Colors.fontColor} title={item} />
                                </View>
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={[{ height: RFPercentage(7), }, centralStyle.mx2, centralStyle.row, centralStyle.XAndYCenter]}>
                    <AntDesign size={RFPercentage(2)} name='search1' color={Colors.fontColor} />
                    <TextInput
                        style={[centralStyle.flex1, { height: '100%' }, centralStyle.mx1,]}
                        placeholder={t('search')}
                    />
                    <MaterialIcons size={RFPercentage(2.5)} name='filter-list' />
                </View>
                <View style={[centralStyle.flex1, centralStyle.XAndYCenter, { paddingBottom: RFPercentage(15) }]}>
                    {/* You have no contact */}
                    <Title type='Poppin-12'
                        weight='400'
                        color={Colors.black}
                        title={t('You have no contact')} />
                    <Button
                        icon={
                            <AntDesign size={RFPercentage(2)} name='plus' color={Colors.primary} />
                        }
                        title={'Add Contact'}
                        titleStyle={{ color: Colors.primary }}
                        customStyle={[centralStyle.row,
                        centralStyle.alignitemCenter,
                        centralStyle.my2,
                        { borderWidth: .3, height: RFPercentage(4), width: RFPercentage(20), borderRadius: RFPercentage(1), justifyContent: 'space-evenly' }]}
                    />
                </View>
            </View >
        </>

    );
};

export default Contact;
