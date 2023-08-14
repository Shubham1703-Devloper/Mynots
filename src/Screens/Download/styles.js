import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;
export default styles = StyleSheet.create({
    profileStyle:{
        width:'80%',
        height:306,
        padding: 10,
    },

    Loadingimg:{
        width:'80%',
        height:306,
        padding: 10,
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
    },
    button: {
        width: '80%',
        padding: 10,
        backgroundColor: 'orange',
        margin: 10,
      },
      text: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        padding: 5,
      },

      buttonView:{
        justifyContent:'center',
        alignItems:'center',
      }
   
});
