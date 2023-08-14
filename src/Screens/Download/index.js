import React, {Profiler, useState} from 'react';
import {
  Image,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import styles from './styles';
import RNFetchBlob from 'rn-fetch-blob';
// import RNFetchBlob from 'rn-fetch-blob';
// import RNFetchBlob from 'rn-fetch-blob';

const Download = Props => {
  const [data, setdata] = useState({});


  const item = Props?.route?.params?.item;
  const imageurl = Props?.route?.params?.item?.picture?.large;
  console.log('item=======>', item);

  const checkPermission = async () => {
    
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'App needs access to your storage to download Photos',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };

  const downloadImage = () => {
    // Main function to download the image
    
    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = imageurl;    
    // Getting the extention of the file
    let ext = '.' + 'jpg';
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      });
  };



  return (
    <View style={styles.maincontainer}>
      <View style={styles.ProfileView}>
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
      </View>
      <View style={styles.buttonView}>
      <TouchableOpacity
        style={styles.button}
        onPress={checkPermission}>
        <Text style={styles.text}>
          Download Image
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default Download;
