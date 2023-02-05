import React, { useState, useMemo, useCallback } from 'react';
import { addMonths, getQuarter, getWeek, format, differenceInCalendarISOWeeks } from 'date-fns';
import {
  Container,
  Box,
  Divider,
  List,
  ListItem,
  Table,
  TableContainer,
  Tbody,
  Tr,
  Td,
  Tooltip,
  Text,
  useToast,
} from '@chakra-ui/react'
import QuarterlyTableHeader from './tableComponents/QuarterlyTableHeader';
import CurrentQuarterWeeks from './tableComponents/CurrentQuarterWeeks';
import DateNavigationButtons from './tableComponents/DateNavigationButtons';
import CreateNewTask from './tableComponents/CreateNewTask';
import EditQuarterlyTableTask from './tableComponents/EditQuarterlyTableTask';
import TaskEditButton from './tableComponents/TaskEditButton';
import NUM_MONTHS_IN_QUARTER from "../constants/NUM_MONTHS_IN_QUARTER";


const getMonthNamesForQuarter = (currentQuarter) => {
  const monthNames = [];
  for (let i = (currentQuarter - 1) * NUM_MONTHS_IN_QUARTER; i < (currentQuarter - 1) * NUM_MONTHS_IN_QUARTER + NUM_MONTHS_IN_QUARTER; i++) {
    monthNames.push(format(new Date(new Date().getFullYear(), i), 'MMMM'));
  }
  return monthNames;
};


const getAddDays = (currentQuarter) => {
  switch (currentQuarter) {
    case 1:
      return 0;
    case 2:
      return 1;
    case 3:
      return 2;
    case 4:
      return 3;
    default:
      return 0;
  }
};

const QuarterlyTableTaskRow = ({ task, currentQuarter, quarterWeeks, currentDate }) => {
  return (
    <Tr key={task.id + task.name} textTransform="uppercase" letterSpacing="wider" textAlign="center" borderWidth="1px" borderColor="gray.200" fontSize="16px" fontWeight="medium">
      {quarterWeeks().map(week => {
        const currentYear = currentDate.getFullYear();

        week = week + (currentQuarter - 1) * NUM_MONTHS_IN_QUARTER * 4 + getAddDays(currentQuarter);

        let isTaskBelongsToCurrentYear = task.start.includes(currentYear) && task.end.includes(currentYear);

        const startYear = new Date(task.start).getFullYear();
        const endYear = new Date(task.end).getFullYear();

        const isTaskTakeMoreThenOneYear = startYear !== endYear;

        if (isTaskTakeMoreThenOneYear) {
          if (task.start.includes(currentYear)) {
            task.endWeek = 52;
            isTaskBelongsToCurrentYear = true;
          } else if (task.end.includes(currentYear)) {
            task.startWeek = 1;
            isTaskBelongsToCurrentYear = true;
          } else if (startYear < currentYear && endYear > currentYear) {
            task.startWeek = 1;
            task.endWeek = 52;
            isTaskBelongsToCurrentYear = true;
          }
        }

        const isTaskMustBeColored = week >= task.startWeek && week <= task.endWeek && isTaskBelongsToCurrentYear
          ? 'green.300'
          : 'gray.50';

        const title =
          week >= task.startWeek && week <= task.endWeek && isTaskBelongsToCurrentYear
            ? [task.name, task.start, task.end].join(' - ')
            : '';

        task.startWeek = getWeek(new Date(task.start));
        task.endWeek = getWeek(new Date(task.end));

        return (
          <Tooltip hasArrow fontSize='md' label={title} aria-label={title} key={week}>
            <Td
              key={week}
              bg={isTaskMustBeColored}
              color={"gray.500"}
              fontSize={"16px"}
              fontWeight={"medium"}
              textTransform={"uppercase"}
              letterSpacing={"wider"}
              textAlign={"center"}
              borderWidth={"1px"}
              borderColor={"gray.200"}
            >
              <Text>
                {""}
              </Text>
            </Td>
          </Tooltip>
        );
      })}
    </Tr>
  );
};

