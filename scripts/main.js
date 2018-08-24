var canvas = document.getElementById('diagram');
canvas.width = 500;
canvas.height = 500;
var ctx = canvas.getContext('2d');
var chart;

var canvas2 = document.getElementById('diagram2');
canvas2.width = 500;
canvas2.height = 500;
var ctx2 = canvas2.getContext('2d');
var chart2;

var gradelabels = ["PASS","1","2","3","4","5","FAIL"];

function postRequest(path,data){
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            if(path == 'getGradesByCourseId') {
                updateView(JSON.parse(xmlHttp.responseText));
            }
        }
    }
    xmlHttp.open("POST", "http://174.138.10.1:6009/"+path, true);
    xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlHttp.send(JSON.stringify(data));
}

function getGradesByCourseId(){
    postRequest("getGradesByCourseId",{"courseid":document.getElementById('courseidInput').value});
}

function updateView(data){
    if(data.length != 0){
        document.getElementById('alert').style.display = 'none';
        data.sort(function(a,b) {return (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0);} );
        document.getElementById('mainheader').innerHTML = data[0]['name'] + " " + data[0]['courseid'];
        document.getElementById('main').style.display = 'block';
        document.getElementById('diagram').style.display = 'block';
        document.getElementById('diagram2').style.display = 'block';
        // Main table
        // Head
        let mainhead = document.getElementById('mainhead');
        mainhead.innerHTML = "";
        let tr = document.createElement('tr');
        let index = 0;
        let labels = ["YEAR","PASS","1","2","3","4","5","FAIL"];
        for (let key in labels){
            let th = document.createElement('th');
            th.setAttribute('onclick','sortTable("dataset",'+index+')')
            index++;
            let keyval = document.createTextNode(labels[key]);
            th.appendChild(keyval);
            tr.appendChild(th);
        }
        mainhead.appendChild(tr);
        // Body
        let mainbody = document.getElementById('mainbody');
        mainbody.innerHTML = "";
        let keys = ["year","pass","one","two","three","four","five","fail"];
        let diagramlabels = [];
        let passdataset = [];
        let faildataset = [];
        let totaldataset = [];
        let gradedataset = [0,0,0,0,0,0,0];
        for (let i = 0; i < data.length; i++){
            let tr = document.createElement('tr');
            for (let key in keys){
                let td = document.createElement('td');
                let keyval;
                if(keys[key] == 'year') {
                    keyval = document.createTextNode((parseInt(data[i][keys[key]])-1).toString());
                }
                else{
                    keyval = document.createTextNode(data[i][keys[key]]);
                    }
                td.appendChild(keyval);
                tr.appendChild(td);
            }
            tr.setAttribute('onclick','clickedyclick(this)');
            mainbody.appendChild(tr);
            // year is minus one for better understanding
            diagramlabels.push(data[i]['year']-1);
            passdataset.push(data[i]['pass']+data[i]['one']+data[i]['two']+data[i]['three']+data[i]['four']+data[i]['five']);
            faildataset.push(data[i]['fail']);
            totaldataset.push(data[i]['pass']+data[i]['one']+data[i]['two']+data[i]['three']+data[i]['four']+data[i]['five']+data[i]['fail'])
            gradedataset[0] += data[i]['pass'];
            gradedataset[1] += data[i]['one'];
            gradedataset[2] += data[i]['two'];
            gradedataset[3] += data[i]['three'];
            gradedataset[4] += data[i]['four'];
            gradedataset[5] += data[i]['five'];
            gradedataset[6] += data[i]['fail'];
        }
        updateDiagram(diagramlabels,passdataset,faildataset,totaldataset,gradedataset);
        
        updateDiagram2("amount per grade",gradelabels,gradedataset);
    }
    else{
        document.getElementById('alert').innerHTML = "Not found with that one!";
        document.getElementById('alert').style.display = 'block';
        document.getElementById('main').style.display = 'none';
    }
}

