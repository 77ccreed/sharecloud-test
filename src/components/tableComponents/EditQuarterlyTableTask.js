import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Divider, Input, Grid, FormLabel, Button, FormControl, FormHelperText, Text, useToast
} from '@chakra-ui/react';
import { CalendarIcon, DeleteIcon, CloseIcon } from '@chakra-ui/icons'

const TaskNameInput = ({ value, onChange, onBlur, errors, touched }) => (
  <FormControl>
    <FormLabel htmlFor="name">Task:</FormLabel>
    <Input
      type="text"
      name="name"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      isInvalid={touched.name && !!errors.name}
    />
    <ErrorMessage name="name">{(msg) => <FormHelperText>{msg}</FormHelperText>}</ErrorMessage>
  </FormControl>
);

const TaskStartInput = ({ value, onChange, onBlur, errors, touched }) => (
  <FormControl>
    <FormLabel htmlFor="start">Start:</FormLabel>
    <Input
      type="date"
      name="start"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      isInvalid={touched.start && !!errors.start}
    />
    <ErrorMessage name="start">{(msg) => <FormHelperText>{msg}</FormHelperText>}</ErrorMessage>
  </FormControl>
);

const TaskEndInput = ({ value, onChange, onBlur, errors, touched }) => (
  <FormControl>
    <FormLabel htmlFor="end">End:</FormLabel>
    <Input
      type="date"
      name="end"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      isInvalid={touched.end && !!errors.end}
    />
    <ErrorMessage name="end">{(msg) => <FormHelperText>{msg}</FormHelperText>}</ErrorMessage>
  </FormControl>
);

const EditQuarterlyTableTask = ({ task, tasks, setTasks, handleSaveTask, handleCancelEdit }) => {

  const toast = useToast();

  const handleDelete = () => {
    setTasks(tasks.filter((t) => t.id !== task.id));
    toast({
      title: 'Task deleted.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Formik
      initialValues={{ name: task.name, start: task.start, end: task.end }}
      validationSchema={Yup.object({
        name: Yup.string().required('Task name is required'),
        start: Yup.date().required('Start date is required'),
        end: Yup.date().required('End date is required').min(Yup.ref('start'), 'End date must be after start date'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        handleSaveTask({ ...task, ...values });
        setSubmitting(false);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <Divider borderColor="gray.200" borderWidth="2px" />
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Edit Task
          </Text>
          <Grid templateColumns={{ base: "repeat(1, 1fr)", xl: "repeat(3, 1fr)" }} gap={4} mt={4}>
            <TaskNameInput
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
            />
            <TaskStartInput
              value={values.start}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
            />
            <TaskEndInput
              value={values.end}
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors}
              touched={touched}
            />
          </Grid>
          <Grid templateColumns={{ base: "repeat(1, 1fr)", xl: "repeat(3, 1fr)" }} gap={4} mt={4}>
            <Button type="submit" disabled={isSubmitting} mt={4} mr={2} colorScheme="green">
              Save Task <CalendarIcon ml={2} />
            </Button>
            <Button onClick={handleDelete} mt={4} mr={2} colorScheme="red">
              Delete Task <DeleteIcon ml={2} />
            </Button>
            <Button onClick={handleCancelEdit} mt={4} mr={2} colorScheme="gray">
              Cancel <CloseIcon ml={2} />
            </Button>
          </Grid>
          <Divider borderColor="gray.200" borderWidth="2px" mb={4} mt={4} />
        </Form>
      )}
    </Formik>
  );
};

export default EditQuarterlyTableTask;