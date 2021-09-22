const noteList = document.querySelector('.note-list');
const addNoteBtn = document.querySelector('.add-btn');
const saveBtn = document.querySelector('.save-btn');
const noteForm = document.querySelector('.note-form');
const inputNoteTitle = document.querySelector('.note-title');
const textareaNoteDescr = document.querySelector('.note-descr');
const noteDelete = document.querySelector('.note-del');
//////alert validation
const overlay = document.querySelector('.overlay');
const alertMes = document.querySelector('.alert');
const overlayCloseBtn = document.querySelector('.overlay-close');
//////sort
const sortTitleArrowDown = document.querySelector('.sort-title_arrowdown');
const sortTitleArrowUp = document.querySelector('.sort-title_arrowup');
const sortDateArrowDown =document.querySelector('.sort-date_arrowdown');
const sortDateArrowUp =document.querySelector('.sort-date_arrowup');
/////////search
const searchInput = document.querySelector('.search-input');

let notesArray = new Array();
let selectedLi;

function updateNoteList(arr){                                      //////update localStorage and noteList///
    if(arr){                                                           
        let json =JSON.stringify(arr);
        localStorage.setItem('noteArr', json);                         
    };
    removeItems()
    let array = JSON.parse(localStorage.getItem('noteArr'));
    if(array){
        notesArray = array;
    }
    renderList(notesArray);
}

function removeItems(){                                                         /////////remove all list items (li)
    let liItems = document.querySelectorAll('.note-list_item');
    Array.from(liItems).map((item) => {
        item.remove();
    })
}

function renderList(arr) {                                                     /////////render new list items
    arr.map((item) => {
        let noteTitle = createNoteListItem();
        noteTitle.innerHTML = item.title;
    })
}

function createNoteListItem (){                                ////////////////////create new noteitem(li) and return span for title
    let li = document.createElement('li');
    li.classList.add('note-list_item');
    noteList.prepend(li);
    return li
}

function selecteNote(item){                                                    ///////////////////choose note and add class active
    if(selectedLi){
        selectedLi.classList.remove('note-list_item_active');
    }
    selectedLi = item;
    selectedLi.classList.add('note-list_item_active');
}

function clearInputAndTextarea(){                                           ///////clear input and textarea
    textareaNoteDescr.value = '';
    inputNoteTitle.value = '';
}

function pushNewObjToArray(elem){                                                /////////create and push new object 
    let obj = new Object();
    obj.id = +(new Date());
    obj.title = elem.innerHTML;
    obj.descr = '';
    notesArray.push(obj);
}

function findSelectedNote(actElem){                                          /////find object with the same title as active list-item
    let selectedNote;
    let title = actElem.innerHTML;
    notesArray.map((item) => {
        if(item.title == title)
        selectedNote = item;
    })
    return selectedNote;
}

noteList.addEventListener("click",(e) => {                                         ///////choose note
    let target = e.target
    if(target.closest('LI')){
        selecteNote(target.closest('LI'));
        let note = findSelectedNote(selectedLi)
        inputNoteTitle.value = note.title;
        textareaNoteDescr.value = note.descr;
    }
    noteForm.style.display = 'block';
})

addNoteBtn.addEventListener("click", (e) => {                                          //////add new note
    e.preventDefault();
        
    if(notesArray.length == 0 || notesArray[notesArray.length-1].descr != ''){
        updateNoteList();
        clearInputAndTextarea();
        let li = createNoteListItem();
        selecteNote(li);
        li.innerHTML = "New Note";

        pushNewObjToArray(li);
    }else{
        alertMessage('Fill in previous note')
    }
    noteForm.style.display = 'block';
})    

saveBtn.addEventListener("click",(e) => {                                            /////////////////save note
    e.preventDefault();
    if(inputNoteTitle.value == '' || textareaNoteDescr.value == ''){
        alertMessage('Fill in current note'); 
    }else{
        let note = findSelectedNote(selectedLi);
        note.title = inputNoteTitle.value;
        note.descr = textareaNoteDescr.value;
        sortDateDown ();
        updateNoteList(notesArray);
    }
})

noteDelete.addEventListener("click", (e) => {                                              /////delete note
    sortDateDown ();
    let selectedObj = findSelectedNote(selectedLi)
    let newArr = notesArray.filter(obj => obj !== selectedObj);
    
    updateNoteList(newArr);
    clearInputAndTextarea()
    noteForm.style.display = 'none';
})


updateNoteList();
////////////////////////////////////////////////////////////////sort
sortTitleArrowUp.addEventListener('click', sortTitleUp)
sortTitleArrowDown.addEventListener('click', sortTitleDown)
sortDateArrowUp.addEventListener('click', sortDateUp);
sortDateArrowDown.addEventListener('click', sortDateDown);

function sortTitleUp(){
    removeItems();
    let newNotesArray = notesArray.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1);
    renderList(newNotesArray);
    clearInputAndTextarea();
    noteForm.style.display = 'none';
}

function sortTitleDown(){
    removeItems();
    let newNotesArray = notesArray.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1);
    renderList(newNotesArray);
    clearInputAndTextarea();
    noteForm.style.display = 'none';
}

function sortDateUp (){
    removeItems();
    let newNotesArray = notesArray.sort((a, b) => a.id < b.id ? 1 : -1);
    renderList(newNotesArray);
    clearInputAndTextarea();
    noteForm.style.display = 'none';
}

function sortDateDown (){
    removeItems();
    let newNotesArray = notesArray.sort((a, b) => a.id < b.id ? -1 : 1);
    renderList(newNotesArray);
    clearInputAndTextarea();
    noteForm.style.display = 'none';
}


overlayCloseBtn.addEventListener("click", (e) => {                       //////////close alert message
    e.preventDefault();
    overlay.style.display = 'none';
})


function alertMessage(text){                                             ///////alert message
    overlay.style.display = 'block';
    alertMes.firstElementChild.innerHTML = text;
}

///////////////////////////////////////form validation
inputNoteTitle.addEventListener("focusout", function(event){
    let length = this.value.length;
    if (length < 3){
        alertMessage('min 3 chars');
        this.focus();
    } else if (length > 120){
        alertMessage('max 120 chars');
        this.focus();
    }
})

textareaNoteDescr.addEventListener("focusout", function(event){
    let length = this.value.length;
    if (length < 5){
        alertMessage('min 5 chars');
        this.focus();
    } else if (length > 500){
        alertMessage('max 500 chars');
        this.focus();
    }
})
/////////////search 
searchInput.addEventListener("input", (e) => {                                     
    let titleItems = document.querySelectorAll('.note-list_item');
    
    titleItems.forEach((item)=> {
        let value = item.innerHTML.toLowerCase().startsWith(searchInput.value.toLowerCase());
        if(searchInput.value == '')
            return
        if(value){
            noteForm.style.display = 'block';
            selecteNote(item);
            let note = findSelectedNote(selectedLi)
            inputNoteTitle.value = note.title;
            textareaNoteDescr.value = note.descr;
        }
    })
})

