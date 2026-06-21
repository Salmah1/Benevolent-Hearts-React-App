import * as React from "react";
import dayjs from "dayjs";

import { Stack, TextField } from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DateandTime({ setCollectionComplete }) {
  const [value, setValue] = React.useState(null);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  // Notify parent component when both date and time have been selected
  React.useEffect(() => {
    setCollectionComplete(Boolean(value));
  }, [value, setCollectionComplete]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3} sx={{ alignItems: "center" }}>
        <DatePicker
          disablePast
          className="mb-5"
          label="Date"
          inputFormat="DD / MM / YYYY"
          value={value}
          minDate={dayjs().add(1, "day")}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField sx={{ width: "50%" }} {...params} />
          )}
        />

        <TimePicker
          label="Time"
          value={value}
          onChange={handleChange}
          minTime={
            value && value.isSame(dayjs(), "day")
              ? dayjs()
              : dayjs().startOf("day")
          }
          renderInput={(params) => (
            <TextField sx={{ width: "50%" }} {...params} />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}
