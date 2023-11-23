// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
((() => {
  d3.csv("data/Federal_Expenditures_Dataset.csv", (fedExpData) => {
    d3.csv("data/Historical_Events.csv", (eventData) => {
      d3.csv("data/Historical_Political_Power.csv", (polPowData) => {

        const dispatchString = "selectionUpdated";

        let selectedYear = "2021"  // Initial year to display
        let tmDepExp = treemap()
          .value(d => +d["Gross Cost (in Billions)"])
          .label(d => d["Agency Name"])
          .colorScale(d3.scaleOrdinal(d3.schemeCategory10))
          .selectedYear(selectedYear)
          .selectionDispatcher(d3.dispatch(dispatchString))
          ("#treemap", fedExpData, selectedYear)
        
        
        function createLineGraph(data) {
          let lgDepExp = linegraph()
          ('#linegraph', data);
        }
        let bar = barchart()("#barchart", fedExpData);
        createLineGraph(fedExpData); // Call the function to create the line graph with fedExpData

      });
    });
  });

})());