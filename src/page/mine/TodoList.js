import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleNewTodo = () => {
    if (newTodo) {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter new todo"
        value={newTodo}
        onChangeText={setNewTodo}
      />
      <Button title="Add" onPress={handleNewTodo} />
      {todos.map((todo, index) => (
        <Text key={index}>{todo}</Text>
      ))}
    </View>
  );
};

export default TodoList;
