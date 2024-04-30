import {
    View,
    Text
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome6';



export const AppBar = ({ props }) => {
    const { showLeading } = props;
    const appbarStyle = {
        height: 60,
        width: '100%',
        backgroundColor: 'red',
        alignItems: 'center',
        paddingLeft: 10,
        top: 0,
        flexDirection: 'row'
    };
    return (
        <View style={appbarStyle}>
            {showLeading?<Icon
                name="arrow-left"
                size={20}
                color= 'white'
                onPress={() => {
                    console.log("back clicked");
                 }}
                style={{marginRight:20}}
            />:null}
            <Text style={{
                fontSize: 20,
                color: 'white',
                flex:1,
                textAlign:'center',
                marginRight:props.showLeading?50:10
            }}>{props.title}</Text>
        </View>
    );
};
