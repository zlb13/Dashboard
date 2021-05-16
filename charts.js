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
    //var filteredSample = samplesList.filter(sample => sample)[0];
      //console.log(filteredSample);
      //var samples = data.samples;
      // Filter the data for the object with the desired sample number
      var filteredSample = samplesList.filter(sampleObj => sampleObj.id == sample);
      console.log(filteredSample);
      
    
    //  5. Create a variable that holds the first sample in the array.
    var results = filteredSample[0];
    //var samplesId = data.samples[0].id;
    console.log(results);
    
    
    
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    
    var otuIds = results.otu_ids;
      console.log(otuIds);
    
    
    var otuLabels = results.otu_labels;
      console.log(otuLabels);
    
    
    
    var sampleValues = results.sample_values;
      console.log(sampleValues);
      
    

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are
     var data = otuIds
     data.sort(function(a,b) { return (a.otuId - b.otuId); })
     data = data.slice(0, 10);
     data = data.reverse();
     console.log(data);
     //var topTen = console.log(otuIds.slice(0, 10));
    
    
    var yTicks = [ 'OTU 1167', 'OTU 2859', 'OTU 482', 'OTU 2264', 'OTU 41', 'OTU 1189', 'OTU 352', 'OTU 189', 'OTU 2318','OTU 1977'];
    
    

      
    
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



// 1. Create the trace for the bubble chart.
  var trace1 = {
    x: otuIds,
    y: sampleValues,
    text: otuLabels,
    mode: 'markers',
    marker: {
    color:['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
    opacity: [1, 0.8, 0.6, 0.4],
    size:[40, 60, 80, 100]
  }
}
  var bubbleData = [trace1];

// 2. Create the layout for the bubble chart.
  var bubbleLayout = {
    hovermode:'closest',
    title: 'Bacteria Cultures Per Sample',
    xaxis_title: 'OTU ID',
};

// 3. Use Plotly to plot the data with the layout.
Plotly.newPlot("bubble", bubbleData, bubbleLayout);

// 4. Create the trace for the gauge chart.
d3.json("samples.json").then((data) => {
var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
   
  var wfreq = parseFloat(result.wfreq);
  console.log(wfreq);
})

var trace2 = {
  value: 2,
  title: { text: "Scrubs per week"},
  type: "indicator",
  mode: "gauge+number",
  gauge: {
    axis: { range: [null, 10], color: "black"},
    steps: [
      { range: [0, 2], color: "red"},
      { range: [2, 4], color: "orange"},
      { range: [4, 6], color: "yellow"},
      { range: [6, 8], color: "lime"},
      { range: [8, 10], color: "green"}
    ],
  }
}
var gaugeData = [trace2];

// 5. Create the layout for the gauge chart.
var gaugeLayout = { width: 500, height: 400, margin: { t: 0, b: 0 }
 
};

// 6. Use Plotly to plot the gauge data and layout.
Plotly.newPlot('gauge', gaugeData, gaugeLayout);

});
}