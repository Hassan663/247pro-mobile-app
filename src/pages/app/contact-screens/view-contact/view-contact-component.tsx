// @app
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';
import { styles } from './view-contact.style';
import { Title } from '../../../../core/components/screen-title.component';
import { changeRoute } from '../../../../core/helpers/async-storage';
import { centralStyle } from '../../../../styles/constant.style';

export const LeftIcon = (navigation?: any) => (
  <TouchableOpacity
    onPress={() => changeRoute(navigation, 'pop')}
    activeOpacity={.8}
    style={styles.mx2}>
    <AntDesign name={'left'} size={RFPercentage(2)} />
  </TouchableOpacity>
)

export const RightIcon = (navigation?: any, contactDetails?: any) => (
  <TouchableOpacity
    onPress={() => { if (contactDetails) changeRoute(navigation, 'EditContact', contactDetails) }}
    activeOpacity={.8}
    style={styles.mx2}>
    <Title
      color={Colors.primary}
      type='Poppin-14'
      weight='600'
      title={t('Edit')} />
  </TouchableOpacity>
)

export const SpecialityTags = ({ item, index }: { item: { specialtyName: string }, index: number, }) => {
  return (
    <View style={styles.specialitytags}>
      <Title
        type='Poppin-12'
        title={item.specialtyName}
      />
    </View>
  )
};


export const ViewContainer = ({ title, content }: { title: string, content: string }) => (
  <View style={styles.viewContainer}>
    <Text style={{ fontSize: 12, color: Colors.gray }}>{t(title)}</Text>
    <Text style={[centralStyle.my02, { fontSize: 16, color: Colors.fontColor }]}>{content}</Text>
  </View>
);

export const EmailContainer = ({ item, index, data }: {
  item: {
    phone: string; email: string
  }, index: number, data: []
}) => (
  <>
    {console.log(item, 'item', item.email)}
    {data.length > 1 ?
      <View style={{
        ...centralStyle.py05,
        borderTopWidth: index !== 0 ? RFPercentage(.3) : 0,
        borderColor: Colors.lightGrey,
      }}>
        <Text style={{ fontSize: 12, color: Colors.gray }}>{t('Emailaddress')}</Text>
        <Text style={[centralStyle.my02, { fontSize: 16, color: Colors.fontColor }]}>{item.email !== undefined ? item.email : item.phone}</Text>
      </View>
      : <ViewContainer title={'Emailaddress'} content={item.email !== undefined ? item.email : item.phone} />}
  </>
)