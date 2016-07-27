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
  var listItems = selectedText.split(/\r\n|\r|\n/g);
  var markdownList = ''
  for(var i=0; i<listItems.length; i++){
    if(listItems[i] != ""){
      markdownList += '- ' + listItems[i] + '\n'
    }
    else{
      markdownList += '\n'
    }
  }

  var newFieldValue = currentFieldValue.replace(selectedText, markdownList);
  markyUpdatePage(newFieldValue);
}

function markyNumberedList(){
  var currentFieldValue = document.getElementById(selectedDiv).value;
  var listItems = selectedText.split(/\r\n|\r|\n/g);
  var markdownList = ''
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

  var newFieldValue = currentFieldValue.replace(selectedText, markdownList);
  markyUpdatePage(newFieldValue);
}

function saveAsMD(divID){
    var textToSave = document.getElementById(divID).value;
    var textToSaveAsBlob = new Blob([textToSave], {type:"text/md"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = 'marky_export.md'

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();
}

function saveAsHTML(divID){
    var textToSave = document.getElementById(divID).value;
    textToSave = markdown.toHTML(textToSave);
    textToSave = '<!doctype html>\n<head>\n<meta charset="utf-8">\n<title>Marky Export</title>\n</head>\n<body>\n' + textToSave + '\n</body>\n</html>'

    var textToSaveAsBlob = new Blob([textToSave], {type:"text/md"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = 'marky_export.html'

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();
}
