import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';

const BandGraph = ({ isDataUploaded }) => {
    const svgRef = useRef();
    const [data, setData] = useState(null);
    const employeeData = useSelector((state) => state.selectedData);
    
    console.log("redux", employeeData);

    const graphbox = {
        borderRadius:'10px',
        height:'330px',
        padding:"1rem",
        boxShadow:"1px 5px 5px  "
    }

    const fetchBand = () => {
        try {
            if (!employeeData) return;

            const bandCounts = employeeData.reduce((counts, employee) => {
                const band = employee.Band;
                counts[band] = (counts[band] || 0) + 1;
                return counts;
            }, {});

            const formattedData = Object.entries(bandCounts).map(([band, count]) => ({ band, count }));
            setData(formattedData);
        } catch (error) {
            console.error("Error fetching band data:", error);
        }
    };

    useEffect(() => {
        fetchBand();
    }, [isDataUploaded, employeeData]);

    useEffect(() => {
        if (!data) return;
        d3.select(svgRef.current).selectAll("*").remove();

        // Define dimensions and margins
        const margin = { top: 10, right: 30, bottom: 50, left: 24 };
        const width = 300 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        // Sort data alphabetically by band name
        const sortedData = data.slice().sort((a, b) => a.band.localeCompare(b.band));

        // Create scales
        const x = d3.scaleLinear()
            .domain([0, d3.max(sortedData, d => d.count)])
            .nice()
            .range([0, width]);

        const y = d3.scaleBand()
            .domain(sortedData.map(d => d.band))
            .range([0, height])
            .padding(0.9); // Increase padding for larger gap between bars

        // Create SVG element
        const svg = d3.select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Create bars
        svg.selectAll('.bar')
            .data(sortedData)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', 0)
            .attr('y', d => y(d.band))
            .attr('width', d => x(d.count))
            .attr('height', y.bandwidth())
            .attr('fill', '#0A6E7C')
            .attr('stroke', 'white') // Add white border to each bar
            .attr('stroke-width', 0.1); // Thinner bar lines

        // Add count labels
        svg.selectAll('.label')
            .data(sortedData)
            .enter().append('text')
            .attr('class', 'label')
            .attr('x', d => x(d.count) + 5)
            .attr('y', d => y(d.band) + y.bandwidth() / 2)
            .text(d => d.count)
            .attr('fill', 'black'); // Set count labels to black

        // Add y-axis band names
        svg.append('g')
            .attr('class', 'y-axis')
            .call(d3.axisLeft(y).tickSizeOuter(0)) // Tick size outer to remove end ticks
            .selectAll('text')
            .attr('fill', 'black'); // Set y-axis label color to black

    }, [data, isDataUploaded]);

    return (
       <div style={graphbox}>
        <h1 style={{fontSize:"1rem",textAlign:"center",fontWeight:"bold",color:"#0A6E7C"}}>Band Graph</h1>
         <svg ref={svgRef}></svg>
       </div>
    );
};

export default BandGraph;
