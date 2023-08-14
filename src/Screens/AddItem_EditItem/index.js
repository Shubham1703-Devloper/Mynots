import React, {useState} from 'react';
import {Image, PermissionsAndroid, TouchableOpacity, View} from 'react-native';

import styles from './styles';
import {Button, Text} from 'react-native-paper';
import CustomTextInput from '../../Componants/CustomTextInput';
import {Formik} from 'formik';
import {TouchEventType} from 'react-native-gesture-handler/lib/typescript/TouchEventType';
import Upload from 'react-native-vector-icons/MaterialCommunityIcons';
import BackIcon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {black} from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';

const AddItem_EditItem = Props => {
  const [data, setdata] = useState({});

  const item = Props?.route?.params?.item ? Props?.route?.params?.item : '';
  const update = Props?.route?.params?.update
    ? Props?.route?.params?.update
    : '';

  const Type = {
    name: item?.name?.first?.length > 0 ? item?.name?.first : '',
    city: item?.location?.city?.length > 0 ? item?.location?.city : '',
    email: item?.email?.length > 0 ? item?.email : '',
    Address: item?.location?.country?.length > 0 ? item?.location?.country : '',
    profile: item?.picture?.large?.length > 0 ? item?.picture?.large : '',
  };
  console.log(item, 'item');

  const requestCameraPermission1 = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        pickImage();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const pickImage = async () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      minFiles: 1,
    }).then(images => {
      if (images.length == 1) {
        setdata(images);
        console.log(data);
      } else {
        Alert.alert('You have Exceeded Upload Limit');
      }
    });
  };

  return (
    <View style={styles.maincontainer}>
      <View style={styles.HeaderViewStyle}>
        <TouchableOpacity onPress={() => Props.navigation.goBack()}>
          <BackIcon name={'arrow-back-ios-new'} size={30} color={'black'} />
        </TouchableOpacity>

        <Text style={styles.HeaderTextStyle}>
          {update ? 'Update Notes' : 'ADD Notes'}
        </Text>

        <TouchableOpacity onPress={() => {}}>
          <BackIcon name={''} size={30} color={'black'} />
        </TouchableOpacity>
      </View>

      <Formik
        initialValues={Type}
        onSubmit={values => {
          if (update) {
            const editedNote = {
              id: {value: item.id.value},
              name: {
                first: values.name,
                last: 'Mills',
              },
              location: {
                city: values.city,
                state: 'Victoria',
                country: values.Address,
              },
              email: values.email,
              age: values.age,
              picture: {
                large:
                  data[0]?.path.length > 0
                    ? data[0]?.path
                    : item?.picture?.large,
                medium: 'https://randomuser.me/api/portraits/med/women/89.jpg',
                thumbnail:
                  'https://randomuser.me/api/portraits/thumb/women/89.jpg',
              },
            };
            Props.route.params.onGoBack(editedNote);
          } else {
            const newvalues = {
              id: {value: item.id},
              name: {
                first: values.name,
                last: 'Mills',
              },
              location: {
                city: values.city,
                state: 'Victoria',
                country: values.Address,
              },
              email: values.email,
              age: values.age,
              id: new Date().getTime().toString(36),
              picture: {
                large: data[0]?.path.length > 0 ? data[0]?.path : '',
                medium: 'https://randomuser.me/api/portraits/med/women/89.jpg',
                thumbnail:
                  'https://randomuser.me/api/portraits/thumb/women/89.jpg',
              },
            };
            console.log(newvalues, 'newvalues');
            AsyncStorage.setItem('userdata', JSON.stringify(newvalues));
            Props.route.params.onGoBack();
          }
          Props.navigation.goBack();
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldValue,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <View>
            <TouchableOpacity
              onPress={requestCameraPermission1}
              style={styles.UploadbuttonStyle}>
              <Upload name={'folder-upload'} size={40} color={'white'} />
              <View>
                <Image style={{width:40,height:40}}source={{uri:data[0]?.path.length>0?data[0]?.path : Type.profile}}/>
              </View>
            </TouchableOpacity>

            <CustomTextInput
              value={values.name}
              label={'Enter Name'}
              onChangeText={val => setFieldValue('name', val)}
              onBlur={handleBlur('name')}
            />

            <CustomTextInput
              value={values.email}
              label={'Enter Email'}
              onChangeText={val => setFieldValue('email', val)}
              onBlur={handleBlur('email')}
            />
            <CustomTextInput
              value={values.city}
              label={'Enter City'}
              onChangeText={val => setFieldValue('city', val)}
              onBlur={handleBlur('city')}
            />

            <CustomTextInput
              value={values.Address}
              label={'Enter Address'}
              onChangeText={val => setFieldValue('Address', val)}
              onBlur={handleBlur('Address')}
            />

            <Button mode="contained" onPress={() => handleSubmit()}>
              {update ? 'Update' : 'Add'}
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AddItem_EditItem;
