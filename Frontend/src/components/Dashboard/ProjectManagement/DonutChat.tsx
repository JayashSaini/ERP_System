import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/UseAppSelector";

// Register the components
ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart() {
  const [completed, setCompleted] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [pending, setPending] = useState(0);

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const storedTheme = localStorage.getItem("theme");
  const tasks = useAppSelector((state) => state.project.project?.tasks);

  useEffect(() => {
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    }
  }, [storedTheme]);

  useEffect(() => {
    if (tasks) {
      // Initialize counts
      let completedCount = 0;
      let inProgressCount = 0;
      let pendingCount = 0;

      // Count the tasks based on status
      tasks.forEach((task) => {
        switch (task.taskStatus) {
          case "COMPLETED":
            completedCount++;
            break;
          case "IN_PROGRESS":
            inProgressCount++;
            break;
          case "PENDING":
            pendingCount++;
            break;
          default:
            break;
        }
      });

      // Update the state with the new counts
      setCompleted(completedCount);
      setInProgress(inProgressCount);
      setPending(pendingCount);
    }
  }, [tasks]);

  const data = {
    labels: ["Completed", "In Progress", "Pending"],
    datasets: [
      {
        data: [completed, inProgress, pending],
        backgroundColor: ["#118a7e", "#20c997", "#17a2b8"], // Colors adjusted to match the theme
        hoverBackgroundColor: ["#118a7e", "#20c997", "#17a2b8"], // Hover colors adjusted to match the theme
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: theme === "dark" ? "white" : "black", // Text color set to white
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}

export default DonutChart;
