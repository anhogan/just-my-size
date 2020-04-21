var mySizes = {
  mySizes: []
};

let page = document.getElementById('sizeDiv');
let storeInput = document.getElementById('storeInput');
let typeInput = document.getElementById('typeInput');
let styleInput = document.getElementById('styleInput');
let sizeInput = document.getElementById('sizeInput');
let noteInput = document.getElementById('noteInput');
let storeLabel = document.getElementById('storeLabel');
let typeLabel = document.getElementById('typeLabel');
let styleLabel = document.getElementById('styleLabel');
let sizeLabel = document.getElementById('sizeLabel');
let noteLabel = document.getElementById('noteLabel');

window.addEventListener('load', function() {
  chrome.storage.sync.get(['mySizes'], function(result) {
    mySizes = result.mySizes;
  });
})

document.getElementById('addSizeButton').addEventListener('click', function() {
  document.getElementById('addDialog').style.display = 'block';
});

document.getElementById('addSize').addEventListener('click', function() {
  let sizeId;

  if (mySizes.mySizes.length === 0) {
    sizeId = 0;
  } else {
    sizeId = mySizes.mySizes[mySizes.mySizes.length - 1].id;
  };

  let newSize = {
    id: sizeId + 1,
    store: storeInput.value,
    type: typeInput.value,
    style: styleInput.value,
    size: sizeInput.value,
    notes: noteInput.value
  };

  let sizeDiv = document.createElement('div');
  let buttonDiv = document.createElement('div');
  let storeName = document.createElement('h3');
  let itemType = document.createElement('p');
  let itemStyle = document.createElement('p');
  let size = document.createElement('p');
  let note = document.createElement('p');
  let edit = document.createElement('button');
  let remove = document.createElement('button');

  sizeDiv.id = newSize.id;
  sizeDiv.classList.add('itemDiv');
  itemType.id = 'itemType';
  buttonDiv.id = 'buttonDiv';
  edit.id = 'editSizeButton';
  remove.id = 'removeSizeButton';

  storeName.textContent = newSize.store;
  itemType.textContent = newSize.type;
  itemStyle.textContent = 'Style: ' + newSize.style;
  size.textContent = 'Size: ' + newSize.size;
  note.textContent = 'Notes: ' + newSize.notes;
  edit.textContent = 'Edit Sizing';
  remove.textContent = 'Remove Sizing';

  if (newSize.store === '') {
    document.getElementById('storeError').style.display = 'block';
  } else if (newSize.type === '') {
    document.getElementById('typeError').style.display = 'block';
  } else if (newSize.style === '') {
    document.getElementById('styleError').style.display = 'block';
  } else if (newSize.size === '') {
    document.getElementById('sizeError').style.display = 'block';
  } else {
    buttonDiv.appendChild(edit);
    buttonDiv.appendChild(remove);
  
    sizeDiv.appendChild(storeName);
    sizeDiv.appendChild(itemType);
    sizeDiv.appendChild(itemStyle);
    sizeDiv.appendChild(size);
    sizeDiv.appendChild(note);
    sizeDiv.appendChild(buttonDiv);
  
    page.appendChild(sizeDiv);

    document.getElementById('storeError').style.display = 'none';
    document.getElementById('typeError').style.display = 'none';
    document.getElementById('styleError').style.display = 'none';
    document.getElementById('sizeError').style.display = 'none';

    storeInput.value = '';
    typeInput.value = '';
    styleInput.value = '';
    sizeInput.value = '';
    noteInput.value = '';

    mySizes.mySizes.push(newSize);
    document.getElementById('addDialog').style.display = 'none';
    document.getElementById('addSizestoPage').style.display = 'none'

    edit.addEventListener('click', function() {
      document.getElementById('editDialog').style.display = 'block';
      let element = document.getElementById(newSize.id);
    
      element.removeChild(storeName);
      element.removeChild(itemType);
      element.removeChild(itemStyle);
      element.removeChild(size);
      element.removeChild(note);
      element.removeChild(buttonDiv);
    
      page.removeChild(element);
    
      let storeValue = document.createElement('input');
      storeValue.setAttribute('value', newSize.store);
      storeValue.setAttribute('name', 'store');
      let typeValue = document.createElement('input');
      typeValue.setAttribute('value', newSize.type);
      typeValue.setAttribute('name', 'type');
      let styleValue = document.createElement('input');
      styleValue.setAttribute('value', newSize.style);
      styleValue.setAttribute('name', 'style');
      let sizeValue = document.createElement('input');
      sizeValue.setAttribute('value', newSize.size);
      sizeValue.setAttribute('name', 'size');
      let noteValue = document.createElement('input');
      noteValue.setAttribute('value', newSize.notes);
      noteValue.setAttribute('name', 'notes');
    
      storeLabel.appendChild(storeValue);
      typeLabel.appendChild(typeValue);
      styleLabel.appendChild(styleValue);
      sizeLabel.appendChild(sizeValue);
      noteLabel.appendChild(noteValue);
    
      document.getElementById('editSize').addEventListener('click', function() {
        let index = mySizes.mySizes.indexOf(newSize);
    
        storeLabel.removeChild(storeValue);
        typeLabel.removeChild(typeValue);
        styleLabel.removeChild(styleValue);
        sizeLabel.removeChild(sizeValue);
        noteLabel.removeChild(noteValue);
    
        let editedSize = {
          ...newSize,
          id: newSize.id,
          store: storeValue.value,
          type: typeValue.value,
          style: styleValue.value,
          size: sizeValue.value,
          notes: noteValue.value
        };
    
        document.getElementById('editDialog').style.display = 'none';
    
        mySizes.mySizes[index] = editedSize;
    
        let buttonDiv = document.createElement('div');
        let storeName = document.createElement('h3');
        let itemType = document.createElement('p');
        let itemStyle = document.createElement('p');
        let size = document.createElement('p');
        let note = document.createElement('p');
        let edit = document.createElement('button');
        let remove = document.createElement('button');
    
        itemType.id = 'itemType';
        buttonDiv.id = 'buttonDiv';
        edit.id = 'editSizeButton';
        remove.id = 'removeSizeButton';
    
        storeName.textContent = editedSize.store;
        itemType.textContent = editedSize.type;
        itemStyle.textContent = 'Style: ' + editedSize.style;
        size.textContent = 'Size: ' + editedSize.size;
        note.textContent = 'Note: ' + editedSize.notes;
        edit.textContent = 'Edit Sizing';
        remove.textContent = 'Remove Sizing';
    
        buttonDiv.appendChild(edit);
        buttonDiv.appendChild(remove);
    
        element.appendChild(storeName);
        element.appendChild(itemType);
        element.appendChild(itemStyle);
        element.appendChild(size);
        element.appendChild(note);
        element.appendChild(buttonDiv);
    
        page.insertBefore(element, page.children[newSize.id - 1]);

        chrome.storage.sync.set({ 'mySizes': mySizes }, function() {
          console.log('Syncing your sizes...');
        });
        chrome.storage.sync.get(['mySizes'], function(result) {
          mySizes = result.mySizes;
        });
      });
    
      document.getElementById('cancelEdit').addEventListener('click', function() {
        storeLabel.removeChild(storeValue);
        typeLabel.removeChild(typeValue);
        styleLabel.removeChild(styleValue);
        sizeLabel.removeChild(sizeValue);
        noteLabel.removeChild(noteValue);

        document.getElementById('editDialog').style.display = 'none';
        buttonDiv.appendChild(edit);
        buttonDiv.appendChild(remove);
    
        element.appendChild(storeName);
        element.appendChild(itemType);
        element.appendChild(itemStyle);
        element.appendChild(size);
        element.appendChild(note);
        element.appendChild(buttonDiv);
    
        page.insertBefore(element, page.children[newSize.id - 1]);
      });
    });

    remove.addEventListener('click', function() {
      let index = mySizes.mySizes.indexOf(newSize);
    
      if (index >= 0) {
        mySizes.mySizes.splice(index, 1);
        let element = document.getElementById(newSize.id);
        page.removeChild(element);

        chrome.storage.sync.set({ 'mySizes': mySizes }, function() {
          console.log('Syncing your sizes...');
        });
        chrome.storage.sync.get(['mySizes'], function(result) {
          mySizes = result.mySizes;
        });
      };
    });

    chrome.storage.sync.set({ 'mySizes': mySizes }, function() {
      console.log('Syncing your sizes...');
    });
    chrome.storage.sync.get(['mySizes'], function(result) {
      mySizes = result.mySizes;
    });
  };
});

