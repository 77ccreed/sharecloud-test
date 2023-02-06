import React, { useState, useEffect } from 'react';
import { Tr, Td } from "@chakra-ui/react";
import NUM_MONTHS_IN_QUARTER from "../../constants/NUM_MONTHS_IN_QUARTER";

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


const CurrentQuarterWeeks = ({ currentQuarter, quarterWeeks }) => {
  const [minusOneDay, setMinusOneDay] = useState(0);

  useEffect(() => {
    if (currentQuarter === 1 && quarterWeeks().length === 12) {
      setMinusOneDay(1);
    }
    if (currentQuarter === 1 && quarterWeeks().length === 13) {
      setMinusOneDay(0);
    }
  }, [currentQuarter, quarterWeeks]);


  const addDays = getAddDays(currentQuarter);
  const weekNumbers = quarterWeeks().map((week, index) => {
    const quarterWeek = (currentQuarter - 1) * NUM_MONTHS_IN_QUARTER * 4 + addDays + index + 1 - (currentQuarter === 1 ? 0 : minusOneDay);


    return (
      <Td
        key={quarterWeek}
        bg={"gray.100"}
        color={"gray.500"}
        fontSize={{ base: "xs", xl: "md" }}
        fontWeight={{ base: "xs", xl: "medium" }}
        textTransform={"uppercase"}
        letterSpacing={{ base: "small", xl: "wider" }}
        textAlign={"center"}
        borderWidth={"1px"}
        borderColor={"gray.200"}
      >
        {quarterWeek}
      </Td>
    );
  });

  return (
    <Tr key={currentQuarter} w="100%">
      {weekNumbers}
    </Tr>
  );
};

export default CurrentQuarterWeeks;