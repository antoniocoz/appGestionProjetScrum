  function diagramPert(nodeDataArray, linkDataArray) {
    var $ = go.GraphObject.make;  // for more concise visual tree definitions
    myDiagram =
      $(go.Diagram, "myDiagram",
        {
          initialAutoScale: go.Diagram.Uniform,
          initialContentAlignment: go.Spot.Center,
          layout: $(go.LayeredDigraphLayout)
        });
        
    myDiagram.nodeTemplate =
      $(go.Node, "Auto",
        $(go.Shape, "Circle",
          { fill: "white" },
          new go.Binding("stroke")),
        $(go.Panel, "Table",
          { padding: 0.5 },
          $(go.RowColumnDefinition, { column: 0, separatorStroke: "black" }),
          $(go.RowColumnDefinition, { column: 1, separatorStroke: "black" }),
          $(go.RowColumnDefinition, { row: 1, separatorStroke: "white", background: "white", coversSeparators: true }),
          $(go.RowColumnDefinition, { row: 2, separatorStroke: "black" }),
          $(go.TextBlock,
            new go.Binding("text", "text"),
            { row: 1, column: 0, columnSpan: 2, margin: 5,
              textAlign: "center", font: "bold 14px sans-serif" }),
          $(go.TextBlock,  
            new go.Binding("text", "earlyStart"),
            { row: 2, column: 0, margin: 5, textAlign: "center" }),
          $(go.TextBlock,
            new go.Binding("text", "lateFinish"),
            { row: 2, column: 1, margin: 5, textAlign: "center" })
        )
      );

    
    myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
  }