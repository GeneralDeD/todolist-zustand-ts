import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useTodos } from "../store";
import { shallow } from "zustand/shallow";

const EditTodo = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { todo, editTodo, editTodoId } = useTodos(
    (state) => ({
      todo: state.todo,
      editTodo: state.editTodo,
      editTodoId: state.editTodoId,
    }),
    shallow
  );
  const isOpen = !!todo;

  const handleClose = () => {
    editTodoId(null);
  };

  const handleEditTodo = () => {
    if (todo && "id" in todo && ref?.current?.value) {
      editTodo(todo.id, ref.current.value);
    }
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={handleClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit todo</DrawerHeader>

          <DrawerBody>
            <Input
              placeholder="Type here..."
              ref={ref}
              onKeyDown={(e) => e.key === "Enter" && handleEditTodo()}
              autoFocus
              defaultValue={todo?.title}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleEditTodo}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export { EditTodo };
