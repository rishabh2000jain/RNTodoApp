import {
    View,
    StyleSheet,
    Text,
    StatusBar,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    TextInput,
    Button,
    TouchableOpacity,
    Keyboard,
    Alert
} from 'react-native';

import { AppBar } from './common/AppBar';
import React, { useEffect, useRef, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import TaskListTile from './TaskListTile';



const App = () => {
    const [todoText, onChangeTodoText] = useState('');
    const [todoItems, updateTodoItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchTodoList = async () => {
        try {
            const snapshot = firestore().collection('Tasks');
            const data = await snapshot.get();
            const todos = data.docs.map((e) => {
                return e.data();
            });
            updateTodoItems(todos);
        } catch (e) {
            Alert.alert(e.message);
        }
    };
    useEffect(() => {
        setLoading(true);
        fetchTodoList().then((value)=>{
            setLoading(false);
        });
    }, []);

    const saveTask = async (task) => {
        try {
            const doc = firestore().collection('Tasks').doc();
            await doc.set({
                id: doc.id,
                task,
                complete: false
            });
            await fetchTodoList();
        } catch (e) {
            Alert.alert(e.message);
        }
    };

    const completeTask = async (taskId,complete) => {
        try {
            const doc = firestore().collection('Tasks').doc(taskId);
            await doc.update({
                complete: complete
            });
            await fetchTodoList();
        } catch (e) {
            Alert.alert(e.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={'red'} />
            <AppBar props={{
                title: "My Todo",
                showLeading: false
            }} />
            <View style={styles.body}>
                {loading ?
                    <ActivityIndicator
                        size={30}
                        color={'red'}
                        style={styles.activityIndicator}
                    /> :
                    <>
                        <View style={styles.taskInputRow}>
                            <TextInput
                                style={
                                    styles.inputText
                                }
                                enterKeyHint={'done'}
                                placeholder='Enter task you want to save'
                                value={todoText}
                                onChangeText={onChangeTodoText} />
                            <TouchableOpacity
                                onPress={async () => {
                                    Keyboard.dismiss();
                                    console.log(todoText.length);
                                    if (todoText.length <= 0) {
                                        Alert.alert(title = 'Task can not be empty',);
                                        return;
                                    }
                                    await saveTask(todoText);
                                    onChangeTodoText('');
                                }}
                                style={styles.saveButton}
                            >
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingBottom:30
                            }}
                            data={todoItems}
                            style={styles.todoList}
                            ItemSeparatorComponent={() => {
                                return <View style={{ height: 10 }} />
                            }}
                            renderItem={({ item, index }) => {
                                return <TaskListTile
                                    key={item.id}
                                    props={{onCompleteUpdate:()=>{
                                        completeTask(item.id,!item.complete);
                                    },...item}}
                                />
                            }}
                        />
                    </>}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    activityIndicator: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    todoList: {
        width: '100%',
        flex: 1,
        marginTop: 20,
    },
    body: {
        paddingHorizontal: 16,
        width: '100%',
        flex: 1,
        marginTop: 20
    },
    inputText: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        fontWeight: '500'
    },
    saveButton: {
        width: 70,
        backgroundColor: 'pink',
        marginLeft: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black'
    },
    taskInputRow: {
        flexDirection: 'row',
    }
});

export default App;