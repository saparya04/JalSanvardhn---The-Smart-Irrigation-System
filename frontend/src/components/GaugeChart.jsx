
// import { useEffect, useRef } from "react";
// import * as d3 from "d3";

// const GaugeChart = ({ value }) => {
//   const ref = useRef();

//   useEffect(() => {
//     const width = 300, height = 200;
//     const radius = Math.min(width, height)/2;
//     const pointerLength = radius * 0.8;

//     const svg = d3.select(ref.current)
//       .html("")
//       .attr("width", width)
//       .attr("height", height+50);

//     const arc = d3.arc()
//       .innerRadius(radius * 0.7)
//       .outerRadius(radius * 0.9)
//       .startAngle((d) => d.startAngle)
//       .endAngle((d) => d.endAngle);

//     const scale = d3.scaleLinear()
//       .domain([0, 10])
//       .range([-Math.PI / 1.5, Math.PI / 1.5]);

//     const zones = [
//       { start: 0, end: 2, color: "red" },
//       { start: 2, end: 4, color: "yellow" },
//       { start: 4, end: 6, color: "green" },
//       { start: 6, end: 8, color: "yellow" },
//       { start: 8, end: 10, color: "red" }
//     ];

//     const g = svg.append("g").attr("transform", `translate(${width / 2}, ${height})`);

  
//     g.selectAll("path")
//       .data(zones)
//       .enter()
//       .append("path")
//       .attr("d", d => arc({
//         startAngle: scale(d.start),
//         endAngle: scale(d.end)
//       }))
//       .attr("fill", d => d.color);

   
//     const angle = scale(value);
//     const x = pointerLength * Math.sin(angle);
//     const y = -pointerLength * Math.cos(angle);

//     g.append("line")
//       .attr("x1", 0)
//       .attr("y1", 0)
//       .attr("x2", x)
//       .attr("y2", y)
//       .attr("stroke", "black")
//       .attr("stroke-width", 3);

//     svg.append("text")
//       .attr("x", width / 2)
//       .attr("y", height - radius-5)
//       .attr("text-anchor", "middle")
//       .text(`${value.toFixed(2)} L/h`)
//       .style("font-size", "18px")
//       .style("font-weight", "bold");

//   }, [value]);

//   return <svg ref={ref}></svg>;
// };

// export default GaugeChart;



import { useEffect, useRef } from "react";
import * as d3 from "d3";

const GaugeChart = ({ value }) => {
  const ref = useRef();

  useEffect(() => {
    const width = 300, height = 200;
    const radius = Math.min(width, height)/2;
    const pointerLength = radius * 0.8;

    const svg = d3.select(ref.current)
      .html("")
      .attr("width", width)
      .attr("height", height+50);

    const arc = d3.arc()
      .innerRadius(radius * 0.7)
      .outerRadius(radius * 0.9)
      .startAngle((d) => d.startAngle)
      .endAngle((d) => d.endAngle);

    const scale = d3.scaleLinear()
      .domain([0, 10])
      .range([-Math.PI / 1.5, Math.PI / 1.5]);

    const zones = [
      { start: 0, end: 2, color: "red" },
      { start: 2, end: 4, color: "yellow" },
      { start: 4, end: 6, color: "green" },
      { start: 6, end: 8, color: "yellow" },
      { start: 8, end: 10, color: "red" }
    ];

    const g = svg.append("g").attr("transform", `translate(${width / 2}, ${height})`);

  
    g.selectAll("path")
      .data(zones)
      .enter()
      .append("path")
      .attr("d", d => arc({
        startAngle: scale(d.start),
        endAngle: scale(d.end)
      }))
      .attr("fill", d => d.color);

   
    const angle = scale(value);
    const x = pointerLength * Math.sin(angle);
    const y = -pointerLength * Math.cos(angle);

    g.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", x)
      .attr("y2", y)
      .attr("stroke", "black")
      .attr("stroke-width", 3);

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - radius-5)
      .attr("text-anchor", "middle")
      .text(`${value.toFixed(2)} L/h`)
      .style("font-size", "18px")
      .style("font-weight", "bold");

  }, [value]);

  return <svg ref={ref}></svg>;
};

export default GaugeChart;
