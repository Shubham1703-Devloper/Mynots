import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  LogBox,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Searchbar, Text} from 'react-native-paper';
import styles from './styles';
import Delete from 'react-native-vector-icons/MaterialCommunityIcons';
import Update from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Menu, MenuDivider, MenuItem} from 'react-native-material-menu';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

const Dashbord = Props => {
  const [newdata, setNewdata] = useState([]); //async()=>JSON.parse(await AsyncStorage.getItem('storedata'))
  const [back, setback] = useState(false);
  const [update, setUpdate] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isrefresh, setisrefresh] = useState(false);
  const [isnet, setisnet] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = React.useState('');

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);
  var a = 0;

  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        Apicall(1);
      } else {
        getdata();
      }
    });

   
  }, []);

  const getdata = async () => {
    const storedata = JSON.parse(await AsyncStorage.getItem('storedata'));
    setNewdata(storedata);
    setIsLoading(false);
    setisrefresh(false);
  };

  // useEffect(() => {
  //   if (isnet) {
  //     Apicall(currentPage);
  //   }
  // }, [currentPage]);

  // useEffect(() => {
  // if (isnet) {
  //   setNewdata([]);
  //   Apicall(1);
  // } else {
  // const getdata = async () => {
  //   const storedata = JSON.parse(await AsyncStorage.getItem('storedata'));
  //   setNewdata(storedata);
  //   setIsLoading(false)
  //   setisrefresh(false)
  // };
  // getdata();
  // }
  // },[]);

  const Apicall = async pages => {
    console.log('response=====>', pages, newdata.length);
    const configurationObject = {
      url: 'https://randomuser.me/api/?page=${currentPage}&results=20',
      method: 'GET',
    };

    await axios(configurationObject)
      .then(response => {
        AsyncStorage.setItem(
          'storedata',
          JSON.stringify([response.data.results]),
        );
        setNewdata([...response.data.results]);

        // if (newdata.length > 0) {
        // setNewdata([...newdata, ...response.data.results]);
        // AsyncStorage.setItem(
        //   'storedata',
        //   JSON.stringify([...newdata, ...response.data.results]),
        // );
        // } else {
        //   setNewdata(response.data.results);
        // }

        setIsLoading(false);
        setisrefresh(false);
      })
      .catch(error => {
        alert('An error has occurred', error);
        setIsLoading(false);
        setisrefresh(false);
      });
  };

  const onGoBack = async () => {
    setback(!back);
    const userdata = JSON.parse(await AsyncStorage.getItem('userdata'));
    newdata.push(userdata);
    await AsyncStorage.setItem('storedata', JSON.stringify(newdata));
    setUpdate(false);
  };

  const onEditBack = async (updateitem) => {
    console.log('updateitem=========>',updateitem.id.value);
    let arr = [...newdata];
    for (let elem of arr) {
      if (elem.id.value == updateitem.id.value) {
        var a = arr.indexOf(elem);
        arr[a] = updateitem;
      }
    }
    setNewdata(arr);
    await AsyncStorage.setItem('storedata', JSON.stringify(arr));
  };

  const Deleteid = async id => {
    const filteredData = newdata.filter(item => item.id.value !== id);
    setNewdata(filteredData);
    await AsyncStorage.setItem('storedata', JSON.stringify(newdata));
  };

  const UpdateItem = item => {
    setUpdate(true);
    Props.navigation.navigate('AddItem_EditItem', {
      item,
      update,
      onGoBack: e => onEditBack(e),
    });
  };

  const SortbyAge = ase => {
    console.log('Sort by Age', ase);
    let arr = [...newdata];
    switch (ase) {
      case 1:
        arr.sort((a, b) => a?.location?.city.localeCompare(b?.location?.city));
        break;
      case 2:
        arr.sort((a, b) =>
          a?.location?.country.localeCompare(b?.location?.country),
        );
        break;
      case 3:
        arr.sort((a, b) => a?.name?.first.localeCompare(b?.name?.first));
        break;
      default:
        break;
    }
    setNewdata(arr);
    hideMenu();
  };

  // search Filter of List

  const onChangeSearch = async query => {
    setSearchQuery(query);
    var data = [...newdata];
    if (query.length > 0) {
      let searchdata = data.filter(elem => {
        if (elem?.name?.first?.toUpperCase().match(query.toUpperCase())) {
          return elem;
        } else {
          // setIsLoading(true);
          //   let a = currentPage;
          //   setcurrentPage(a + 2);
          // Apicall(currentPage)
        }
      });
      setNewdata(searchdata);
    } else {
      let storedata = JSON.parse(await AsyncStorage.getItem('storedata'));
      setNewdata(storedata);
    }
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginBottom: 20,
        }}>
        <Button
          icon="plus"
          mode="contained"
          onPress={() =>
            Props.navigation.navigate('AddItem_EditItem', {
              onGoBack,
            })
          }>
          Add
        </Button>
        <View>
          <Button icon="plus" mode="contained" onPress={() => showMenu()}>
            Filter
          </Button>
          <Menu
            visible={visible}
            // anchor={<Text onPress={showMenu}>Show menu</Text>}
            onRequestClose={hideMenu}>
            <MenuItem onPress={() => SortbyAge(1)}>Sort By City</MenuItem>
            <MenuItem onPress={() => SortbyAge(2)}>Sort By Country</MenuItem>
            <MenuItem onPress={() => SortbyAge(3)}>Sort By A-Z</MenuItem>
            <MenuDivider />
          </Menu>
        </View>
      </View>

      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />

      <FlatList
        data={newdata}
        // onEndReached={() => {
        //   checknet()
        //   if(isnet){
        //     setIsLoading(true);
        //     let a = currentPage;
        //     setcurrentPage(a + 1);
        //   }
        // }}
        // onRefresh={() => {
        //   checknet()
        //   if(isnet){
        //     setisrefresh(true);
        //     setIsLoading(false);
        //     setNewdata([]);
        //     setcurrentPage(1);
        //   }
        // }}
        // refreshing={isrefresh}
        // onEndReachedThreshold={0.5}
        renderItem={({item}) => (
          <Item
            onPress={() => Props.navigation.navigate('Profile', {item})}
            item={item}
            DeleteItem={() => {
              Alert.alert(
                'Are You Sure to Delete Item?',
                'Profile Name : ' + item?.name?.first,
                [
                  {
                    text: 'NO',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'YES', onPress: () => Deleteid(item.id.value)},
                ],
              );
            }}
            UpdateItem={() => {
              UpdateItem(item);
            }}
          />
        )}
        keyExtractor={item => item.id}
      />
      {isLoading ? (
        <View style={styles.loadingStyle}>
          <Text>Loading...</Text>
          <ActivityIndicator size={25} />
        </View>
      ) : null}
    </View>
  );
};

export default Dashbord;

const Item = ({item, onPress, DeleteItem, UpdateItem}) => {
  return (
    <View style={styles.ItemStyle}>
      <TouchableOpacity onPress={onPress} style={styles.imageStyle}>
        <View>
          <Image
            style={styles.profileStyle}
            resizeMode="contain"
            source={{uri: item?.picture?.large}}
          />
        </View>
        <View style={styles.TextViewStyle}>
          <Text>{item?.name?.first}</Text>
          <Text>{item?.location?.city}</Text>
          <Text>{item?.location?.country}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={UpdateItem} style={styles.UpdatebuttonStyle}>
        <Update name={'update'} size={40} color={'white'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={DeleteItem} style={styles.DeletebuttonStyle}>
        <Delete name={'delete'} size={40} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};
