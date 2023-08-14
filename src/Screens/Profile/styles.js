import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;
export default styles = StyleSheet.create({
    profileStyle:{
        width:100,
        height:100,
        borderRadius:50,
    },

    Loadingimg:{
        width:100,
        height:100,
        borderRadius:50,
        backgroundColor:'#c9c9c9',
        alignItems:'center',
        justifyContent:'center'
    }
    ,
    maincontainer:{
        flex:1,
        padding:20
    },
    ProfileView:{
        justifyContent:"center",
        alignItems:'center',
    },
    textStyle:{
        fontSize:20,
        fontWeight:'bold',
    },
    textView:{
        flexDirection:'row',
        marginTop:20
    }
   
});
