import "./coursePieChart.scss";
import { Pie } from "react-chartjs-2";
import ChartDataLabels, { Context } from "chartjs-plugin-datalabels";
import {
  ICourseByCategory,
  CourseCategory,
  CourseCategoryColorMap,
} from "../../../actions/types";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React from "react";
ChartJS.register(ArcElement, Tooltip, Legend);

interface IPieChartStaticProps {
  courseByCategory: ICourseByCategory;
  isInstructor: boolean;
}

function CoursePieChart({
  courseByCategory,
  isInstructor,
}: IPieChartStaticProps) {
  const labels: string[] = [];
  const backgroundColor: string[] = [];
  const borderColor: string[] = [];
  const sumArr: number[] = [];
  for (const category in CourseCategory) {
    labels.push(category);
    backgroundColor.push(
      `${CourseCategoryColorMap[category as keyof typeof CourseCategory]}`
    );
    borderColor.push(
      // lighter then background color
      `${CourseCategoryColorMap[category as keyof typeof CourseCategory]}33`
    );
    sumArr.push(
      courseByCategory[category as keyof typeof CourseCategory].categoryIncome
    );
  }
  const data = {
    labels,
    datasets: [
      {
        data: sumArr,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };
  /*
  add title, label inside the pie
  */

  const pieOptions = {
    // responsive: false,

    plugins: {
      legend: {
        position: "bottom" as "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },

      // not showing
      datalabels: {
        color: "#ffffffff",
        anchor: "center" as "center",
        offset: 30,
        formatter: (value: number, ctx: Context) => {
          if (value > 0) return labels[ctx.dataIndex];
          return "";
        },
      },
    },
  };

  return (
    <div className="course-pie-chart-container mt-5">
      <h2 className="mb-3">
        {isInstructor ? "Income " : "Expense "} ratio by course category
      </h2>
      <Pie
        data={data}
        options={pieOptions}
        plugins={[ChartDataLabels as any]}
      />
    </div>
  );
}

export default React.memo(CoursePieChart, (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.courseByCategory) ===
      JSON.stringify(nextProps.courseByCategory) &&
    prevProps.isInstructor === nextProps.isInstructor
  );
});
