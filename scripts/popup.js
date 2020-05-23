var mySizes = [];

let suggestSize = document.getElementById('suggestSizeButton');
let viewSize = document.getElementById('viewSizesButton');

window.addEventListener('load', function() {
  chrome.storage.sync.get(['mySizes'], function(result) {
    mySizes.push(result.mySizes);
  });
});

console.log(mySizes);

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

  if (mySizes === undefined || mySizes.mySizes.length === 0) {
    let message = document.createElement('p');

    message.className = 'searchError';

    message.textContent = 'No saved sizes'

    document.body.appendChild(back);
    document.body.appendChild(message);
  } else {
    document.body.appendChild(back);
    document.body.appendChild(search);
    document.body.appendChild(submit);
  };

  back.addEventListener('click', function() {
    viewSize.style.display = 'block';
    suggestSize.style.display = 'block';
    search.style.display = 'none';
    back.style.display = 'none';
    submit.style.display = 'none';

    let message = document.getElementsByClassName('searchError');
    let results = document.getElementsByClassName('itemDiv');

    if (message) {
      Array.from(message).map(error => {
        document.body.removeChild(error);
      });
    };

    if (results) {
      Array.from(results).map(result => {
        document.body.removeChild(result);
      });
    };
  });

  submit.addEventListener('click', function() {
    let message = document.getElementsByClassName('searchError');

    if (message) {
      Array.from(message).map(error => {
        document.body.removeChild(error);
      })
    };

    let input = search.value.toLowerCase();
    let storeResult;
    let styleResult;
    let typeResult;

    if (mySizes !== undefined && mySizes.mySizes.length > 0) {
      storeResult = mySizes.mySizes.filter(item => {
        return item.store.toLowerCase() === input
      });

      styleResult = mySizes.mySizes.filter(item => {
        return item.style.toLowerCase() === input
      });

      typeResult = mySizes.mySizes.filter(item => {
        return item.type.toLowerCase() === input
      });
    };

    if ((storeResult !== undefined && storeResult.length > 0) || (styleResult !== undefined && styleResult.length > 0) || (typeResult !== undefined && typeResult.length > 0)) {
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
    } else {
      let message = document.createElement('p');

      message.className = 'searchError';

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