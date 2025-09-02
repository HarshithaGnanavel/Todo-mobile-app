import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from "expo-checkbox";
import { useEffect, useState } from 'react';
import { FlatList, Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


type ToDoType = {
  id: number;
  title: string;
  isDone: boolean;
}

export default function Index() {
  const todoData = [
    {
      id: 1,
      title: "Todo 1",
      isDone: true,
    },
    {
      id: 2,
      title: "Todo 2",
      isDone: false,
    },
    {
      id: 3,
      title: "Todo 3",
      isDone: false,
    },
    {
      id: 4,
      title: "Todo 4",
      isDone: true,
    },
    {
      id: 5,
      title: "Todo 5",
      isDone: false,
    },
    {
      id: 6,
      title: "Todo 6",
      isDone: false,
    },
  ];

  //creating functionalities
  const [todos, setTodos] = useState<ToDoType[]>([]); // empty by default
  const [todoText, setTodoText] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [oldTodos, setOldTodos] = useState<ToDoType[]>([]);


  //to fetch the data from the json async storage
  useEffect(() => {
    const getTodos = async () => {
      try {
        const todos = await AsyncStorage.getItem('my-todo');
        if (todos !== null) {
          setTodos(JSON.parse(todos));
          setOldTodos(JSON.parse(todos));
        }
      } catch(error) {
        console.log(error);
      }
    };
    getTodos();
  }, []);

  //adding a todo
  const addTodo = async () => {
    try {
      const newTodo = {
      id: Math.random(),
      title: todoText,
      isDone: false
      };
      todos.push(newTodo);
      setTodos(todos);
      setOldTodos(todos);
      await AsyncStorage.setItem('my-todo', JSON.stringify(todos));
      setTodoText('');
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  }

  //deleting a todo
  const deleteTodo = async(id: number) => {
    try {
      const newTodos = todos.filter((todo) => todo.id !== id);
      await AsyncStorage.setItem('my-todo', JSON.stringify(newTodos));
      setTodos(newTodos);
      setOldTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  }

  //marking a todo done
  const handleDone = async (id: number) => {
    try {
      const newTodos = todos.map((todo) => {
        if(todo.id === id) {
          todo.isDone = !todo.isDone;
        }
        return todo;
      });
      await AsyncStorage.setItem("my-todo", JSON.stringify(newTodos));
      setTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = (query: string) => {
    if (query == "") {
      setTodos(oldTodos);
    } else {
      const filteredTodos = todos.filter((todo) =>
        todo.title.toLowerCase().includes(query.toLowerCase())
      );
      setTodos(filteredTodos);
    }
  };

  useEffect(() => {
    onSearch(searchQuery);
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => {alert('Clicked!')}}>
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
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          style={styles.searchInput}
          clearButtonMode='always'
          // You can later add clear button here
        />
      </View>

      {/* ToDo List */}
      <FlatList 
        data={[...todos].reverse()} 
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({item}) => (
          <ToDoItem todo={item} deleteTodo={deleteTodo} handleTodo={handleDone}/>
        )} 
      />

      {/*Adding a task*/}
      <KeyboardAvoidingView style={styles.footer} behavior='padding' keyboardVerticalOffset={10}>
        <TextInput 
          placeholder='Add new task'
          value={todoText}
          onChangeText={(text) => setTodoText(text)} 
          style={styles.newTodoInput}
          autoCorrect={false}
          />
        <TouchableOpacity style={styles.addButton} onPress={() => addTodo()}>
          <Ionicons name='add' size={34} color={'#fff'} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const ToDoItem = ({
  todo, 
  deleteTodo,
  handleTodo
  } : {
    todo: ToDoType, 
    deleteTodo: (id: number) => void;
    handleTodo: (id: number) => void;
  }) => (
  <View style={styles.todoContainer}>
    <View style={styles.todoInfoContainer}>
      <Checkbox
        value={todo.isDone}
        onValueChange={() => handleTodo(todo.id)}
        color={todo.isDone ? "#f2316bff" : undefined}
      />
      <Text 
        style={[
        styles.todoText, 
        todo.isDone && { textDecorationLine: 'line-through',
        color: 'gray' }]}
      >
        {todo.title}
      </Text>
    </View>
    <TouchableOpacity 
      onPress={() => {
        deleteTodo(todo.id);
        alert("Deleted " + todo.id)
        }}>
      <Ionicons name='trash-outline' size={20} color={'#bc2b2bff'}/>
    </TouchableOpacity>
  </View>
)

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
    alignItems: "center",
    justifyContent: "space-between",
    bottom: 20,
  },
  newTodoInput: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    backgroundColor: '#4630EB',
    padding: 8,
    borderRadius: 10,
    marginLeft: 20,
  }
});
