

chrome.tabs.onUpdated.addListener(function( tabId, changeInfo, tab) {

  chrome.storage.local.get(function( items ) {

    var host = getDomain(tab.url);
    var styleCode = items[host];
    chrome.tabs.executeScript(tabId, {
      code: 'console.log(' + JSON.stringify(items) + ')'
    }, function() {});

    chrome.tabs.insertCSS(tabId, {
      code: styleCode
    }, function() {});
  });

});

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