import { useState, useEffect } from 'react';
import axios from '../api/axios';

const GradesButton = ({ id }) => {
    const [activeButton, setActiveButton] = useState(null); // Current active grading period
    const [grades, setGrades] = useState(null); // Grades for the active period
    const [error, setError] = useState(null); // Error handling

    // Fetch grades dynamically when `activeButton` changes
    useEffect(() => {
        if (!activeButton) return;

        const fetchGrade = async () => {
            try {
                const response = await axios.get(`/grade/${id}/${}`); // Backend endpoint for grades
                setGrades(response.data.grade); // Assuming response contains { grade: "1.0" }
                setError(null);
            } catch (err) {
                setError('Failed to fetch grades.');
                setGrades(null);
            }
        };

        fetchGrade();
    }, [activeButton, id]);

    return (
        <div>
            <div className="flex justify-between items-center w-full">
                {['prelim', 'midterm', 'semiFinal', 'final'].map((period) => (
                    <button
                        key={period}
                        onClick={() => setActiveButton(period)}
                        className={`px-4 py-2 rounded transition ${
                            activeButton === period
                                ? 'bg-red-900 text-white'
                                : 'bg-gray-200 text-black hover:bg-gray-400 hover:text-white'
                        }`}
                    >
                        {period}
                    </button>
                ))}
            </div>
            <div className="bg-black text-white p-4 mt-4">
                {grades ? (
                    <h1>{grades}</h1>
                ) : error ? (
                    <h1 className="text-red-500">{error}</h1>
                ) : (
                    <h1>Select a grading period to view the grade.</h1>
                )}
            </div>
        </div>
    );
};

export default GradesButton;
