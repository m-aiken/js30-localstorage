const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
const allOrClear = document.querySelector('.selections');

function addItem(e) {
    // Stop page from reloading on submit
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text, // ES6 shorthand for key: value -> text: text
        done: false
    };
    items.push(item);
    populateList(items, itemsList);
    // Put item into local storage
    localStorage.setItem('items', JSON.stringify(items));
    // Reset the form element
    this.reset();
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}>
                <label for="item${i}">${plate.text}</label>
            </li>`;
    }).join('');
}

function toggleDone(e) {
    if (!e.target.matches('input')) return; // Skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    // Toggle between true and false
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

function selectAll() {
    items.forEach(item => item.done = true);
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

function deselectAll() {
    items.forEach(item => item.done = false);
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
allOrClear.addEventListener('submit', () => localStorage.clear());
allOrClear.querySelector('#select-all').addEventListener('click', selectAll);
allOrClear.querySelector('#deselect-all').addEventListener('click', deselectAll);

// On page load - variable 'items' will either be populated by data in local storage or a blank array if local storage is empty.
populateList(items, itemsList);
