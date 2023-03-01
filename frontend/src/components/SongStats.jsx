import * as React from 'react';
import { Chart } from "react-google-charts";



function SongStats(props) {
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
    
      const data = [
        ["Stat", "Percentage", {role: "style"}],
        ["acousticness", 0, "#1db954"],
        ["danceability", 0, "#1db954"],
        ["energy", 0, "#1db954"],
        ["instrumentalness", 0, "#1db954"],
        ["liveness", 0, "#1db954"],
        ["speechiness", 0, "#1db954"],
        ["valence", 0, "#1db954"],
      ];
      setChartData(data);
    
  }, []);
  
  React.useEffect(() => {
    if (props.stats) {
      const data = [
        ["Stat", "Percentage", {role: "style"}],
        ["acousticness", props.stats.acousticness, "#1db954"],
        ["danceability", props.stats.danceability, "#1db954"],
        ["energy", props.stats.energy, "#1db954"],
        ["instrumentalness", props.stats.instrumentalness, "#1db954"],
        ["liveness", props.stats.liveness, "#1db954"],
        ["speechiness", props.stats.speechiness, "#1db954"],
        ["valence", props.stats.valence, "#1db954"],
      ];
      setChartData(data);
    }
  }, [props.stats]);


  
 
  const options = {
    vAxis: {minValue: 0, maxValue: 100},
    animation: {
      startUp: true,
      duration: 1000,
      easing: "out"
    },
    backgroundColor: {
      fill: '#white',
    },
    chartArea: {
      backgroundColor: {
        fill: '#535353',
      }
    }
  }

  return (
    <Chart 
      chartType="ColumnChart" 
      width="80%" 
      height="400px" 
      data={chartData} 
      options={options}

    />
  );
};
export default SongStats;





