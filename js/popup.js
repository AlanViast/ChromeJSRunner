var message = document.querySelector('#message');

function javascriptRunner() {

  var run = document.querySelector('#runBtn');
  var code = document.querySelector('#jsCode');

  run.onclick = function() {
    chrome.tabs.executeScript(null, {
      code: code.value
    }, function() {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.runtime.lastError) {
        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      }
    });
  };

}

javascriptRunner();
renderRunner();

function renderRunner() {
  var renderBtn = document.querySelector('#renderBtn');
  var code = document.querySelector('#styleCode');

  renderBtn.onclick = function() {
    console.log(chrome.storage.local);
    chrome.tabs.query({
      active: true
    }, function(tabs) {

      var host = getDomain(tabs[0].url);

      var obj = {};
      obj[host] = code.value;
      chrome.storage.local.set(obj);

      chrome.storage.local.get(function( items ) {
        console.log(items);
      });
    });


    chrome.tabs.insertCSS(null, {
      code: code.value
    }, function() {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.runtime.lastError) {
        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      }
    });
  };
}



function getDomain(url) {
  var domain;
  //find & remove protocol (http, ftp, etc.) and get domain
  if (url.indexOf("://") > -1) {
    domain = url.split('/')[2];
  } else {
    domain = url.split('/')[0];
  }

  //find & remove port number
  domain = domain.split(':')[0];

  return domain;
}