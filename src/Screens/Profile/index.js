import React, {Profiler, useState} from 'react';
import {
  Image,
  ImageBackground,
  PermissionsAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import CustomTextInput from '../../Componants/CustomTextInput';
import {Formik} from 'formik';
import {TouchEventType} from 'react-native-gesture-handler/lib/typescript/TouchEventType';
import Upload from 'react-native-vector-icons/MaterialCommunityIcons';
import BackIcon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {black} from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
import styles from './styles';
const Profile = Props => {
  const [data, setdata] = useState({});

  const item = Props?.route?.params?.item;
  console.log('item=======>', item);
  return (
    <View style={styles.maincontainer}>
      <TouchableOpacity onPress={()=>Props.navigation.navigate('Download',{item})} style={styles.ProfileView}>
        {item?.picture?.large != null ? (
          <Image
            style={styles.profileStyle}
            resizeMode="contain"
            source={{uri: item?.picture?.large}}
          />
        ) : (
          <View style={styles.Loadingimg}>
            <Text>Loading...</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.textView}>
        <Text style={styles.textStyle}>FirstName:- </Text>
        <Text style={styles.textStyle}>{item?.name?.first}</Text>
      </View>
      <View style={styles.textView}>
        <Text style={styles.textStyle}>LastName:- </Text>
        <Text style={styles.textStyle}>{item?.name?.last}</Text>
      </View>
      <View style={styles.textView}>
        <Text style={styles.textStyle}>Email:- </Text>
        <Text style={styles.textStyle}>{item?.email}</Text>
      </View>
      <View style={styles.textView}>
        <Text style={styles.textStyle}>Country:- </Text>
        <Text style={styles.textStyle}>{item?.location?.country}</Text>
      </View>
    </View>
  );
};

export default Profile;
