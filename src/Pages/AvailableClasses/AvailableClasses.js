import { useRef } from "react";
import { memo } from "react";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import { dayOptions, timeOptions, getCurrentTimeSlot } from "../../data/daysAndTimeSlots";
const AvailableClasses = memo(() => {
  const currentDay = new Date().toLocaleString("en-us", {
    weekday: "long"
  });
  const currentTime = getCurrentTimeSlot();
  const availableClassrooms = useRef({});
  const selectedDay = useRef(currentDay);
  const selectedTime = useRef(currentTime);
  const [results, setResults] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/data.json");
      const data = await response.json();
      availableClassrooms.current = data.availableRooms;
    }
    fetchData();
  }, []);
  const handleDayChange = event => {
    selectedDay.current.value = event.target.value;
  };
  const handleTimeChange = event => {
    selectedTime.current.value = event.target.value;
  };
  const handleOnSubmit = event => {
    event.preventDefault();
    if (selectedDay.current.value && selectedTime.current.value) {
      setResults(availableClassrooms.current[selectedDay.current.value][selectedTime.current.value]);
    }
  };
  return <div>
            <form action="" onSubmit={handleOnSubmit} className="mx-3">
                <div className="sm:flex justify-center sm:space-x-4 space-y-3 sm:space-y-0">
                    <select id="day" className="select" ref={selectedDay}>
                        <option value="" disabled>
                            🌱 Select day
                        </option>
                        {dayOptions?.map(option => <option key={option.value} value={option.value}>
                                {option.label}
                            </option>)}
                    </select>
                    <select id="time" className="select" ref={selectedTime}>
                        <option value="" disabled>
                            ⏰ Select time slot
                        </option>
                        {timeOptions?.map(option => <option key={option.value} value={option.value}>
                                {option.label}
                            </option>)}
                    </select>
                </div>
                <PrimaryButton type="submit" label="Check Available Rooms" className="mt-4" />
            </form>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 mt-6 mx-3">
                {results?.map(result => <div className={`py-4 px-4 border rounded ${result.endsWith("L") ? `bg-blue-100 dark:bg-blue-800/30 dark:border-blue-600/30` : `bg-gray-50 dark:bg-gray-700 dark:border-gray-600`}`} key={result}>
                        <p>{result}</p>
                    </div>)}
            </div>
        </div>;
});
export default AvailableClasses;