function clickedyclick(ele){
    let gradedataset = [parseInt(ele.childNodes[1].innerHTML),parseInt(ele.childNodes[2].innerHTML),parseInt(ele.childNodes[3].innerHTML),parseInt(ele.childNodes[4].innerHTML),parseInt(ele.childNodes[5].innerHTML),parseInt(ele.childNodes[6].innerHTML),parseInt(ele.childNodes[7].innerHTML)]
    updateDiagram2("amount per grade for year "+ele.firstChild.innerHTML,gradelabels,gradedataset);
}

////////////////////////// Table sorting
function sortTable(table,n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById(table);
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.getElementsByTagName("TR");
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      let xinner = x.innerHTML.toLowerCase();
      let yinner = y.innerHTML.toLowerCase()
      // date check
      if(/\d{4}-\d{2}-\d{2}/.test(xinner) && /\d{4}-\d{2}-\d{2}/.test(yinner)){
          xinner = parseInt((new Date(xinner).getTime() / 1000).toFixed(0));
          yinner = parseInt((new Date(yinner).getTime() / 1000).toFixed(0));
      }
      // number check
      if(!isNaN(parseFloat(xinner))){
          if (dir == "asc") {
              if(parseFloat(xinner) > parseFloat(yinner)){
                  shouldSwitch = true;
                  break;
              }
          } else if (dir == "desc") {
              if(parseFloat(xinner) < parseFloat(yinner)){
                  shouldSwitch = true;
                  break;
              }
          }
      }
      // string
      else {
          if (dir == "asc") {
            if (xinner > yinner) {
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            if (xinner < yinner) {
              shouldSwitch = true;
              break;
            }
          }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function isItDate(date) {
    return!!(function(d){return(d!=='Invalid Date'&&!isNaN(d))})(new Date(date));
}

///// UPDATE DIAGRAM
function updateDiagram(labels,pass,fail,total,grades){
        if(chart != undefined) chart.destroy();
        chart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                                    lineTension: 0.2,
                                    fill: false,
                                    label: "Pass",
                                    backgroundColor: "#ff9933",
                                    borderColor: '#ff9933',
                                    data: pass,
                                    },
                                   {
                                    lineTension: 0.2,
                                    fill: false,
                                    label: "Fail",
                                    backgroundColor: "#000",
                                    borderColor: '#000',
                                    data: fail,
                                    },
                                  {
                                    lineTension: 0.2,
                                    fill: true,
                                    label: "Total",
                                    backgroundColor: "#6699ff",
                                    borderColor: '#0066ff',
                                    data: total,
                                    },
                                  ]
                    }
                });
}

function updateDiagram2(label,labels,grades){
    console.log(labels);
    console.log(grades);
    if(chart2 != undefined) chart2.destroy();
        chart2 = new Chart(ctx2, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                                    backgroundColor: "#ff9933",
                                    borderColor: '#ff9933',
                                    data: grades,
                                    label: label,
                                    }
                                  ]
                    }
                });
}

// D
Chart.pluginService.register({
  beforeDraw: function (chart) {
    if (chart.config.options.elements.center) {
      //Get ctx from string
      var ctx = chart.chart.ctx;

      //Get options from the center object in options
      var centerConfig = chart.config.options.elements.center;
      var fontStyle = centerConfig.fontStyle || 'Arial';
      var txt = centerConfig.text;
      var color = centerConfig.color || '#000';
      var sidePadding = centerConfig.sidePadding || 20;
      var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
      //Start with a base font of 30px
      ctx.font = "30px " + fontStyle;

      //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
      var stringWidth = ctx.measureText(txt).width;
      var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      var widthRatio = elementWidth / stringWidth;
      var newFontSize = Math.floor(30 * widthRatio);
      var elementHeight = (chart.innerRadius * 2);

      // Pick a new font size so it will not be larger than the height of label.
      var fontSizeToUse = Math.min(newFontSize, elementHeight);

      //Set font settings to draw it correctly.
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
      ctx.font = fontSizeToUse+"px " + fontStyle;
      ctx.fillStyle = color;

      //Draw text in center
      ctx.fillText(txt, centerX, centerY);
    }
  }
});