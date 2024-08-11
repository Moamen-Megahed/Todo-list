import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

export default function TodoForm({ title, setTitle, description, setDescription, addTodo }) {
    return (
        <>
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
        </>
    )
}
const styles = StyleSheet.create({


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

});