document.getElementById('cancelAdd').addEventListener('click', function() {
  document.getElementById('addDialog').style.display = 'none';
});

function constructSizePreferences(mySizes) {
  chrome.storage.sync.get(['mySizes'], function(result) {
    mySizes = result.mySizes;

    if (mySizes.mySizes.length !== 0) {
      document.getElementById('addSizestoPage').style.display = 'none';
      for (let item of mySizes.mySizes) {
        let sizeDiv = document.createElement('div');
        let buttonDiv = document.createElement('div');
        let storeName = document.createElement('h3');
        let itemType = document.createElement('p');
        let itemStyle = document.createElement('p');
        let size = document.createElement('p');
        let note = document.createElement('p');
        let edit = document.createElement('button');
        let remove = document.createElement('button');
  
        sizeDiv.id = item.id;
        sizeDiv.classList.add('itemDiv');
        itemType.id = 'itemType';
        buttonDiv.id = 'buttonDiv';
        edit.id = 'editSizeButton';
        remove.id = 'removeSizeButton';
  
        storeName.textContent = item.store;
        itemType.textContent = item.type;
        itemStyle.textContent = 'Style: ' + item.style;
        size.textContent = 'Size: ' + item.size;
        note.textContent = 'Notes: ' + item.notes;
        edit.textContent = 'Edit Sizing';
        remove.textContent = 'Remove Sizing';
  
        buttonDiv.appendChild(edit);
        buttonDiv.appendChild(remove);
  
        sizeDiv.appendChild(storeName);
        sizeDiv.appendChild(itemType);
        sizeDiv.appendChild(itemStyle);
        sizeDiv.appendChild(size);
        sizeDiv.appendChild(note);
        sizeDiv.appendChild(buttonDiv);
  
        page.appendChild(sizeDiv);
  
        edit.addEventListener('click', function() {
          document.getElementById('editDialog').style.display = 'block';
          let element = document.getElementById(item.id);
        
          element.removeChild(storeName);
          element.removeChild(itemType);
          element.removeChild(itemStyle);
          element.removeChild(size);
          element.removeChild(note);
          element.removeChild(buttonDiv);
        
          page.removeChild(element);
        
          let storeValue = document.createElement('input');
          storeValue.setAttribute('value', item.store);
          storeValue.setAttribute('name', 'store');
          let typeValue = document.createElement('input');
          typeValue.setAttribute('value', item.type);
          typeValue.setAttribute('name', 'type');
          let styleValue = document.createElement('input');
          styleValue.setAttribute('value', item.style);
          styleValue.setAttribute('name', 'style');
          let sizeValue = document.createElement('input');
          sizeValue.setAttribute('value', item.size);
          sizeValue.setAttribute('name', 'size');
          let noteValue = document.createElement('input');
          noteValue.setAttribute('value', item.notes);
          noteValue.setAttribute('name', 'notes');
        
          storeLabel.appendChild(storeValue);
          typeLabel.appendChild(typeValue);
          styleLabel.appendChild(styleValue);
          sizeLabel.appendChild(sizeValue);
          noteLabel.appendChild(noteValue);
        
          document.getElementById('editSize').addEventListener('click', function() {
            let index = mySizes.mySizes.indexOf(item);
        
            storeLabel.removeChild(storeValue);
            typeLabel.removeChild(typeValue);
            styleLabel.removeChild(styleValue);
            sizeLabel.removeChild(sizeValue);
            noteLabel.removeChild(noteValue);
        
            let editedSize = {
              ...item,
              id: item.id,
              store: storeValue.value,
              type: typeValue.value,
              style: styleValue.value,
              size: sizeValue.value,
              notes: noteValue.value
            };
        
            document.getElementById('editDialog').style.display = 'none';
        
            mySizes.mySizes[index] = editedSize;
        
            let buttonDiv = document.createElement('div');
            let storeName = document.createElement('h3');
            let itemType = document.createElement('p');
            let itemStyle = document.createElement('p');
            let size = document.createElement('p');
            let note = document.createElement('p');
            let edit = document.createElement('button');
            let remove = document.createElement('button');
        
            itemType.id = 'itemType';
            buttonDiv.id = 'buttonDiv';
            edit.id = 'editSizeButton';
            remove.id = 'removeSizeButton';
        
            storeName.textContent = editedSize.store;
            itemType.textContent = editedSize.type;
            itemStyle.textContent = 'Style: ' + editedSize.style;
            size.textContent = 'Size: ' + editedSize.size;
            note.textContent = 'Note: ' + editedSize.notes;
            edit.textContent = 'Edit Sizing';
            remove.textContent = 'Remove Sizing';
        
            buttonDiv.appendChild(edit);
            buttonDiv.appendChild(remove);
        
            element.appendChild(storeName);
            element.appendChild(itemType);
            element.appendChild(itemStyle);
            element.appendChild(size);
            element.appendChild(note);
            element.appendChild(buttonDiv);
        
            page.insertBefore(element, page.children[item.id - 1]);
  
            chrome.storage.sync.set({ 'mySizes': mySizes }, function() {
              console.log('Syncing your sizes...');
            });
            chrome.storage.sync.get(['mySizes'], function(result) {
              mySizes = result.mySizes;
            });
          });
        
          document.getElementById('cancelEdit').addEventListener('click', function() {
            storeLabel.removeChild(storeValue);
            typeLabel.removeChild(typeValue);
            styleLabel.removeChild(styleValue);
            sizeLabel.removeChild(sizeValue);
            noteLabel.removeChild(noteValue);
  
            document.getElementById('editDialog').style.display = 'none';
            buttonDiv.appendChild(edit);
            buttonDiv.appendChild(remove);
        
            element.appendChild(storeName);
            element.appendChild(itemType);
            element.appendChild(itemStyle);
            element.appendChild(size);
            element.appendChild(note);
            element.appendChild(buttonDiv);
        
            page.insertBefore(element, page.children[item.id - 1]);
          });
        });
  
        remove.addEventListener('click', function() {
          let index = mySizes.mySizes.indexOf(item);
        
          if (index >= 0) {
            mySizes.mySizes.splice(index, 1);
            let element = document.getElementById(item.id);
            page.removeChild(element);
  
            chrome.storage.sync.set({ 'mySizes': mySizes }, function() {
              console.log('Syncing your sizes...');
            });
            chrome.storage.sync.get(['mySizes'], function(result) {
              mySizes = result.mySizes;
            });
          };
        });
      }
    } else {
      document.getElementById('addSizestoPage').style.display = 'block';
    }
  });
};

constructSizePreferences(mySizes);