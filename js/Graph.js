(function($) {
  Drupal.behaviors.myBehavior = {
    attach: function (context, settings) {
      Graph = document.getElementById('graph');
      $('[name="username"]').on('change', function() {
        var content_id = $('[name="content_id"]').val().trim();
        var username = $('[name="username"]').val().trim();
        if(content_id != '' && username != ''){
        var obj = {};
        obj['content_id'] = content_id;
        obj['username'] = username;
        obj = JSON.stringify(obj);
        $.ajax({
          type: "POST",
          url: "getjson" ,
          data: obj,
          contentType: "application/json",
          success: function(data){  
            TESTER = document.getElementById('graph');
                var attempted = new Array();
                var interacted = new Array();
                var answered = new Array();
                var ans = new Array();
                var ansy = new Array();
                for(var i=0;i<data.length;i++)
                    {
                        ans.push(new Date(data[i].time).getTime() / 1000);
                        ansy.push(i+1);
                        if(data[i].verb == "attempted")
                        {attempted.push(new Date(data[i].time).getTime() / 1000);}
                        else if(data[i].verb == "interacted")
                        {interacted.push(new Date(data[i].time).getTime() / 1000);}
                        else if(data[i].verb == "answered")
                        {answered.push(new Date(data[i].time).getTime() / 1000);}
                    }
                //console.log(m);
                var xAxis1 = new Array();
                var xAxis2 = new Array();
                var xAxis3 = new Array();
                var yAxis1 = new Array();
                var yAxis2 = new Array();
                var yAxis3 = new Array();
                
               for(var i=0;i<attempted.length-1;i++)
                   {
                       xAxis1.push(attempted[i+1]-attempted[i]);
                       yAxis1.push(i+1);
                   }
            for(var i=0;i<interacted.length-1;i++)
                   {
                       xAxis2.push(interacted[i+1]-interacted[i]);
                       yAxis2.push(i+1);
                   }
            for(var i=0;i<answered.length-1;i++)
                   {
                       xAxis3.push(answered[i+1]-answered[i]);
                       yAxis3.push(i+1);
                   }
            //console.log(attempted);
            //console.log(interacted)
            //console.log(answered);
            //console.log(xAxis1);
            //console.log(xAxis2);
            //console.log(xAxis3);
            //console.log(yAxis1);
            //console.log(yAxis2);
            //console.log(yAxis3);
            trace = {
                  x: ansy,
                  y: ans, 
                  line: {
                    color: 'rgba(214,39,40,1)', 
                    shape: 'hv'
                  }, 
                  mode: 'lines', 
                  name: 'attempted', 
                  type: 'scatter', 
                  xaxis: 'x', 
                  yaxis: 'y'
                };
            /*trace4 = {
                  x: yAxis1,
                  y: xAxis1, 
                  line: {
                    color: 'rgba(214,39,40,1)', 
                    shape: 'hv'
                  }, 
                  mode: 'lines', 
                  name: 'attempted', 
                  type: 'scatter', 
                  xaxis: 'x', 
                  yaxis: 'y'
                };
                trace5 = {
                  x: yAxis2,
                  y: xAxis2,
                  line: {
                    color: 'rgba(148,103,189,1)', 
                    shape: 'hv'
                  }, 
                  mode: 'lines', 
                  name: 'interacted', 
                  type: 'scatter', 
                  xaxis: 'x', 
                  yaxis: 'y'
                };
                trace6 = {
                  x: yAxis3,
                  y: xAxis3, 
                  line: {
                    color: 'rgba(140,86,75,1)', 
                    shape: 'hv'
                  }, 
                  mode: 'lines', 
                  name: 'answered', 
                  type: 'scatter', 
                  xaxis: 'x', 
                  yaxis: 'y'
                };*/
                data = [trace];
                layout = {
                  dragmode: 'zoom', 
                  margin: {
                    r: 10, 
                    t: 25, 
                    b: 40, 
                    l: 60
                  }, 
                  showlegend: true, 
                  xaxis: {
                    domain: [0, 1], 
                    title: 'x'
                  }, 
                  yaxis: {
                    domain: [0, 1], 
                    title: 'y'
                  }
                };
                Plotly.newPlot(TESTER, {
                  data: data,
                  layout: layout
                });
            }
        });
  }
});
}
}})(jQuery);