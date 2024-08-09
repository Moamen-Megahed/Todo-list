import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home({ navigation }) {
    const [filter, setFilter] = useState('All');
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

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
        setTodos(todos.map(todo => todo.id === id ? { ...todo, status: 'Done' } : todo));
    };

    const removeTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    React.useEffect(() => {
        const fetchTodos = async () => {
            const storedTodos = await loadTodos();
            setTodos(storedTodos);
        };
        fetchTodos();
    }, []);


    return (
        <View style={styles.container}>
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
                            {/* <Text style={styles.todoDescription}>{item.description}</Text> */}
                        </TouchableOpacity>
                        {item.status === 'Active' && (
                            <TouchableOpacity style={styles.doneButton} onPress={() => markAsDone(item.id)}>
                                {/* <Text style={styles.doneButtonText}>Mark as Done</Text> */}
                                <Icon name="done" size={24} color="#fff" />
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={styles.removeButton} onPress={() => removeTodo(item.id)}>
                            {/* <Text style={styles.removeButtonText}>Remove</Text> */}
                            <Icon name="delete" size={24} color="#fff" />

                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#121212',
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
    todoDescription: {
        fontSize: 16,
        color: '#bbb',
    },
    doneButton: {
        backgroundColor: '#03dac5',
        padding: 8,
        borderRadius: 5,
        marginLeft: 10,
    },
    doneButtonText: {
        color: '#000',
        fontSize: 16,
    },
    removeButton: {
        backgroundColor: '#e74c3c',
        padding: 8,
        borderRadius: 5,
        marginLeft: 10,
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