const TasksQuarterlyTable = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const toast = useToast()

  const [currentQuarter, monthNames] = useMemo(() => {
    const cq = getQuarter(currentDate);
    const mn = getMonthNamesForQuarter(cq);
    return [cq, mn];
  }, [currentDate]);


  const handleChangeDate = useCallback((value) => {
    setCurrentDate(addMonths(currentDate, value));
  }, [currentDate]);


  const quarterWeeks = () => {
    const weeksInQuarter = differenceInCalendarISOWeeks(
      new Date(currentDate.getFullYear(), (currentQuarter - 1) * NUM_MONTHS_IN_QUARTER + 2, 31),
      new Date(currentDate.getFullYear(), (currentQuarter - 1) * NUM_MONTHS_IN_QUARTER, 1)
    );
    return Array.from({ length: weeksInQuarter }, (_, i) => i + 1);
  };


  //use Formik to validate the form
  const submitTaskForm = (values, isValidating, isSubmitting) => {

    // Calculate the week number that the task starts on
    const startDate = new Date(values.start);
    const startWeek = getWeek(startDate);

    // Calculate the week number that the task ends on
    const endDate = new Date(values.end);
    const endWeek = getWeek(endDate);

    const newTask = {
      name: values.name,
      start: values.start,
      end: values.end,
      startWeek: startWeek,
      endWeek: endWeek,
      id: Date.now()
    };

    if (tasks.length >= 10) {
      toast({
        title: "You can't add more than 10 tasks",
        description: "You can delete older tasks to add new ones",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
      return;
    } else {
      setTasks(prevTasks => [...prevTasks, newTask])
      toast({
        title: "Task added to the table",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    }


    values.name = '';
    values.start = '';
    values.end = '';

    isSubmitting = false;
    isValidating = false;
  }

  const handleEditTask = (task) => {
    setEditingTask({ ...task });
  }

  const handleSaveTask = (editedTask) => {

    const updatedTasks = tasks.map(task => {
      if (task.id === editedTask.id) {
        return {
          ...task,
          ...editedTask,
          startWeek: getWeek(new Date(editedTask.start)),
          endWeek: getWeek(new Date(editedTask.end))
        }
      }
      return task;
    });
    setTasks(updatedTasks);
    setEditingTask(null);
    toast({
      title: "Task updated",
      status: "success",
      duration: 9000,
      isClosable: true,
    })
  }

  const handleCancelEdit = () => {
    setEditingTask(null);
    toast({
      title: "Edit cancelled",
      status: "info",
      duration: 9000,
      isClosable: true,
    })
  }

  return (
    <TableContainer maxW="container.xl" w={{ base: "100%", md: "80%" }}
      p={4} overflow="scroll" m="auto">
      <Box textAlign="center" fontSize="4xl" fontWeight="bold" p={4}>Quarterly Tasks {" "}{currentDate.getFullYear()}</Box>
      <QuarterlyTableHeader monthNames={monthNames} />
      <Table variant="simple" size={{ base: "sm", md: "md" }}>

        <Tbody >
          <CurrentQuarterWeeks currentQuarter={currentQuarter} quarterWeeks={quarterWeeks} />

          {tasks.map(task => {
            return (
              <QuarterlyTableTaskRow task={task} currentQuarter={currentQuarter} quarterWeeks={quarterWeeks} currentDate={currentDate} key={task.id} />
            );
          })}

        </Tbody>
      </Table>

      {
        tasks.length > 0 ? (
          <Divider borderColor="gray.200" mt={4} mb={4} />
        ) : null
      }
      {tasks.length > 0 ? (
        <Text fontSize="xl" fontWeight="bold" mt={8}>Tasks List</Text>
      ) : null}


      <List spacing={3} mt={4} mb={4} textAlign="left">
        {
          tasks.map((task) => (

            <ListItem key={task.id} ml={0} w="100%">
              {editingTask && task.id === editingTask.id ? (
                <EditQuarterlyTableTask task={task} handleEditTask={handleEditTask} handleSaveTask={handleSaveTask} handleCancelEdit={handleCancelEdit}
                  setEditingTask={setEditingTask} tasks={tasks} setTasks={setTasks}
                  editingTask={editingTask}
                />
              ) : (
                <TaskEditButton task={task} handleEditTask={handleEditTask} />
              )}
            </ListItem>
          ))
        }
      </List>

      <DateNavigationButtons handleChangeDate={handleChangeDate} setCurrentDate={setCurrentDate} />

      <Divider borderColor="gray.200" borderWidth="2px" />

      <CreateNewTask submitTaskForm={submitTaskForm} />
    </TableContainer>
  );
}

export default TasksQuarterlyTable;