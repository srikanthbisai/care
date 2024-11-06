import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserStats {
  height: number;
  weight: number;
  bmi: number;
  sugarLevels: number;
  bpSystolic: number;
  bpDiastolic: number;
  medicalHistory: string[];
}

interface StatsState {
  [userId: string]: UserStats;
}

const initialState: StatsState = {
  '123': {
    height: 170,
    weight: 60,
    bmi: 20,
    sugarLevels: 90,
    bpSystolic: 120,
    bpDiastolic: 80,
    medicalHistory: [],
  },
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    updateHeight: (state, action: PayloadAction<{ userId: string; height: number }>) => {
      state[action.payload.userId].height = action.payload.height;
    },
    updateWeight: (state, action: PayloadAction<{ userId: string; weight: number }>) => {
      state[action.payload.userId].weight = action.payload.weight;
    },
    updateBMI: (state, action: PayloadAction<{ userId: string; bmi: number }>) => {
      state[action.payload.userId].bmi = action.payload.bmi;
    },
    updateSugarLevels: (state, action: PayloadAction<{ userId: string; sugarLevels: number }>) => {
      state[action.payload.userId].sugarLevels = action.payload.sugarLevels;
    },
    updateBloodPressure: (state, action: PayloadAction<{ userId: string; bpSystolic: number; bpDiastolic: number }>) => {
      state[action.payload.userId].bpSystolic = action.payload.bpSystolic;
      state[action.payload.userId].bpDiastolic = action.payload.bpDiastolic;
    },
    addMedicalHistory: (state, action: PayloadAction<{ userId: string; history: string }>) => {
      state[action.payload.userId].medicalHistory.push(action.payload.history);
    },
    removeMedicalHistory: (state, action: PayloadAction<{ userId: string; history: string }>) => {
      state[action.payload.userId].medicalHistory = state[action.payload.userId].medicalHistory.filter(
        (item) => item !== action.payload.history
      );
    },
  },
});

export const {
  updateHeight,
  updateWeight,
  updateBMI,
  updateSugarLevels,
  updateBloodPressure,
  addMedicalHistory,
  removeMedicalHistory,
} = statsSlice.actions;

export default statsSlice.reducer;
