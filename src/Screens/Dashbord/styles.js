import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;
export default styles = StyleSheet.create({
    ItemStyle:{
        flexDirection:'row',
        width:'100%',
        borderRadius:10,
        padding:0,
        backgroundColor:'#8da6a5',
        marginTop:10,
        overflow:'hidden'
    },
    TextViewStyle:{
        width:'60%',
        justifyContent:'space-between',
        paddingVertical:15,
    },
    imageStyle:{
        width:'70%',
        flexDirection:'row',
        alignItems:'center',
    },
    UpdatebuttonStyle:{
        width:'15%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#70bd5b',
    },
    profileStyle:{
        height:50,
        width:50,
        borderRadius:10,
        marginLeft:10,
        marginRight:10
    },
    DeletebuttonStyle:{
        width:'15%',
        justifyContent:'center',
        backgroundColor:'red',
        alignItems:'center'
    },
    Deleteitem:{
        height:100
    },
    loadingStyle:{
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:50,
        flexDirection:'row'
    },
    
   
});
