import { Button, Stack } from "@chakra-ui/react";
import { useFilter } from "../store";
import { filterData } from "../shared/consts/filter";

const Filter = () => {
  const { filter, setFilter } = useFilter();

  return (
    <Stack spacing={2} direction="row" mt="8">
      {filterData.map((item) => (
        <Button
          key={item.value}
          isDisabled={filter === item.value}
          onClick={() => setFilter(item.value)}
          colorScheme="blue"
        >
          {item.title}
        </Button>
      ))}
    </Stack>
  );
};

export { Filter };
