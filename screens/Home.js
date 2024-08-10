// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Modal, ImageBackground } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function Home({ navigation }) {
//     const [filter, setFilter] = useState('All');
//     const [todos, setTodos] = useState([]);
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [modalVisible, setModalVisible] = useState(false);
//     const [selectedTodoId, setSelectedTodoId] = useState(null);

//     const saveTodos = async (todos) => {
//         const jsonValue = JSON.stringify(todos);
//         await AsyncStorage.setItem('@todos', jsonValue);
//     };

//     const loadTodos = async () => {
//         const jsonValue = await AsyncStorage.getItem('@todos');
//         return jsonValue != null ? JSON.parse(jsonValue) : [];
//     };

//     const addTodo = async () => {
//         if (title && description) {
//             const newTodo = {
//                 id: Date.now().toString(),
//                 title,
//                 description,
//                 status: 'Active',
//             };
//             const updatedTodos = [...todos, newTodo];
//             setTodos(updatedTodos);
//             setTitle('');
//             setDescription('');
//             await saveTodos(updatedTodos);
//         }
//     };

//     const filteredTodos = todos.filter(todo => {
//         if (filter === 'All') return true;
//         return todo.status === filter;
//     });

//     const markAsDone = id => {
//         const updatedTodos = todos.map(todo => todo.id === id ? { ...todo, status: 'Done' } : todo);
//         setTodos(updatedTodos);
//         saveTodos(updatedTodos);
//     };

//     const confirmRemoveTodo = id => {
//         setSelectedTodoId(id);
//         setModalVisible(true);
//     };

//     const removeTodo = async () => {
//         const updatedTodos = todos.filter(todo => todo.id !== selectedTodoId);
//         setTodos(updatedTodos);
//         await saveTodos(updatedTodos);
//         setModalVisible(false);
//     };

//     React.useEffect(() => {
//         const fetchTodos = async () => {
//             const storedTodos = await loadTodos();
//             setTodos(storedTodos);
//         };
//         fetchTodos();
//     }, []);

//     return (

//         <View style={styles.container}>
//             <Text style={styles.title}>TODO APP</Text>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Todo Title"
//                 placeholderTextColor="#888"
//                 value={title}
//                 onChangeText={setTitle}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Todo Description"
//                 placeholderTextColor="#888"
//                 value={description}
//                 onChangeText={setDescription}
//             />
//             <TouchableOpacity style={styles.addButton} onPress={addTodo}>
//                 <Text style={styles.addButtonText}>Add Todo</Text>
//             </TouchableOpacity>
//             <View style={styles.divider} />
//             <View style={styles.filterContainer}>
//                 {['All', 'Active', 'Done'].map(status => (
//                     <TouchableOpacity
//                         key={status}
//                         style={[styles.filterButton, filter === status && styles.selectedFilter]}
//                         onPress={() => setFilter(status)}
//                     >
//                         <Text style={styles.filterText}>{status}</Text>
//                     </TouchableOpacity>
//                 ))}
//             </View>
//             <FlatList
//                 data={filteredTodos}
//                 keyExtractor={item => item.id}
//                 renderItem={({ item }) => (
//                     <View style={styles.todoItem}>
//                         <TouchableOpacity
//                             style={styles.todoTextContainer}
//                             onPress={() => navigation.navigate('TodoDetails', { title: item.title, description: item.description })}
//                         >
//                             <Text style={styles.todoTitle}>{item.title}</Text>
//                         </TouchableOpacity>
//                         {item.status === 'Active' && (
//                             <TouchableOpacity style={styles.doneButton} onPress={() => markAsDone(item.id)}>
//                                 <Icon name="done" size={24} color="#fff" />
//                             </TouchableOpacity>
//                         )}
//                         <TouchableOpacity style={styles.removeButton} onPress={() => confirmRemoveTodo(item.id)}>
//                             <Icon name="delete" size={24} color="#fff" />
//                         </TouchableOpacity>
//                     </View>
//                 )}
//             />

//             <Modal
//                 visible={modalVisible}
//                 transparent={true}
//                 animationType="slide"
//                 onRequestClose={() => setModalVisible(false)}
//             >
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalContent}>
//                         <Text style={styles.modalText}>Are you sure you want to delete this todo?</Text>
//                         <View style={styles.modalButtons}>
//                             <TouchableOpacity style={styles.modalButton} onPress={removeTodo}>
//                                 <Text style={styles.modalButtonText}>Delete</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
//                                 <Text style={styles.modalButtonText}>Cancel</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#121212',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         textAlign: 'center',
//         color: '#fff',
//     },
//     input: {
//         height: 40,
//         borderColor: '#333',
//         borderWidth: 1,
//         marginBottom: 10,
//         paddingHorizontal: 10,
//         color: '#fff',
//         backgroundColor: '#1e1e1e',
//     },
//     addButton: {
//         backgroundColor: '#6200ea',
//         padding: 10,
//         borderRadius: 5,
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     addButtonText: {
//         color: '#fff',
//         fontSize: 18,
//     },
//     divider: {
//         height: 1,
//         backgroundColor: '#333',
//         marginVertical: 20,
//     },
//     filterContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         marginBottom: 20,
//     },
//     filterButton: {
//         padding: 10,
//     },
//     selectedFilter: {
//         borderBottomWidth: 2,
//         borderBottomColor: '#6200ea',
//     },
//     filterText: {
//         fontSize: 18,
//         color: '#fff',
//     },
//     todoItem: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: 15,
//         borderWidth: 1,
//         borderColor: '#333',
//         borderRadius: 5,
//         marginBottom: 10,
//         backgroundColor: '#1e1e1e',
//     },
//     todoTextContainer: {
//         flex: 1,
//     },
//     todoTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#fff',
//     },
//     doneButton: {
//         backgroundColor: '#03dac5',
//         padding: 8,
//         borderRadius: 5,
//         marginLeft: 10,
//     },
//     removeButton: {
//         backgroundColor: '#e74c3c',
//         padding: 8,
//         borderRadius: 5,
//         marginLeft: 10,
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0,0,0,0.5)',
//     },
//     modalContent: {
//         backgroundColor: '#fff',
//         padding: 20,
//         borderRadius: 10,
//         alignItems: 'center',
//     },
//     modalText: {
//         fontSize: 18,
//         marginBottom: 20,
//         color: '#000',
//     },
//     modalButtons: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '100%',
//     },
//     modalButton: {
//         backgroundColor: '#e74c3c',
//         padding: 10,
//         borderRadius: 5,
//         alignItems: 'center',
//         flex: 1,
//         marginHorizontal: 5,
//     },
//     cancelButton: {
//         backgroundColor: '#6200ea',

