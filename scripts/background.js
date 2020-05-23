var mySizes = {
  mySizes: []
};

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ 'mySizes': mySizes }, function() {
    console.log('Welcome to Just My Size! The perfect fit every time');
  });

  chrome.storage.sync.set({ 'saving_sizes': true }, function() {
    console.log('Welcome to Just My Size! The perfect fit every time');
  });
});