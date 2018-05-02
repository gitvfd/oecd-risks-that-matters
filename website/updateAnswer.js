function updateAnswer(){
	
  var buttonId=document.getElementById("toolbar").getElementsByClassName("active")[0].id;

	var updatedDots=dataTot.filter(function(d){return d.Question==buttonId && d.item==userResult[buttonId]  && d.ISO !="AVG";})

	updatedDots.forEach(function(d){
		countryISO.forEach(function(v){
			if(d.ISO==v.ISO3){
				d.lat=v.Latitude;
				d.lon=v.Longitude
			}
		})
	})
	svg.selectAll("circle")
              .data(updatedDots)
              .transition()
              .attr("delay", function(d,i){return 1000*i})
              .attr("duration", function(d,i){return 1000*(i+1)})
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
              
    //dots.exit().remove();
}