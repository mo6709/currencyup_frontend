import React from 'react';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from 'victory';

const RateGraph = ({ rateData }) => {
    return (
        <VictoryChart
         height={50}   
	     theme={VictoryTheme.material}>
		    <VictoryAxis 
		     crossAxis 
		     invertAxis={true} 
		     orientation="bottom"
	         tickFormat={[]}/>

		    <VictoryAxis 
		     dependentAxis 
		     crossAxis 
		     invertAxis={true}
		     orientation="bottom" 
	         tickFormat={[]}/>

		    <VictoryLine 
	         style={{
		       data: { stroke: "#c43a31" },
		       parent: { border: "1px solid #ccc"},
		     }}
	         data={rateData}/>
	  </VictoryChart>
    )
}

export default RateGraph;