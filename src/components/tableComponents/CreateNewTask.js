import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {
  Grid,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Text,
} from '@chakra-ui/react'
import { SmallAddIcon } from '@chakra-ui/icons'

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Task name is required').min(3, 'Task name must be at least 3 characters').max(50, 'Task name must be less than 50 characters'),
  start: Yup.date().required('Start date is required'),
  end: Yup.date().required('End date is required').min(Yup.ref('start'), 'End date must be after start date')
});

const CreateNewTask = ({ submitTaskForm }) => {
  return (
    <Formik
      initialValues={{ name: '', start: '', end: '' }}
      validationSchema={validationSchema}
      onSubmit={submitTaskForm}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <Text fontSize="xl" fontWeight="bold" mt={8}>Add New Task</Text>
          <Grid templateColumns={{ base: "repeat(1, 1fr)", xl: "repeat(3, 1fr)" }} gap={4} mt={4}>
            <FormControl mt={4}>
              <FormLabel htmlFor="name">Task Name</FormLabel>
              <Input
                id="name"
                name="name"
                variant="outline"
                as={Field}
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors}
                touched={touched}
                isInvalid={touched.name && !!errors.name}
              />
              <ErrorMessage name="name">{(msg) => <FormHelperText>{msg}</FormHelperText>}</ErrorMessage>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel htmlFor="start">Start Date</FormLabel>
              <Input
                id="start"
                name="start"
                variant="outline"
                as={Field}
                type="date"
                value={values.start}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors}
                touched={touched}
                isInvalid={touched.start && !!errors.start}
              />
              <ErrorMessage name="start">{(msg) => <FormHelperText>{msg}</FormHelperText>}</ErrorMessage>
            </FormControl>


            <FormControl mt={4}>
              <FormLabel htmlFor="end">End Date</FormLabel>
              <Input
                id="end"
                name="end"
                variant="outline"
                as={Field}
                type="date"
                value={values.end}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors}
                touched={touched}
                isInvalid={touched.end && !!errors.end}
              />
              <ErrorMessage name="end">{(msg) => <FormHelperText>{msg}</FormHelperText>}</ErrorMessage>
            </FormControl>
          </Grid>

          <Button
            mt={4}
            mb={8}
            colorScheme="teal"
            type="submit">
            Add Task
            <SmallAddIcon ml={1} />
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default CreateNewTask