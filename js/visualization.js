// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
((() => {

  d3.csv("data/Federal_Expenditures_Dataset.csv", (expData) => {
    d3.csv("data/Historical_Events.csv", (eventData) => {
      d3.csv("data/Historical_Political_Power.csv", (polPowData) => {
        // All data is loaded, work in here

        const dispatchString = "selectionUpdated";

        let tmDepExp = d3.treemap()


      });
    });
  });

})());