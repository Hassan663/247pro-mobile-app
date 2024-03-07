// @app
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { t } from 'i18next';
import { RFPercentage } from 'react-native-responsive-fontsize';

import Colors from '../../../../styles/colors';
import { styles } from './view-contact.style';
import { Title } from '../../../../core/components/screen-title.component';
import { changeRoute } from '../../../../core/helpers/async-storage';

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