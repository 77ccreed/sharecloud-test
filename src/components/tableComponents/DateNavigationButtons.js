import React from 'react'
import { Button, Grid } from '@chakra-ui/react'
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'

const DateNavigationButtons = ({ handleChangeDate, setCurrentDate }) => {
  return (
    <Grid templateColumns={{ base: "repeat(1, 1fr)", xl: "repeat(3, 1fr)" }} gap={4} mb={4}>
      <Button onClick={() => handleChangeDate(-3)} colorScheme="teal"
        aria-label="Go to previous quarter"><ArrowBackIcon mr={2} />Previous Quarter</Button>
      <Button onClick={() => setCurrentDate(new Date())} colorScheme="teal" aria-label="Go to current quarter">Current Quarter</Button>
      <Button onClick={() => handleChangeDate(3)} colorScheme="teal" aria-label="Go to next quarter">Next Quarter <ArrowForwardIcon ml={2} /></Button>
    </Grid>
  );
}

export default DateNavigationButtons;