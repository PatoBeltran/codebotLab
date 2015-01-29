// This generic function appends details of an event to the big Textarea
// element in the form above. It will be called from various event handlers.
function report(element, event) {
  var t = element.form.textarea;
  var elmtname = element.name;

  if ((element.type == "select-one") || (element.type == "select-multiple")){
    value = " ";
    for(var i = 0; i < element.options.length; i++) {
      if (element.options[i].selected) value += element.options[i].value + " ";
    }
  }
  else if (element.type == "textarea") value = "...";
  else value = element.value;
  var msg = event + ": " + elmtname + ' (' + value + ')\n';
  t.value = t.value + msg;
}

// This function adds a bunch of event handlers to every element in a form.
// It doesn't bother checking to see if the element supports the event handler,
// it just adds them all. Note that the event handlers call report() above.
function addhandlers(f) {
  for(var i = 0; i < f.elements.length; i++) {
    var e = f.elements[i];
    e.addEventListener('click', new Function("report(this, 'Click')"));
    e.addEventListener('change', new Function("report(this, 'Change')"));
    e.addEventListener('focus', new Function("report(this, 'Focus')"));
    e.addEventListener('blur', new Function("report(this, 'blur')"));
    e.addEventListener('select', new Function("report(this, 'Select')"));
  }

  // Special case handlers for the buttons:
  f.clearbutton.addEventListener('click', function(){
    f.textarea.value='';
    report(f.clearbutton, 'Click');
  }, false);

  f.submitbutton.addEventListener('click', function(){
    report(f.submitbutton, 'Click');
    return false;
    }, false);

  f.resetbutton.addEventListener('click', function(){
    f.reset();
    report(f.resetbutton, 'Click');
    return false;
  }, false);
}

// Activate our form by adding all possible event handlers!
addhandlers(document.everything);
