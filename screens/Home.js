import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Modal, Text, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, markAsDone, removeTodo, setFilter, loadTodos } from '../redux/actions/todoActions';
import TodoForm from '../components/TodoForm';
import Todos from '../components/Todos';

export default function Home({ navigation }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTodoId, setSelectedTodoId] = useState(null);

    const dispatch = useDispatch();
    const todos = useSelector(state => state.todo.todos);
    const filter = useSelector(state => state.todo.filter);

    const saveTodos = async (todos) => {
        const jsonValue = JSON.stringify(todos);
        await AsyncStorage.setItem('@todos', jsonValue);
    };

    const loadStoredTodos = async () => {
        const jsonValue = await AsyncStorage.getItem('@todos');
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    };

    const handleAddTodo = async () => {
        if (title && description) {
            const newTodo = {
                id: Date.now().toString(),
                title,
                description,
                status: 'Active',
            };
            dispatch(addTodo(newTodo));
            setTitle('');
            setDescription('');
            await saveTodos([...todos, newTodo]);
        }
    };

    const handleRemoveTodo = async () => {
        dispatch(removeTodo(selectedTodoId));
        await saveTodos(todos.filter(todo => todo.id !== selectedTodoId));
        setModalVisible(false);
    };

    useEffect(() => {
        const fetchTodos = async () => {
            const storedTodos = await loadStoredTodos();
            dispatch(loadTodos(storedTodos));
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
                <TodoForm
                    addTodo={handleAddTodo}
                    setDescription={setDescription}
                    description={description}
                    setTitle={setTitle}
                    title={title}
                />
                <View style={styles.divider} />
                <View style={styles.filterContainer}>
                    {['All', 'Active',].map(status => (
                        <TouchableOpacity
                            key={status}
                            style={[styles.filterButton, filter === status && styles.selectedFilter]}
                            onPress={() => dispatch(setFilter(status))}
                        >
                            <Text style={styles.filterText}>{status}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Todos
                    todos={todos}
                    filter={filter}
                    markAsDone={id => dispatch(markAsDone(id))}
                    confirmRemoveTodo={id => {
                        setSelectedTodoId(id);
                        setModalVisible(true);
                    }}
                    navigation={navigation}
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
                                <TouchableOpacity style={styles.modalButton} onPress={handleRemoveTodo}>
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
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
