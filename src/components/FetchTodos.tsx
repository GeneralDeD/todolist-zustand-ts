import { useTodos } from "../store";
import { Button } from "@chakra-ui/react";
import { shallow } from "zustand/shallow";

const FetchTodos = () => {
  const { loading, error, fetchTodos } = useTodos(
    (state) => ({
      loading: state.loading,
      error: state.error,
      fetchTodos: state.fetchTodos,
    }),
    shallow
  );

  return (
    <Button isDisabled={!!(loading || error)} isLoading={loading} onClick={fetchTodos} colorScheme="purple">
      Fetch Todos
    </Button>
  );
};

export default FetchTodos;
