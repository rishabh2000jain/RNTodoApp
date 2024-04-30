import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import { CheckBox } from 'react-native-elements';

const TaskListTile = ({ props }) => {
    const {task,complete,onCompleteUpdate} = props;
    return (
        <View style={styles.todoListItem}>
            <CheckBox
                containerStyle={{ padding: 0,}}
                center
                checked={complete}
                checkedColor='red'
                onPress={() => {
                    onCompleteUpdate();
                }}
            />
            <Text
                style={styles.text}
                numberOfLines={1}
                ellipsizeMode={'tail'}>{task}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: "black",
        fontWeight: 'bold',
        textAlign: 'left',
    },
    todoListItem: {
        height: 70,
        backgroundColor: 'white',
        borderColor: 'grey',
        borderRadius: 10,
        borderWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent:'start'
    },
});

export default TaskListTile;