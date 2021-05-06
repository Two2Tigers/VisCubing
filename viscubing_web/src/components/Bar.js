import './Bar.css';
import * as d3 from "d3";

// function BarChart(props) {
//   const height = 600;
//   const width = 600;
//   const { data } = props;
//   const array = data.map(d => d.time);

//   let num_bin = 2 * d3.thresholdSturges(array);
//   const bins = d3.bin().thresholds(num_bin)(array);

//   const x = d3.scaleLinear()
//       .domain([bins[0].x0, bins[bins.length - 1].x1])
//       .range([0, width]);
//   const y = d3.scaleLinear()
//       .domain([0, d3.max(bins, d => d.length)]).nice()
//       .range([height, 0]);

//   const xTicks = x.ticks(num_bin).map(
//       value => (
//           <g className='tick' key={value} transform={`translate(${x(value)}, ${height + 10})`}>
//               <line y1={0} y2={-10} stroke='black' />
//               <text alignmentBaseline="hanging" textAnchor='middle' fontSize='10px'>
//                   {value}
//               </text>
//           </g>
//       )
//   );

//   const yTicks = y.ticks(height / 40).map(
//       value => (
//           <g className='tick' key={value} transform={`translate(${-10}, ${y(value)})`}>
//               <line x1={0} x2={10} stroke='black' />
//               <text textAnchor='end' fontSize='10px'>
//                   {value}
//               </text>
//           </g>
//       )
//   );

//   return (
//       <g transform={`translate(${x}, ${y})`} >
//           <g>
//               <line key={'xaxis'} x1={0} y1={height} x2={width} y2={height} stroke={'black'} />
//               <line key={'yaxis'} x1={0} x2={0} y1={height} y2={0} stroke={'black'} />
//               {bins.map(d => {
//                   return (
//                       <g>
//                           <rect key={d.x0} x={x(d.x0)} y={y(d.length)} width={Math.max(0, x(d.x1) - x(d.x0))} height={y(0) - y(d.length)} fill={'steelblue'} stroke={'black'} />
//                       </g>
//                   );
//               })}

//               {xTicks}
//               {yTicks}
//           </g>
//       </g>
//   );
// }

function Bar() {
  return (
    <div className="bar">
      <p>Bar Chart Here</p>
    </div>
  );
}
  
export default Bar;
