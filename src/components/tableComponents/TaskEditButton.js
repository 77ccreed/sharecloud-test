import {
  FormControl,
  Button,
  Text
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'

const TaskEditButton = ({ task, handleEditTask, }) => {
  return (
    <Text fontSize="md" fontWeight="bold" color="gray.700" mt={2}>
      <FormControl>
        <span>{task.name}</span>
        <Button
          ml={4} colorScheme="teal" variant="outline" size="sm"
          onClick={() => handleEditTask(task)}>Edit Task<EditIcon ml={2} /></Button>
      </FormControl>
    </Text>
  )
}

export default TaskEditButton