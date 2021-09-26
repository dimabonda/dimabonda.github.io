import{monthList, toDoDay, toDoInput, ol, btnAdd, toDoClear, database} from './variables.js'


export function connectDatabase(userId){

    function removeList(){
        let toDoItem = document.querySelectorAll('.todo-item');           ///////remove all li 
            toDoItem.forEach((item) => {
                item.remove();  
            })
    }
    
    function createToDo(){                               ///////////////create element li with span and img
        const li = document.createElement("li");
        li.classList.add('todo-item');
        const img = document.createElement('img');
        img.src = "icons/icons8-мусор-20.png";
        const span = document.createElement('span');
        span.classList.add('todo-item_content');

        ol.appendChild(li).append(img, span);
    }

    function createObjectToDo(){             ///////////////////////create object (input and all li)
        let obj = new Object();
        let i = 0;
        let toDoItemContent = document.querySelectorAll('.todo-item_content');
        if(Boolean(toDoInput.value.trim())){
            obj[i] = toDoInput.value.trim();             ////add from input
            i++;
        }
        toDoItemContent.forEach((item) => {                             ////add from  li
            if(item.innerHTML){
                obj[i] = item.innerHTML;
                i++;
            }
        })
        return obj
    }

    function getToDoList(){                                          ////////// get todo from firebase

        database.ref(`${userId}`).child(toDoDay.innerHTML).get()
        .then((snapshot) => {
            let toDoDayList = snapshot.val();

            removeList()

            let i = 0;
            for(let prop in toDoDayList){
                if(toDoDayList.hasOwnProperty(prop)){
                    createToDo();                                     /////////update li 
                    let toDoItemContent = document.querySelectorAll('.todo-item_content'); 
                    toDoItemContent[i].innerHTML = toDoDayList[prop];
                    i++;
                    
                }
            }
        })
    }
    
    monthList.onclick = (e) => {                                                              //////////////select date and get todo from firebase
        e.preventDefault();
        let target = e.target;
        if((target.classList.contains('day')) && (target.innerHTML != '')){

            getToDoList();
        }
    }
        
    btnAdd.onclick = (e) => {                                                                 /////add new todo 
        e.preventDefault();                  
        let object = createObjectToDo();              
        database.ref(`/${userId}/` + toDoDay.innerHTML).set(
            object
        )
        toDoInput.value = '';

        getToDoList();
    }

    ol.onclick = (e) => {                                          ////////delete todo item
        let target = e.target;
        if(target.tagName === 'IMG'){
            const images = Array.from(document.querySelectorAll('.todo-item img'));
            let index = images.indexOf(target);

            database.ref(`${userId}`).child(toDoDay.innerHTML).get()
            .then((snapshot) => {
                let toDoDayList = snapshot.val();
                let keys = Object.keys(toDoDayList);
                let value = keys[index];
                database.ref(`${userId}`).child(toDoDay.innerHTML).child(value).remove();
                getToDoList();
            })
        }
    }
    
    toDoClear.onclick = (e) => {
        e.preventDefault();

        database.ref(`${userId}`).child(toDoDay.innerHTML).remove();
        getToDoList();
    }

    getToDoList();
}



