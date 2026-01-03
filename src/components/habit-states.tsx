import React, { useEffect } from 'react'
import { fetchHabits, type Habit } from "../store/habit-slice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState,AppDispatch } from "../store/store";
import { LinearProgress, Paper, Typography } from '@mui/material';

const HabitStats = () => {
    const {habits, isLoading, error} = useSelector((state: RootState) => state.habits);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=>{
    dispatch(fetchHabits())
  },[])

  const getCompletdToday = () => {
    const today = new Date().toISOString().split("T")[0]
    return habits.filter((habit) => habit.completeDates.includes(today)).length
  }
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
  const geLongestStreak = () => {
    return Math.max(...habits.map(getStreak),0)
  }
  if(isLoading){
    return <LinearProgress />
  }
  if(error){
    return <Typography color='error' >{error}</Typography>
  }
  return (
    <Paper elevation={2} sx={{
        p:2,
        mt: 4
    }} >
        <Typography variant='h6' gutterBottom>
            Habit Statistics
        </Typography>
        <Typography variant='body1'>
            Total Habits: {habits.length}
        </Typography>
        <Typography variant='body1'>
            Completed Today: {getCompletdToday()}
        </Typography>
        <Typography variant='body1'>
        Longest Streak: {geLongestStreak()}
        </Typography>
    </Paper>
  )
}

export default HabitStats