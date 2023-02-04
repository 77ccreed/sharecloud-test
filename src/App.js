import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import TasksQuarterlyTable from './components/TasksQuarterlyTable';


function App() {
  return (
    <ChakraProvider>
      <TasksQuarterlyTable />
    </ChakraProvider>
  );
}

export default App;
