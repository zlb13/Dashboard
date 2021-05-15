function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samplesList = data.samples;
    console.log(samplesList);
  
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var filteredSample = samplesList.filter(sample => sample)[0];
      console.log(filteredSample);
    
    
    //  5. Create a variable that holds the first sample in the array.
    
    var samplesId = data.samples[0].id;
    console.log(samplesId);
    
    
    
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    
    var otuIds = filteredSample.otu_ids;
      console.log(otuIds);
    
    
    var otuLabels = filteredSample.otu_labels;
      console.log(otuLabels);
    
    
    
    var sampleValues = filteredSample.sample_values;
      console.log(sampleValues);
      
    

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    //var topTen = data.samples.map(object => object.otu_ids).sort((a, b) => b - a);
    var topTen = console.log(otuIds.slice(0, 10));
    var yTicks = topTen
    console.log(topTen);
    //var yTicks = topTen.map((a,b) => b.otuId - a.otuId);
    //console.log(yTicks);
     //var yTicks = console.log(topTen);
    //var yTicks = topTen.map(otuId => otuID); {
     //console.log(topten);
    
    //otuIds = d3.json("samples.json").then((data) => {
    //otuIds = otuIds.map(object => 
    //object.otu_ids).sort((a,b) => b - a);
      //console.log(otuIds.slice(0, 10));
    

      
    
    // 8. Create the trace for the bar chart. 
    var trace = {
      x: sampleValues,
      y: yTicks,
      text: otuLabels,
      type: "bar",
      orientation: "h"
    };
    var barData = [trace];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Culture Found",
     
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
  })
}


