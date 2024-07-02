import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { styled } from "@mui/material";
import dayjs from "dayjs";

export default function CommonlyUsedComponents({ onAccepts, defaultValue }) {
  const CustomDateTimePicker = styled(DateTimePicker)(({ theme }) => ({
    input: {
      height: "10px",
      fontSize: "12px",
    },
  }));
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem>
        <CustomDateTimePicker
          defaultValue={dayjs(defaultValue)}
          onAccept={onAccepts}
          slotProps={{ textField: { size: "small" } }}
        />
      </DemoItem>
    </LocalizationProvider>
  );
}
