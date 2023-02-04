import React from 'react'
import { Box, Button } from '@chakra-ui/react'
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons'

const DateNavigationButtons = ({ handleChangeDate, setCurrentDate }) => {
  return (
    <Box d="flex" justifyContent="center" alignItems="center" mb={4} mt={8}>
      <Button onClick={() => handleChangeDate(-3)} mr={4} colorScheme="teal" aria-label="Go to previous quarter"><ArrowBackIcon mr={2} />Previous Quarter</Button>
      <Button onClick={() => setCurrentDate(new Date())} mr={4} colorScheme="teal" aria-label="Go to current quarter">Current Quarter</Button>
      <Button onClick={() => handleChangeDate(3)} colorScheme="teal" aria-label="Go to next quarter">Next Quarter <ArrowForwardIcon ml={2} /></Button>
    </Box>
  );
}

export default DateNavigationButtons;