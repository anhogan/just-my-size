chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ 'saving_sizes': false }, function() {
    console.log('Welcome to Just My Size! The perfect fit every time');
  });
});