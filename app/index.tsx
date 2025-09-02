import { Ionicons } from '@expo/vector-icons';
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [todos, setTodos] = useState([
    { id: 1, title: "Todo 1", isDone: false },
    { id: 2, title: "Todo 2", isDone: false },
    { id: 3, title: "Todo 3", isDone: false },
    { id: 4, title: "Todo 4", isDone: true },
    { id: 5, title: "Todo 5", isDone: false },
    { id: 6, title: "Todo 6", isDone: false },
  ]);

  const handleToggle = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {alert('Clicked!')}}>
          <Ionicons name="menu" size={30} color={'#333'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Image 
            source={{uri: 'https://w7.pngwing.com/pngs/308/71/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png'}} 
            style={{width: 38, height: 38, borderRadius: 20}}
          />
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.searchBar}>
        <Ionicons name='search' size={24} color={'#333'}/>
        <TextInput 
          placeholder='Search' 
          style={styles.searchInput} 
          // You can later add clear button here
        />
      </View>

      {/* ToDo List */}
      <FlatList 
        data={todos} 
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({item}) => (
          <View style={styles.todoContainer}>
            <View style={styles.todoInfoContainer}>
              <Checkbox
                value={item.isDone}
                onValueChange={() => handleToggle(item.id)}
                color={item.isDone ? "#f2316bff" : undefined}
              />
              <Text style={[styles.todoText, item.isDone && { textDecorationLine: 'line-through', color: 'gray' }]}>
                {item.title}
              </Text>
            </View>
            <TouchableOpacity onPress={() => {alert('Deleted ' + item.id)}}>
              <Ionicons name='trash-outline' size={20} color={'#bc2b2bff'}/>
            </TouchableOpacity>
          </View>
        )} 
      />
      {/*Adding a task*/}
      <View style={styles.footer}>
        <View style={styles.newToDoInput}>
          <TextInput placeholder='Add new task' />
          <TouchableOpacity onPress={() => {}}>
            <Ionicons style={styles.addButton} name='add' size={24} color={'#333'} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5'
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(232, 232, 232, 1)',
    padding: 7.5,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    gap: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput:{
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  todoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
  },
  todoInfoContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  todoText: {
    fontSize: 16,
    color: "#333",
  },
  footer: {
    
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  newToDoInput:{
    backgroundColor: '#333'
  },
  addButton: {

  }
});
