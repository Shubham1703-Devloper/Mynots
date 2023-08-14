import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;
export default styles = StyleSheet.create({

    InputStyleView: {
        borderColor: 'black',
        width: '100%',
        // height:windowHeight / 15,
        borderRadius: 0,
        backgroundColor: '#E2E9F3',
        borderRadius: 12,
        justifyContent: 'center'

    },
    outlineStyle: {
        borderRadius: 12,
        borderWidth: 1.2
    },

    placeholderStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    SearchbarStyl: {
        borderColor: 'black',
        width: '100%',
        height: windowHeight / 16,
        backgroundColor: '#E2E9F3',
        borderRadius: 12,
    },

});
