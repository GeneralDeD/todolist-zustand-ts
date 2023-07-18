import { Button, Checkbox, HStack, Stack, Text, Grid, GridItem, Container, Flex } from "@chakra-ui/react";
import { todoType, useFilter, useTodos } from "../store";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { FC } from "react";

const Todo: FC<todoType> = ({ id, title, completed }) => {
  const setStatus = useTodos((state) => state.setStatus);
  const editTodoId = useTodos((state) => state.editTodoId);
  const deleteTodo = useTodos((state) => state.deleteTodo);

  return (
    <HStack spacing={4}>
      <Container>
        <Grid templateColumns="calc(100% - 100px) 50px 50px" gap={2}>
          <GridItem>
            <Flex gap={2}>
              <Checkbox isChecked={completed} onChange={() => setStatus(id)} />
              <Text>{title}</Text>
            </Flex>
          </GridItem>
          <GridItem>
            <Button onClick={() => editTodoId({ id, title, completed })} colorScheme="yellow">
              <EditIcon />
            </Button>
          </GridItem>
          <GridItem>
            <Button onClick={() => confirm("Are you sure?") && deleteTodo(id)} colorScheme="red">
              <DeleteIcon />
            </Button>
          </GridItem>
        </Grid>
      </Container>
    </HStack>
  );
};

const TodoList = () => {
  const filter = useFilter((state) => state.filter);
  const todos = useTodos((state) => {
    switch (filter) {
      case "completed":
        return state.todos.filter((todo) => todo.completed);
      case "uncompleted":
        return state.todos.filter((todo) => !todo.completed);
      default:
        return state.todos;
    }
  });

  return (
    <Stack minH="300px">
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </Stack>
  );
};

export { TodoList };
