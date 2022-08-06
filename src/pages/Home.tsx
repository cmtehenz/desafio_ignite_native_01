import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface EditTaskArgs {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const existTask = tasks.find(tasks => tasks.title === newTaskTitle);

    if(existTask) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
      return;
    }else{
      const data = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
      setTasks(oldState => [...oldState, data]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTask = tasks.map(task => ({...task}))

    const foundItem = updatedTask.find(item => item.id === id);
    
    if(!foundItem)
      return;
    
    foundItem.done = !foundItem.done;
    setTasks(updatedTask);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item', 
      'Tem certeza que você deseja remover esse item?',
      [{
        text: 'Não',
        style: "cancel"
      },{
        text: 'Sim',
        onPress: () => setTasks(oldState => oldState.filter(item => item.id !== id ))
      }]
      )   
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs ) {
    const updatedTask = tasks.map(task => ({...task}))

    const foundItem = updatedTask.find(item => item.id === taskId);
    
    if(!foundItem)
      return;
    
    foundItem.title = taskNewTitle;
    setTasks(updatedTask);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})