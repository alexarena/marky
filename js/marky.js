var selectedText = ''
var selectedDiv = ''
var selectedPreviewDiv = ''

function markyEditor(divID, previewDivID){
  selectedText = getSelectedText();
  selectedDiv = divID;
  selectedPreviewDiv = previewDivID;
  console.log(selectedText);
}


function getSelectedText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function markyUpdatePage(newFieldValue){
  document.getElementById(selectedDiv).value = newFieldValue;
  if(selectedPreviewDiv){
    document.getElementById(selectedPreviewDiv).innerHTML = markdown.toHTML(newFieldValue);
  }
  //document.getElementById(selectedDiv).select();
}

// Marky Formatter Functions
function markyAddHeading(){
  var currentFieldValue = document.getElementById(selectedDiv).value;
  var newFieldValue = currentFieldValue.replace(selectedText, "#" + selectedText + "");
  markyUpdatePage(newFieldValue);
}

function markyAddLink(){
  var currentFieldValue = document.getElementById(selectedDiv).value;
  var destination = prompt("Enter a URL for your link: ");
  var newFieldValue = currentFieldValue.replace(selectedText, "[" + selectedText + "]("+destination+")");
  markyUpdatePage(newFieldValue);
}

function markyBold(){
  var currentFieldValue = document.getElementById(selectedDiv).value;
  var newFieldValue = currentFieldValue.replace(selectedText, "**" + selectedText + "**");
  markyUpdatePage(newFieldValue);
}

function markyItalic(){
  var currentFieldValue = document.getElementById(selectedDiv).value;
  var newFieldValue = currentFieldValue.replace(selectedText, "*" + selectedText + "*");
  markyUpdatePage(newFieldValue);
}

function markyCode(){
  var currentFieldValue = document.getElementById(selectedDiv).value;
  var newFieldValue = currentFieldValue.replace(selectedText, "`" + selectedText + "`");
  markyUpdatePage(newFieldValue);
}
function markyList(){
  var currentFieldValue = document.getElementById(selectedDiv).value;
  var listItems = currentFieldValue.split(/\r\n|\r|\n/g);
  var markdownList = ''
  for(var i=0; i<listItems.length; i++){
    markdownList += '- ' + listItems[i] + '\n'
  }

  var newFieldValue = currentFieldValue.replace(selectedText, markdownList);
  markyUpdatePage(newFieldValue);
}

function markyNumberedList(){
  var currentFieldValue = document.getElementById(selectedDiv).value;
  var listItems = selectedText.split(/\r\n|\r|\n/g);
  var markdownList = ''
  console.log(listItems)
  var counter = 1;
  for(var i=0; i<listItems.length; i++){
    if(listItems[i] != ""){
      counter++;
      markdownList += counter + '. ' + listItems[i] + '\n'
    }
    else{
      markdownList += '\n'
      counter = counter-1;
    }
  }

  console.log("MD LIST: " + markdownList)

  var newFieldValue = currentFieldValue.replace(selectedText, markdownList);
  markyUpdatePage(newFieldValue);
}
