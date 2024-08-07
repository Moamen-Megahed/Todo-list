import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function App() {
  const [filter, setFilter] = React.useState('All');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TODO APP</Text>
      <TextInput
        style={styles.input}
        placeholder="Todo Title"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Todo Description"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.addButton}>
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
    padding: 15,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#1e1e1e',
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
});
