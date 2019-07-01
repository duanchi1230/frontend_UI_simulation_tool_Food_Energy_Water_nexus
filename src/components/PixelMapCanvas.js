import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import * as d3 from 'd3';
import calPixelMatrix from './calPixelMatrix'

export default class PixelMapCanvas extends Component {

    constructor(props) {
        super(props);

        this.state = {
            scenario: ""
        };
    }


    componentDidMount() {
        fetch("/proj/1/weap/scenario/0").then(r=>r.json()).then(data=>this.initCanvas(data))
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.updateCanvas();
        fetch("/proj/1/weap/scenario/1").then(r=>r.json()).then(data=>console.log(data))
    }

    initCanvas(data){
        var width = 1000
        var height = 1000

        d3.select("#PixelMap")
            .append("div")
            .attr()

        this.setState(()=>{
            return {scenario:data["name"]}
        })

        const svg = d3.select("#PixelMap")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

        var origin = {"x":150, "y":100}
        var flow = data["var"]["output"]
        var start_year = 1986
        var end_year = 2008

        var d = calPixelMatrix(flow, origin, start_year,end_year)

        svg.append("g")
        .attr("id", "map")
        .selectAll("rect")
        .data(d)
        .join("rect")
        .attr("x", d=>d["x"])
        .attr("y", d=>d["y"])
        .attr("height", d=>d["dy"])
        .attr("width", d=>d["dx"])
        .attr("rx", 0)
        .attr("ry", 0)
        .attr("fill", d=> "rgb(" + d["color"] +")")
        .attr("stroke", "rgb(50 50 50)")

           
        var x_text = origin["x"]-10
        var row = d.filter(value=> value["year"]==start_year)
        console.log(row)
        svg.append("g")
        .attr("id", "text-row")
        .selectAll("text")
        .data(row)
        .join("text")
        .attr("x", x_text)
        .attr("y", v=>v["y"]+15)
        .text(v=> v["rowName"])
        .attr("text-anchor","end")
        .attr("alignment-baseline", "central")
        .attr("transform", function (row) {
        var xRot = d3.select(this).attr("x");
        var yRot = d3.select(this).attr("y");
                return `rotate(0, ${xRot},  ${yRot} )`})


        var y_lable =[]
        var dx=30
        var x = origin["x"]+10
        for (var year=start_year; year<=end_year; year++){
            y_lable.push({"year": year, "x": x, "y": origin["y"]-10})
            x = x+dx
        }
           
        svg.append("g")
        .selectAll("text")
        .data(y_lable)
        .join("text")
        .attr("x", y=>y["x"])
        .attr("y", y=>y["y"])
        .text(y=> y["year"])
        .attr("text-anchor","start")
        .attr("alignment-baseline", "middle")
        .attr("transform", function (row) {
            var xRot = d3.select(this).attr("x");
            var yRot = d3.select(this).attr("y");       
            return `rotate(-45, ${xRot},  ${yRot} )`})
    }

    updateCanvas(data){
        // var flow= []
        // var origin = {"x":370, "y":50}

        // var start_year = 1986
        // var end_year = 2008
        // var d = calPixelMatrix(raw_flow, origin, start_year,end_year, sort)
        
        // // Object.values(d).forEach(v=>console.log(v))
        // console.log(d)
        // const rect = d3.select("#map")
        //                 .selectAll("rect")
        //                 .remove()
        //                 .select("#map")
        //                 .data(d)
        //                 .enter()
        //                 .append("rect")
        //                 .attr("x", d=>d["x"])
        //                 .attr("y", d=>d["y"])
        //                 .attr("height", d=>d["dy"])
        //                 .attr("width", d=>d["dx"])
        //                 .attr("fill", "255 255 255")
        //                 .transition()
        //                 .duration(700)
        //                 .attr("rx", 0)
        //                 .attr("ry", 0)
        //                 .attr("fill", d=> "rgb(" + d["color"] +")")
        //                 .attr("stroke", "rgb(50 50 50)")

        // var x_text = origin["x"]-10
        // var row = d.slice(0, 30*3)  
        
        // d3.select("#text")
        //     .selectAll("text")
        //     .remove()
        //     .select("#text")
        //     .data(row)
        //     .enter()
        //     .append("text")
        //     .attr("x", x_text)
        //     .attr("y", row=>row["y"]+15)
        //     .text(row=> row["source"])
        //     .transition()
        //     .duration(700)
        //     .text(row=> row["source"]+" " +row["siteName"] + "-(" + row["scenario"] +")")
        //     .attr("text-anchor","end")
        //     .attr("alignment-baseline", "central")
        //     .attr("transform", function (row) {
        //     var xRot = d3.select(this).attr("x");
        //     var yRot = d3.select(this).attr("y");
        //             return `rotate(0, ${xRot},  ${yRot} )`})       
                    

    }

    render() {
        const {width, height} = this.props;
        return (
            <div id="PixelMap">
                <h1>
                    {this.state.scenario}
                </h1>
                
            </div>
            // <svg id="PixelCanvas"
            //     width={width}
            //     height={height}
            // >
            //     <g id="base-group" />
            // </svg>
        );
    }
}