
function ready() {

  var message = document.querySelector('#message');
  var run = document.querySelector('#runBtn');
  var code = document.querySelector('.code');

  run.onclick = function(){
    chrome.tabs.executeScript(null, {
      code: code.value
    }, function() {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.runtime.lastError) {
        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      }
    });
  }

}

ready();