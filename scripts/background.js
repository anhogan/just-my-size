var mySizes = {
  store: 'Just My Size',
  type: 'Google Chrome Extension',
  style: 'Online Shopping',
  size: 'For all'
};

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ 'mySizes': mySizes }, function() {
    console.log('Welcome to Just My Size! The perfect fit every time');
  });
});