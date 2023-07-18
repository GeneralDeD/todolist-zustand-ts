import { Divider, VStack, Flex } from "@chakra-ui/react";
import { Filter } from "./components/Filter";
import { NewTodo } from "./components/NewTodo";
import { EditTodo } from "./components/EditTodo";
import { TodoList } from "./components/TodoList";
import { TotalTodos } from "./components/TotalTodos";
import FetchTodos from "./components/FetchTodos";

function App() {
  return (
    <VStack spacing={4}>
      <Filter />
      <TodoList />
      <Divider />
      <TotalTodos />
      <Flex gap={4}>
        <NewTodo />
        <FetchTodos />
      </Flex>
      <EditTodo />
    </VStack>
  );
}

export default App;
