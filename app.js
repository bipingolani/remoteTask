window.onload = function (){
    var httpReq = new XMLHttpRequest();
    httpReq.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);
    httpReq.onreadystatechange = function() {
        if (httpReq.readyState == 4) {
            if(httpReq.status == 200) {
                var obj = JSON.parse(httpReq.responseText);
                createDom(obj);
            }
        }
    };
    httpReq.send(null);
};
function createDom(data){
    var userIdList=[], currentUserId, userIdOption,
        userIdSelectElement = document.getElementById("userIdSelection"),
        formElement = document.getElementById("mainForm");
    
    for(var i=0;i<data.length;i++){
        currentUserId=data[i].userId;
        if(userIdList.indexOf(currentUserId)<0){
            userIdList.push(currentUserId);
            userIdOption = document.createElement("option");
            userIdOption.text = currentUserId;
            userIdOption.value = currentUserId;
            userIdSelectElement.appendChild(userIdOption);
        }
    }
    
    userIdSelectElement.addEventListener("change",function(event){
        if(!event.target.value){
            removeDetails();
        }else{
            var selectedValues = data.filter(function(value){
                return value.userId==event.target.value;
            });
            removeDetails();
            showSelectedDetails(selectedValues);
        }
    });
    
    function showSelectedDetails(valArray){
        var selectTitleElement = document.createElement("select"),
            titleOptions,
            selectedDetailsDiv = document.createElement("div"),
            selectAreaDiv = document.createElement("div"),
            selectedDetailTextArea = document.createElement("textarea"),
            titleSpan = document.createElement('div'),
            bodySpan = document.createElement('div'),
            titleSection =document.createElement('div');
        
        titleSpan.textContent = 'title:';
        titleSpan.classList = 'titlesClass';
        bodySpan.textContent = 'body:';
        bodySpan.classList = 'titlesClass bodyTitleClass';
        selectedDetailsDiv.id="selectedDetailsDiv";
        titleSection.classList='selectWrapper';
        //selectedDetailTextArea.style ='display:block';
        selectedDetailTextArea.id = 'selectedDetailTextArea';
        valArray.forEach(function(val){
            titleOptions = document.createElement("option");
            titleOptions.text = val.title;
            titleOptions.value = val.id;
            selectTitleElement.appendChild(titleOptions);
        });
        selectedDetailsDiv.appendChild(titleSpan);
        titleSection.appendChild(selectTitleElement);
        selectedDetailsDiv.appendChild(titleSection);
        
        if(valArray[0].userId%2==0){
            selectedDetailTextArea.value = valArray[0].body;
            selectedDetailTextArea.disabled = true;
            selectAreaDiv.appendChild(bodySpan);
            selectAreaDiv.appendChild(selectedDetailTextArea);
            selectedDetailsDiv.appendChild(selectAreaDiv);
        }
        
        formElement.appendChild(selectedDetailsDiv);
        selectTitleElement.focus();
        
        selectTitleElement.addEventListener("change", function(event){
            if(event.target.value){
                var detailsArea = document.getElementById('selectedDetailTextArea');
                if(detailsArea){
                    detailsArea.value = data[event.target.value].body;
                }
            }
        });
    }
    
    function removeDetails(){
        var detailsDiv = document.getElementById("selectedDetailsDiv");
        if(detailsDiv){
            detailsDiv.remove();
        }
    }
}


