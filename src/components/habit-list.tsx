import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";

const HabitList: React.FC = () => {
  const habits = useSelector((state: RootState) => state.habits.habits);
  const today = new Date().toISOString().split("T")[0];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 4,
      }}
    >
      {habits.map((habit) => (
        <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
          <Grid container alignItems="center" spacing={2}>
            {/* LEFT */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">{habit.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {habit.frequency}
              </Typography>
            </Grid>

            {/* RIGHT */}
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1,
                }}
              >
                <Button
                  variant="outlined"
                  color={
                    habit.completeDates.includes(today)
                      ? "success"
                      : "primary"
                  }
                  startIcon={<CheckCircle />}
                >
                  {
                    habit.completeDates.includes(today) ? 'Completed': 'Mark Complete'
                  }
                </Button>
                <Button variant="outlined" color="error" startIcon={<Delete/>}>
                    Remove
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
};

export default HabitList;
