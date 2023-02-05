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
  Stack,
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
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <Text fontSize="xl" fontWeight="bold" mt={8}>Add New Task</Text>

          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <Stack mt={4}>
              <FormControl>
                <FormLabel htmlFor="name">Task Name</FormLabel>
                <Input
                  id="name"
                  name="name"
                  variant="outline"
                  as={Field}
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isInvalid={touched.name && !!errors.name}
                />
                <ErrorMessage name="name">{(msg) => <FormHelperText>{msg}</FormHelperText>}</ErrorMessage>
              </FormControl>
            </Stack>

            <Stack mt={4}>
              <FormControl>
                <FormLabel htmlFor="start">Start Date</FormLabel>
                <Input
                  id="start"
                  name="start"
                  variant="outline"
                  as={Field}
                  type="date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isInvalid={touched.start && !!errors.start}
                />
                <ErrorMessage name="start">{(msg) => <FormHelperText>{msg}</FormHelperText>}</ErrorMessage>

              </FormControl>
            </Stack>

            <Stack mt={4}>
              <FormControl>
                <FormLabel htmlFor="end">End Date</FormLabel>
                <Input
                  id="end"
                  name="end"
                  variant="outline"
                  as={Field}
                  type="date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  isInvalid={touched.end && !!errors.end}
                />
                <ErrorMessage name="end">{(msg) => <FormHelperText>{msg}</FormHelperText>}</ErrorMessage>
              </FormControl>
            </Stack>
          </Grid>

          <Button
            mt={4}
            mb={8}
            colorScheme="teal"
            //isLoading={isSubmitting || isValidating}
            //loadingText="Submitting"
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