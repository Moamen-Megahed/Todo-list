import React from 'react';
import { FlatList } from 'react-native';
import TodoItem from './TodoItem';

export default function Todos({ todos, filter, markAsDone, confirmRemoveTodo, navigation }) {
    const filteredTodos = todos.filter(todo => {
        if (filter === 'All') return true;
        return todo.status === filter;
    });

    return (
        <FlatList
            data={filteredTodos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <TodoItem
                    item={item}
                    markAsDone={markAsDone}
                    confirmRemoveTodo={confirmRemoveTodo}
                    navigation={navigation}
                />
            )}
        />
    );
}
