var startTime;
var currentRow;
var nextRow;

document.addEventListener("DOMContentLoaded" , function(){
    showData();
});

function showData(){
    let item = "";
    let table = document.getElementById("schedule").getElementsByTagName("tbody")[0];
    fetch ("js/u316.json").then(
        result => {
            result.json().then(
                data => {
                    data.RECORDS.forEach( (element , i) => {
                        if (element.schedule != "")
                            item += `<tr><td>${element.code}</td><td>${element.title}</td><td>${element.professor}</td><td>${element.schedule}</td><td>${element.students}</td></tr>`;
                    });
                    table.innerHTML = item; 
                    sortTable(3);
                }
            )
        }
    );
}

function sortTable(columnNumber) {
    let table, rows, switching, i, x, y, shouldSwitch , column;
    column = columnNumber;
    table = document.getElementById("schedule").getElementsByTagName("tbody")[0];
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 0; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[column].textContent;
            y = rows[i + 1].getElementsByTagName("TD")[column].textContent;
            if (column == 3){
                setPriority(x,y);
                if (nextRow < currentRow) {
                    shouldSwitch = true;
                    break;
                }
            } else if(column == 4 || column == 0){
                x = parseInt(x);
                y = parseInt(y);
                if (x > y) {
                    shouldSwitch = true;
                    break;
                }
            } else if(column == 1 || column == 2){
                if(rows[i].getElementsByTagName("TD")[column].innerHTML.toLowerCase() > rows[i + 1].getElementsByTagName("TD")[column].innerHTML.toLowerCase()){
                    shouldSwitch = true;
                    break;
                }
            }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
}

function calcTime(data){
    startTime = data.substring(data.lastIndexOf("ز") +1 , data.lastIndexOf("ت"));
    startTime = parseInt(startTime.substring(1 , 3));
}

function setPriority(first , second){
    let time;
    switch (first[0]){
        case "ش":
            currentRow = 0 ;
            calcTime(first);    
            time = startTime;
            calcTime(second);
            if(time > startTime){
                currentRow ++;
            }
        break;
        case "ي":
            currentRow = 1 ;
            calcTime(first);    
            time = startTime;
            calcTime(second);
            if(time > startTime){
                currentRow ++;
            }
        break;
        case "د":
            currentRow = 2 ;
            calcTime(first);    
            time = startTime;
            calcTime(second);
            if(time > startTime){
                currentRow ++;
            }
        break;
        case "س":
            currentRow = 3 ;
            calcTime(first);    
            time = startTime;
            calcTime(second);
            if(time > startTime){
                currentRow ++;
            }
        break;
        case "چ":
            currentRow = 4 ;
            calcTime(first);    
            time = startTime;
            calcTime(second);
            if(time > startTime){
                currentRow ++;
            }
        break;
    }
    switch (second[0]){
        case "ش":
            nextRow = 0 ;
        break;
        case "ي":
            nextRow = 1 ;
        break;
        case "د":
            nextRow = 2 ;
        break;
        case "س":
            nextRow = 3 ;
        break;
        case "چ":
            nextRow = 4 ;
        break;
    }
}

function onChangeItem(){
    let filter = document.getElementById("filter");
    if (filter.options[filter.selectedIndex].value == "time" ){
        showData();
    } else if(filter.options[filter.selectedIndex].value == "student" ){
        sortTable(4);
    } else if(filter.options[filter.selectedIndex].value == "code" ){
        sortTable(0);
    } else if(filter.options[filter.selectedIndex].value == "prof" ){
        sortTable(2);
    } else if(filter.options[filter.selectedIndex].value == "course" ){
        sortTable(1);
    }
}