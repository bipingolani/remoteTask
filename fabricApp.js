window.onload=function(){
    createHTML();    
};
var canvasList={},cloneObj,originalObj,originalCanvas,updatedCanvas;
function createHTML(){
    
    var mainContainer = document.getElementById('mainContainer');
    canvasList.canvasA = new fabric.Canvas('canvasA');
    canvasList.canvasB = new fabric.Canvas('canvasB');

    canvasList.canvasA.selection = false;
    canvasList.canvasB.selection = false;

    createText('Canvas A','canvasA');
    createText('Canvas B','canvasB');

    createRectangle('canvasA');
    createCircle('canvasB');

    mainContainer.addEventListener('mousedown', mousedownEvent, false);
    mainContainer.addEventListener('mouseup', mouseupEvent, false);
    
}

function mousedownEvent(event){
    originalCanvas = event.srcElement.offsetParent.firstChild.id;
    if(canvasList[originalCanvas].getActiveObject()){
        originalObj = canvasList[originalCanvas].getActiveObject();
        cloneObj = canvasList[originalCanvas].getActiveObject().clone();
    }
}

function mouseupEvent(event){
    updatedCanvas=event.target.offsetParent.firstElementChild.id;
    if((cloneObj) && (originalCanvas!==updatedCanvas)){
        var topAdjustment = 30;
        var leftAdjustment = 20;
        if(updatedCanvas=='canvasB'){
            topAdjustment = 200;
        }
        cloneObj.set({top:(event.clientY-topAdjustment),left:(event.clientX-leftAdjustment)});
        canvasList[updatedCanvas].add(cloneObj);
        canvasList[updatedCanvas].renderAll();
        canvasList[originalCanvas].remove(originalObj);
        canvasList[originalCanvas].renderAll();
    }
}

function createRectangle(canvas){
    var rectangle = new fabric.Rect({
        left:40,
        top:50,
        strokeWidth: 2, 
        stroke:'red',
        fill:'#fff',
        width:20,
        height:20,
        selectable:true
    });
    canvasList[canvas].add(rectangle);
}

function createCircle(canvas){
    var circle = new fabric.Circle({
        left:40,
        top:50,
        strokeWidth: 2, 
        stroke:'red',
        fill:'#fff',
        radius:20,
        selectable:true
    });
    canvasList[canvas].add(circle);
}

function createText(text,canvas){
    var textprops = new fabric.Text(text,{
        top:20,
        fontSize: 20,
        fontFamily: 'Arial',
        fill: 'black',
        textAlign: 'left',
        hasControls: false
    });
    canvasList[canvas].add(textprops);
}