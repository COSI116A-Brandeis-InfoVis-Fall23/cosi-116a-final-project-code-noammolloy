// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
((() => {
  d3.csv("data/Federal_Expenditures_Dataset.csv", (fedExpData) => {
    d3.csv("data/Historical_Events.csv", (eventData) => {
      d3.csv("data/Historical_Political_Power.csv", (polPowData) => {
        // All data is loaded, work in here

        const dispatchString = "selectionUpdated";

        let selectedYear = "2021"  // Initial year to display

         function createLineGraph(data) {
          let lgDepExp = linegraph()
            ('#linegraph', data);
        }
        createLineGraph(fedExpData); // Call the function to create the line graph with fedExpData
        let tmDepExp = treemap()
        .value(d => +d["Gross Cost (in Billions)"])
        .label(d => d["Agency Name"])
        .colorScale(d3.scaleOrdinal(d3.schemeCategory10))
        .selectedYear(selectedYear)
        .selectionDispatcher(d3.dispatch(dispatchString))
        ("#treemap", fedExpData, selectedYear)

        let bar = barchart()("#barchart", fedExpData);

      });
    });
  });

})());