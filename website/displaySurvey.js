function displaySurvey(result){
  userResult=JSON.parse(result);
	var scaleFactor=4.5;

  if(width<600)//previously _0.5 on all scaleFactor
    scaleFactor=3.5;
  else if(width<700)
    scaleFactor=4.5;
  else if(width<800)
    scaleFactor=5;
  else if(width<900)
    scaleFactor=5.5;
  else if(width<1050)
    scaleFactor=6;
  else if(width<1250)
    scaleFactor=6.5;
  else
    scaleFactor=7;

	var translation=[];

  if(width<800)
    translation= [1.25*(width) / 2, 1.25*height/2]

  else if(width<900)
    translation= [1.25*(width) / 2, 1.25*height/2]

  else if(width<1000)
    translation= [1.25*(width) / 2, 1.25*height/2]
  else 
    translation= [1.1*(width) / 2, 1.25*height/2]

	projection = d3.geoEquirectangular()
  	            .scale(width/scaleFactor)
  	            .translate(translation)
  	        	.precision(.01);



  	var path = d3.geoPath()
                     .projection(projection);
	var world=svg.append("g")

    d3.json("data/world.json", function(error, worldData) {
                world.append("g")
                  .attr("id", "world")
                  .selectAll("path")
                    .data(worldData.features)
                  .enter().append("path")
                    .attr("class","world")
                    .attr("d", path);
    });

    displayAnswer();


    //Legend      
      var legendMargin = {left: 5, top: 10, right: 5, bottom: 10},
        legendWidth = 145,
        legendHeight = 270;

        var svgLegend =svg.append("g")
                .attr("width", (legendWidth + legendMargin.left + legendMargin.right))
                .attr("height", (legendHeight + legendMargin.top + legendMargin.bottom))
                .attr("class","showMap-chart");     

        var legendWrapper = svgLegend.append("g").attr("class", "legendWrapper")
                .attr("transform", "translate(" + legendMargin.left + "," + legendMargin.top +")");
        var bubbleSizeLegend = legendWrapper.append("g")
                .attr("transform", "translate(" + (legendWidth/2 - 30) + "," + 20 +")");

         //Draw the bubble size legend
        if (!mobileScreen) {
        bubbleLegend(bubbleSizeLegend, rScale, legendSizes = [minLeg,(minLeg+maxLeg)/2,maxLeg], legendName = "Legend");  
        }//if !mobileScreen
        else {
          d3.select("#legend").style("display","none");
        }

        //////////////////////////////////////////////////////
/////////////////// Bubble Legend ////////////////////
//////////////////////////////////////////////////////

        function bubbleLegend(wrapperVar, scale, sizes, titleName) {

          var legendSize1 = sizes[0],
            legendSize2 = sizes[1],
            legendSize3 = sizes[2],
            legendCenter = 10,
            legendBottom = height-50,
            legendLineLength = 25,
            textPadding = 5,
            numFormat = d3.format(",");
          
          wrapperVar.append("text")
            .attr("class","legendTitle")
            .attr("transform", "translate(" + legendCenter + "," + legendBottom + ")")
            .attr("x", 0 + "px")
            .attr("y", 0 + "px")
            .attr("dy", "1em")
            .text(titleName);
            
          wrapperVar.append("circle")
                .attr('r', 0.5*scale(legendSize1))
                .attr('class',"legendCircle")
                .attr('cx', legendCenter)
                .attr('cy', (legendBottom-0.5*scale(legendSize1)));
            wrapperVar.append("circle")
                .attr('r', 0.5*scale(legendSize2))
                .attr('class',"legendCircle")
                .attr('cx', legendCenter)
                .attr('cy', (legendBottom-0.5*scale(legendSize2)));
            wrapperVar.append("circle")
                .attr('r', 0.5*scale(legendSize3))
                .attr('class',"legendCircle")
                .attr('cx', legendCenter)
                .attr('cy', (legendBottom-0.5*scale(legendSize3)));
            
          wrapperVar.append("line")
                .attr('class',"legendLine")
                .attr('x1', legendCenter)
                .attr('y1', (legendBottom-1*scale(legendSize1)))
            .attr('x2', (legendCenter + legendLineLength))
                .attr('y2', (legendBottom-1*scale(legendSize1))); 
          wrapperVar.append("line")
                .attr('class',"legendLine")
                .attr('x1', legendCenter)
                .attr('y1', (legendBottom-1*scale(legendSize2)))
            .attr('x2', (legendCenter + legendLineLength))
                .attr('y2', (legendBottom-1*scale(legendSize2)));
          wrapperVar.append("line")
                .attr('class',"legendLine")
                .attr('x1', legendCenter)
                .attr('y1', (legendBottom-1*scale(legendSize3)))
            .attr('x2', (legendCenter + legendLineLength))
                .attr('y2', (legendBottom-1*scale(legendSize3)));
            
          wrapperVar.append("text")
                .attr('class',"legendText")
                .attr('x', (legendCenter + legendLineLength + textPadding))
                .attr('y', (legendBottom-1*scale(legendSize1)))
            .attr('dy', '0.25em')
            .text( numFormat(Math.round(legendSize1)) + " %");
          wrapperVar.append("text")
                .attr('class',"legendText")
                .attr('x', (legendCenter + legendLineLength + textPadding))
                .attr('y', (legendBottom-1*scale(legendSize2)))
            .attr('dy', '0.25em')
            .text( numFormat(Math.round(legendSize2)) + " %");
          wrapperVar.append("text")
                .attr('class',"legendText")
                .attr('x', (legendCenter + legendLineLength + textPadding))
                .attr('y', (legendBottom-1*scale(legendSize3)))
            .attr('dy', '0.25em')
            .text( numFormat(Math.round(legendSize3)) + " %");
            
        }//bubbleLegend

};