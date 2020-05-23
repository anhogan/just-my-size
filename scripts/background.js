// var mySizes = {
//   mySizes: []
// };

chrome.runtime.onInstalled.addListener(function() {
  // chrome.storage.sync.set({ 'mySizes': mySizes }, function() {
  //   console.log('Welcome to Just My Size! The perfect fit every time');
  // });
  chrome.storage.sync.set({ 'saving_sizes': true }, function() {
    console.log('Welcome to Just My Size! The perfect fit every time');
  });
});

// chrome.storage.onChanged.addListener(function(changes, namespace) {
//   for (var key in changes) {
//     var storageChange = changes[key];
//     console.log('Storage key "%s" in namespace "%s" changed. ' +
//                 'Old value was "%s", new value is "%s".',
//                 key,
//                 namespace,
//                 storageChange.oldValue,
//                 storageChange.newValue);
//   };
// });