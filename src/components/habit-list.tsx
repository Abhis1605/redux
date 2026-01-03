import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { CheckCircle, Delete } from "@mui/icons-material";
import {  toggleHabit, removeHabit } from "../store/habit-slice";
import type { Habit } from "../store/habit-slice";

const HabitList: React.FC = () => {
  const habits = useSelector((state: RootState) => state.habits.habits);
  const dispatch = useDispatch<AppDispatch>();
  const today = new Date().toISOString().split("T")[0];
  const getStreak = (habit: Habit) => {
    let streak = 0 
    const currentDate = new Date()

    while(true){
        const dateString = currentDate.toISOString().split("T")[0]
        if(habit.completeDates.includes(dateString)){
            streak++
            currentDate.setDate(currentDate.getDate() - 1)
        }else{
            break;
        }
    }
    return streak;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4   }}>
      {habits.map((habit) => (
        <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
            <Box>
              <Typography variant="h6">{habit.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {habit.frequency}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                color={
                  habit.completeDates.includes(today)
                    ? "success"
                    : "primary"
                }
                startIcon={<CheckCircle />}
                onClick={() =>
                  dispatch(toggleHabit({ id: habit.id, date: today }))
                }
              >
                {habit.completeDates.includes(today)
                  ? "Completed"
                  : "Mark Complete"}
              </Button>

              <Button 
                variant="outlined" 
                color="error" 
                startIcon={<Delete />}
                onClick={() => dispatch(removeHabit(habit.id))}
              >
                Remove
              </Button>
            </Box>
          </Box>
          <Box sx={{mt:2}}>
                <Typography variant="body2">
                    Current Streak: {getStreak(habit)} days
                </Typography>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default HabitList;
