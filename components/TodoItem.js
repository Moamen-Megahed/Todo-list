import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TodoItem({ item, markAsDone, confirmRemoveTodo, navigation }) {
    return (
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
    );
}

const styles = StyleSheet.create({
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
});
