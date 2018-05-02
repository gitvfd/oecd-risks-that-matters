function displayAnswer(){



	var divMap = d3.select("body").append("div") 
	    .attr("class", "tooltip")       
	    .style("opacity", 0);

	var buttonId=document.getElementById("toolbar").getElementsByClassName("active")[0].id;
	
	
  var dataDots=dataTot.filter(function(d){return d.Question==buttonId && d.item==userResult[buttonId] && d.ISO !="AVG";})


	dataDots.forEach(function(d){
		countryISO.forEach(function(v){
			if(d.ISO==v.ISO3){
				d.lat=v.Latitude;
				d.lon=v.Longitude
			}
		})
	})
	var dots=svg.selectAll("dot")
                    .data(dataDots);

    var circle=dots.enter().append("a")
              .attr("class","dots")
              .append("circle") 
              .attr("cx", function(d) {
                return projection([d.lon,d.lat])[0];
              })
              .attr("cy", function(d) {
                return projection([d.lon,d.lat])[1];
              })
              .attr("r",function(d){
              	return 0.5*rScale(parseFloat(d.value))
              })
              .attr("fill", function(d){
              	if(d.Question =="Question4"){
              		return colorScale4(d.item);	
              	}
              	else if(d.Question =="Question5"){
              		return colorScale5(d.item);
              	}else if(d.Question =="Question6"){
              		return colorScale6(d.item);
              	} else
              		return "white";
              })
              .attr('stroke',function(d){
              	if(userResult[buttonId]==d.item)
              		return "#0B1E2D";

              })
              .attr('stroke-width',function(d){

                if(d.Question =="Question4"){                  
                  if(d.rank==1)
                    return "5px";
                  else
                    return "0px";
                }
                else if(d.Question =="Question5"){      
                  if(d.rank==9)
                    return "5px";
                  else
                    return "0px";
                }else if(d.Question =="Question6"){                 
                  if(d.rank==15)
                    return "5px";
                  else
                    return "0px";
                	}
              })
              .style("opacity", 0.7)
              .on("mouseover", function(d) {
	              	d3.select(this).style("opacity",0.5);
	                divMap.transition()    
	                    .duration(200)    
	                    .style("opacity", .9);    
	                var selCou;
	                countryISO.forEach(function(v){
	                	if(d.ISO==v.ISO3)
	                		selCou=v.Country;
	                })
	                  
	                 
	                  
	                  divMap.html(selCou +"<Br/><b>" + d.value +"%</b> of people answered:"+ "<Br/><b>" + d.answer+"</b>")  
	                      .style("left", (d3.event.pageX) +28 + "px")   
	                      .style("top", (d3.event.pageY - 28) + "px");  

              })

  			  .on("mouseout", function(d) {

                    d3.select(this).style("opacity",0.7);
                    
                  divMap.transition()    
                      .duration(500)    
                      .style("opacity", 0); 
               })
              
}