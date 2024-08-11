import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

export default function CompletedTasks() {
    const todos = useSelector(state => state.todo.todos);
    const completedTodos = todos.filter(todo => todo.status === 'Done');

    return (
        <View style={styles.container}>
            <FlatList
                data={completedTodos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.todoItem}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
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
        backgroundColor: '#000',
    },
    todoItem: {
        backgroundColor: '#1a1a1a',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    description: {
        fontSize: 16,
        color: '#ccc',
    },
});