//     },
//     modalButtonText: {
//         color: '#fff',
//         fontSize: 16,
//     },
// });
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Modal, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
    const [filter, setFilter] = useState('All');
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTodoId, setSelectedTodoId] = useState(null);

    const saveTodos = async (todos) => {
        const jsonValue = JSON.stringify(todos);
        await AsyncStorage.setItem('@todos', jsonValue);
    };

    const loadTodos = async () => {
        const jsonValue = await AsyncStorage.getItem('@todos');
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    };

    const addTodo = async () => {
        if (title && description) {
            const newTodo = {
                id: Date.now().toString(),
                title,
                description,
                status: 'Active',
            };
            const updatedTodos = [...todos, newTodo];
            setTodos(updatedTodos);
            setTitle('');
            setDescription('');
            await saveTodos(updatedTodos);
        }
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'All') return true;
        return todo.status === filter;
    });

    const markAsDone = id => {
        const updatedTodos = todos.map(todo => todo.id === id ? { ...todo, status: 'Done' } : todo);
        setTodos(updatedTodos);
        saveTodos(updatedTodos);
    };

    const confirmRemoveTodo = id => {
        setSelectedTodoId(id);
        setModalVisible(true);
    };

    const removeTodo = async () => {
        const updatedTodos = todos.filter(todo => todo.id !== selectedTodoId);
        setTodos(updatedTodos);
        await saveTodos(updatedTodos);
        setModalVisible(false);
    };

    useEffect(() => {
        const fetchTodos = async () => {
            const storedTodos = await loadTodos();
            setTodos(storedTodos);
        };
        fetchTodos();
    }, []);

    return (
        <ImageBackground
            source={require('../assets/bg.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>TODO APP</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Todo Title"
                    placeholderTextColor="#888"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Todo Description"
                    placeholderTextColor="#888"
                    value={description}
                    onChangeText={setDescription}
                />
                <TouchableOpacity style={styles.addButton} onPress={addTodo}>
                    <Text style={styles.addButtonText}>Add Todo</Text>
                </TouchableOpacity>
                <View style={styles.divider} />
                <View style={styles.filterContainer}>
                    {['All', 'Active', 'Done'].map(status => (
                        <TouchableOpacity
                            key={status}
                            style={[styles.filterButton, filter === status && styles.selectedFilter]}
                            onPress={() => setFilter(status)}
                        >
                            <Text style={styles.filterText}>{status}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <FlatList
                    data={filteredTodos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.todoItem}>
                            <TouchableOpacity
                                style={styles.todoTextContainer}
                                onPress={() => navigation.navigate('TodoDetails', { title: item.title, description: item.description })}
                            >
                                <Text style={styles.todoTitle}>{item.title}</Text>
                            </TouchableOpacity>
                            {item.status === 'Active' && (
                                <TouchableOpacity style={styles.doneButton} onPress={() => markAsDone(item.id)}>
                                    <Icon name="done" size={24} color="#fff" />
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity style={styles.removeButton} onPress={() => confirmRemoveTodo(item.id)}>
                                <Icon name="delete" size={24} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Are you sure you want to delete this todo?</Text>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={styles.modalButton} onPress={removeTodo}>
                                    <Text style={styles.modalButtonText}>Delete</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.modalButtonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({

    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // لإعطاء تأثير overlay على الصورة
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#fff',
    },
    input: {
        height: 40,
        borderColor: '#333',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: '#fff',
        backgroundColor: '#1e1e1e',
    },
    addButton: {
        backgroundColor: '#6200ea',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    divider: {
        height: 1,
        backgroundColor: '#333',
        marginVertical: 20,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    filterButton: {
        padding: 10,
    },
    selectedFilter: {
        borderBottomWidth: 2,
        borderBottomColor: '#6200ea',
    },
    filterText: {
        fontSize: 18,
        color: '#fff',
    },
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#1e1e1e',
    },
    todoTextContainer: {
        flex: 1,
    },
    todoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    doneButton: {
        backgroundColor: '#03dac5',
        padding: 8,
        borderRadius: 5,
        marginLeft: 10,
    },
    removeButton: {
        backgroundColor: '#e74c3c',
        padding: 8,
        borderRadius: 5,
        marginLeft: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        color: '#000',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        backgroundColor: '#e74c3c',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#6200ea',

    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
