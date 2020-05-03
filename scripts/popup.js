const mySizes = {
  mySizes: []
};

let suggestSize = document.getElementById('suggestSizeButton');
let viewSize = document.getElementById('viewSizesButton');

window.addEventListener('load', function() {
  chrome.storage.sync.get(['mySizes'], function(result) {
    mySizes = result.mySizes;
  });
});

suggestSize.addEventListener('click', function() {
  viewSize.style.display = 'none';
  suggestSize.style.display = 'none';

  let search = document.createElement('input');
  let back = document.createElement('button');
  let submit = document.createElement('button');

  search.id = 'searchInput';
  back.id = 'backButton';
  submit.id = 'submitButton';

  search.setAttribute('placeholder', 'Search your sizes');
  back.textContent = 'Back';
  submit.textContent = 'Search';

  document.body.appendChild(back);
  document.body.appendChild(search);
  document.body.appendChild(submit);

  back.addEventListener('click', function() {
    viewSize.style.display = 'block';
    suggestSize.style.display = 'block';
    search.style.display = 'none';
    back.style.display = 'none';
    submit.style.display = 'none';

    let message = document.getElementById('searchError');
    let results = document.getElementsByClassName('itemDiv');

    if (message) {
      document.body.removeChild(message);
    } else if (results) {
      let newResults = Array.from(results);
      for (item of newResults) {
        let id = document.getElementById(item.id)
        document.body.removeChild(id);
      };
    }
  });

  submit.addEventListener('click', function() {
    let input = search.value.toLowerCase();

    let storeResult = mySizes.mySizes.filter(item => {
      return item.store.toLowerCase() === input
    });

    let styleResult = mySizes.mySizes.filter(item => {
      return item.style.toLowerCase() === input
    });

    let typeResult = mySizes.mySizes.filter(item => {
      return item.type.toLowerCase() === input
    });

    if (storeResult.length > 0 || styleResult.length > 0 || typeResult.length > 0) {
      let message = document.getElementById('searchError');

      if (message) {
        document.body.removeChild(message);
      } else {
        if (storeResult.length > 0) {
          storeResult.map(item => {
            search.style.display = 'none';
            submit.style.display = 'none';
    
            let sizeDiv = document.createElement('div');
            let storeName = document.createElement('h3');
            let itemType = document.createElement('p');
            let itemStyle = document.createElement('p');
            let size = document.createElement('p');
      
            sizeDiv.classList.add('itemDiv');
            itemType.id = 'itemType';
            sizeDiv.id = item.id;
      
            storeName.textContent = item.store;
            itemType.textContent = item.type;
            itemStyle.textContent = 'Style: ' + item.style;
            size.textContent = 'Size: ' + item.size;
      
            sizeDiv.appendChild(storeName);
            sizeDiv.appendChild(itemType);
            sizeDiv.appendChild(itemStyle);
            sizeDiv.appendChild(size);
      
            document.body.appendChild(sizeDiv);
          })
        } else if (styleResult.length > 0) {
          styleResult.map(item => {
            search.style.display = 'none';
            submit.style.display = 'none';
    
            let sizeDiv = document.createElement('div');
            let storeName = document.createElement('h3');
            let itemType = document.createElement('p');
            let itemStyle = document.createElement('p');
            let size = document.createElement('p');
      
            sizeDiv.classList.add('itemDiv');
            itemType.id = 'itemType';
            sizeDiv.id = item.id;
      
            storeName.textContent = item.store;
            itemType.textContent = item.type;
            itemStyle.textContent = 'Style: ' + item.style;
            size.textContent = 'Size: ' + item.size;
      
            sizeDiv.appendChild(storeName);
            sizeDiv.appendChild(itemType);
            sizeDiv.appendChild(itemStyle);
            sizeDiv.appendChild(size);
      
            document.body.appendChild(sizeDiv);
          })
        } else if (typeResult.length > 0) {
          typeResult.map(item => {
            search.style.display = 'none';
            submit.style.display = 'none';
    
            let sizeDiv = document.createElement('div');
            let storeName = document.createElement('h3');
            let itemType = document.createElement('p');
            let itemStyle = document.createElement('p');
            let size = document.createElement('p');
      
            sizeDiv.classList.add('itemDiv');
            itemType.id = 'itemType';
            sizeDiv.id = item.id;
      
            storeName.textContent = item.store;
            itemType.textContent = item.type;
            itemStyle.textContent = 'Style: ' + item.style;
            size.textContent = 'Size: ' + item.size;
      
            sizeDiv.appendChild(storeName);
            sizeDiv.appendChild(itemType);
            sizeDiv.appendChild(itemStyle);
            sizeDiv.appendChild(size);
      
            document.body.appendChild(sizeDiv);
          })
        }
      }
    } else {
      let message = document.createElement('p');

      message.id = 'searchError';

      message.textContent = 'No matches found for ' + input

      document.body.appendChild(message);
    };
  })
});

viewSize.addEventListener('click', function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  };
});