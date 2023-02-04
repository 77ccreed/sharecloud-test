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
  const addDays = getAddDays(currentQuarter);
  const weekNumbers = quarterWeeks().map((week, index) => {
    const quarterWeek = (currentQuarter - 1) * NUM_MONTHS_IN_QUARTER * 4 + addDays + index + 1;
    return (
      <Td
        key={quarterWeek}
        bg={"gray.100"}
        color={"gray.500"}
        fontSize={"16px"}
        fontWeight={"medium"}
        textTransform={"uppercase"}
        letterSpacing={"wider"}
        textAlign={"center"}
        borderWidth={"1px"}
        borderColor={"gray.200"}

      >
        {quarterWeek}
      </Td>
    );
  });

  return (
    <Tr key={currentQuarter}>
      {weekNumbers}
    </Tr>
  );
};

export default CurrentQuarterWeeks;