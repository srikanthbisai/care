import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  updateHeight,
  updateWeight,
  updateBMI,
  addMedicalHistory,
  removeMedicalHistory,
} from "../features/statsSlice";
import BarChart from "../components/BarChart"; // Import the BarChart component
import GeminiComponent from "../components/GeminiApi";
import Footer from "../components/Footer";

const ProfilePage: React.FC = () => {
  const userId = "123"; // Replace with dynamic userId if needed
  const userStats = useSelector((state: RootState) => state.stats[userId]);
  const dispatch = useDispatch();

  const [newHistory, setNewHistory] = useState("");

  if (!userStats) {
    return <div>Loading...</div>; // Handle case where user data is not available
  }

  const handleAddMedicalHistory = () => {
    if (newHistory.trim()) {
      dispatch(addMedicalHistory({ userId, history: newHistory }));
      setNewHistory("");
    }
  };

  const handleRemoveMedicalHistory = (history: string) => {
    dispatch(removeMedicalHistory({ userId, history }));
  };

  const barData = [
    { category: "Height", globalAverage: 170, userValue: userStats.height },
    { category: "Weight", globalAverage: 70, userValue: userStats.weight },
    { category: "BMI", globalAverage: 22, userValue: userStats.bmi },
  ];

  return (
    <div className="min-h-screen p-4  mx-auto bg-white rounded-lg relative">
      <h1 className="text-2xl font-semibold mb-4">Profile Information</h1>

      <div className="flex space-x-8 ">
        {/* Left Container: Update Form */}
        <div className="flex-1 mt-20">
          <form className="space-y-10">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Height (cm)
              </label>
              <input
                type="number"
                value={userStats.height}
                onChange={(e) =>
                  dispatch(updateHeight({ userId, height: +e.target.value }))
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-1/3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Weight (kg)
              </label>
              <input
                type="number"
                value={userStats.weight}
                onChange={(e) =>
                  dispatch(updateWeight({ userId, weight: +e.target.value }))
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-1/3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                BMI
              </label>
              <input
                type="number"
                value={userStats.bmi}
                onChange={(e) =>
                  dispatch(updateBMI({ userId, bmi: +e.target.value }))
                }
                className="mt-1 p-2 border border-gray-300 rounded-md w-1/3"
              />
            </div>

            {/* Medical History */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Medical History
              </label>
              <div className="flex space-x-2">
                <textarea
                  rows={20}
                  value={newHistory}
                  onChange={(e) => setNewHistory(e.target.value)}
                  className="mt-1 p-4 border border-gray-300 rounded-md w-1/2 h-24 resize-none"
                />

                <button
                  type="button"
                  onClick={handleAddMedicalHistory}
                  className="px-10 bg-blue-500 text-white rounded-md"
                >
                  Add
                </button>
              </div>
            </div>
          </form>

          <ul className="mt-4 space-y-2 ">
            {userStats.medicalHistory.map((history: string, index: number) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-2 rounded-md w-2/3"
              >
                <span>{history}</span>
                <button
                  onClick={() => handleRemoveMedicalHistory(history)}
                  className="p-1 bg-red-500 text-white rounded-md"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Container: Bar Chart */}
        <div className="flex-1">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Stats Overview</h2>
            <BarChart data={barData} width={600} height={400} />
          </div>
        </div>
      </div>
      <Footer/>
      <GeminiComponent/>
    </div>
  );
};

export default ProfilePage;
