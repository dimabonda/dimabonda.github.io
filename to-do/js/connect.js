import{monthList, toDoDay, toDoInput, ol, btnAdd, toDoClear, database, rootRef} from './variables.js'

export function connectDatabase(){

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
        let i = 1;
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

        rootRef.child(toDoDay.innerHTML).get()
        .then((snapshot) => {
            let toDoDayList = snapshot.val();

            let toDoItem = document.querySelectorAll('.todo-item');           ///////remove all li 
            toDoItem.forEach((item) => {
                item.remove();  
            })

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


    monthList.addEventListener("click", (e) => {            //////////////select date and get todo from firebase
        e.preventDefault();
        let target = e.target;
        if((target.classList.contains('day')) && (target.innerHTML != '')){

            getToDoList();
        }
    })

    btnAdd.addEventListener('click', (e) => { 
        e.preventDefault();                  
        let object = createObjectToDo();              /////add new todo 
                               
        database.ref('/todo/' + toDoDay.innerHTML).set(
            object
        )
        toDoInput.value = '';

        getToDoList();
        
    })


    ol.addEventListener("click", (e) => {               ////////delete todo item
        e.preventDefault();
        let target = e.target;
        if(target.tagName === 'IMG'){
            const images = Array.from(document.querySelectorAll('.todo-item img'));
            let index = images.indexOf(target);

            rootRef.child(toDoDay.innerHTML).get()
            .then((snapshot) => {
                let toDoDayList = snapshot.val();
                let keys = Object.keys(toDoDayList);
                let value = keys[index];
                rootRef.child(toDoDay.innerHTML).child(value).remove();
                getToDoList();
            })
        }
    })

    toDoClear.addEventListener("click", (e) => {
        e.preventDefault();

        rootRef.child(toDoDay.innerHTML).remove();
        getToDoList();
        
    });
}




