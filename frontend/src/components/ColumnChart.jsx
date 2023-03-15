import * as React from 'react';
import { Chart } from "react-google-charts";

function ColumnChart(props) {

  // Initially set all chart columns to 0%
  const [chartData, setChartData] = React.useState([
    ["Stat", "Percentage", {role: "style"}],
    ["acousticness", 0, "#1db954"],
    ["danceability", 0, "#1db954"],
    ["energy", 0, "#1db954"],
    ["instrumentalness", 0, "#1db954"],
    ["liveness", 0, "#1db954"],
    ["speechiness", 0, "#1db954"],
    ["valence", 0, "#1db954"],
  ]);

  React.useEffect(() => {
    if (props.stats) {
      const data = [
        ["Stat", "Percentage", {role: "style"}],
        ["Acousticness", props.stats.acousticness, "#1db954"],
        ["Danceability", props.stats.danceability, "#1db954"],
        ["Energy", props.stats.energy, "#1db954"],
        ["Instrumentalness", props.stats.instrumentalness, "#1db954"],
        ["Liveness", props.stats.liveness, "#1db954"],
        ["Speechiness", props.stats.speechiness, "#1db954"],
        ["Valence", props.stats.valence, "#1db954"],
      ];
      setChartData(data);
    }
  }, [props.stats]);

  const options = {
    colors: ["#1db954"], // legend color
    animation: {
      startUp: true,
      duration: 1000,
      easing: "out"
    },
    backgroundColor: {
      fill: 'transparent',
    },
    chartArea: {
      backgroundColor: {
        fill: 'transparent',
      },
      height: "82%",
      width: "75%",
      left: "19%",
      top: "2%"
    },
    hAxis: {
      gridlines: {
        color: "white"
      },
      textStyle: {
        color: "white"
      },
      slantedText: true,
      slantedTextAngle: 35
    },
    vAxis: {
      minValue: 0, 
      maxValue: 1,
      textStyle: {
        color: "white"
      },
      format: "percent"
    },
    legend: {
      position: "none",
      textStyle: {
        color: "white"
      },
      alignment: "end"
    },
    title: "",
    titleTextStyle: {
      color: "white"
    },
    height: "400px",
    width: "100%"
  }

  return (
    <Chart 
      chartType="ColumnChart" 
      data={chartData} 
      options={options}
    />
  );
};

export default ColumnChart;





