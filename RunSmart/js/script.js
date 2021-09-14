
// carousel
const TRASFORM = 750;
let slider = [
    "img/carousel_watch/polar-m400.jpg",
    "img/carousel_watch/polar-rc3gps.jpg",
    "img/carousel_watch/polar-m600-trio.jpg",
];
let carouselInner = document.querySelector('.carousel__inner');
let step = 0;

document.querySelector('.carousel__button-left').onclick = () => move('left');
document.querySelector('.carousel__button-right').onclick = () => move('right');

function start(){
    draw('append', 0);
}
start();

function draw(type, offset){
    if(type === 'append'){
        if(step+1 == slider.length){
            step = 0;
        } else {
            step++;
        }
        let img = document.createElement('img');
        img.src = slider[step];
        img.classList.add('carousel__slide');
        img.style.transform = `translateX(${offset * TRASFORM}px)`;
        carouselInner.append(img);
    } else if (type === 'prepend'){
        if (step <= 0){
            step = slider.length - 1;
        } else {
            step--;
        }
        let img = document.createElement('img');
        img.src = slider[step];
        img.classList.add('carousel__slide');
        img.style.transform = `translateX(${offset * TRASFORM}px)`;
        carouselInner.prepend(img);
    }
}

function move(type){
    if(type === 'left'){
        draw('append', 1);
        setTimeout(function(){
            let offset = 0;
            let carouselSlides = document.querySelectorAll('.carousel__slide');
            for(let i = 0; i < carouselSlides.length; i++){
                carouselSlides[i].style.transform = `translateX(${offset * TRASFORM - TRASFORM}px)`;
                offset++;
            }
            setTimeout(function(){
                carouselSlides[0].remove();
            },250);
        },100);
    } else if(type === 'right'){
        draw('prepend', -1);
        setTimeout(function(){
            let offset = -1;
            let carouselSlides = document.querySelectorAll('.carousel__slide');
            for(let i = 0; i < carouselSlides.length; i++){
                carouselSlides[i].style.transform = `translateX(${offset * TRASFORM + TRASFORM}px)`;
                offset++;
            }
            setTimeout(function(){
                carouselSlides[1].remove();
            },250);
        },100);
    }
}





//tabs
let selectedLi = document.querySelector('.catalog__tab_active');      
let tabs = document.querySelector('.catalog__tabs');
tabs.addEventListener("click", function(event){
    if (event.target.closest('li')) {
        highlightLi(event.target.closest('li'));
    }
})

function highlightLi(li){
    if(selectedLi){
        selectedLi.classList.remove('catalog__tab_active');
    }
    selectedLi = li;
    selectedLi.classList.add('catalog__tab_active');

    let catalogs = document.querySelectorAll('.catalog__content');
    let catalogTabs = document.querySelectorAll('.catalog__tab');
    if (catalogTabs[0].classList.contains('catalog__tab_active')){    //проверить нужно ли добавлять класс!!
        addClass (catalogs[0]);
        removeClass(catalogs[1], catalogs[2]);
    } else if(catalogTabs[1].classList.contains('catalog__tab_active')){
        addClass (catalogs[1]);
        removeClass(catalogs[0], catalogs[2]);
    } else {
        addClass (catalogs[2]);
        removeClass(catalogs[1], catalogs[0]);
    }
}
function addClass (tab){
    tab.classList.add('catalog__content_active');
}
function removeClass(tab1, tab2){
    tab1.classList.remove('catalog__content_active');
    tab2.classList.remove('catalog__content_active');
}





// переключение "подробно" и "назад"!!!!
let links = document.querySelectorAll('.catalog a');
for(let i = 0; i < links.length; i++){
    links[i].onclick = () => {return false};  //отменяем стандарное поведение ссылок в блоке catalog
}

let catalog = document.querySelector('.catalog');
catalog.addEventListener("click", function(event) {
    if (event.target.className == 'catalog-item__link'){       //узнаем на какой элемент кликнули 
        let itemContent = event.target.closest('.catalog-item__content'); //ищем родителя с классом который нужно тоглить на active
        changeClassContent(itemContent);  // вызываем проверку
    } else if (event.target.className == 'catalog-item__back'){  //узнаем на какой элемент кликнули 
        let itemList = event.target.closest('.catalog-item__list');  //ищем родителя с классом который нужно тоглить на active
        changeClassItem(itemList); // вызываем проверку
    }
});

function changeClassContent(type){
    type.classList.toggle('catalog-item__content_active'); //проверяем элемент
    type.nextElementSibling.classList.toggle('catalog-item__list_active'); //проверяем соседа
}
function changeClassItem(type){
    type.classList.toggle('catalog-item__list_active'); // проверяем элемент 
    type.previousElementSibling.classList.toggle('catalog-item__content_active'); //проверяем соседа
}

// modal
const overlay = document.querySelector('.overlay'),
      consultation = document.querySelector('#consultation'),
      order = document.querySelector('#order'),
      thanks = document.querySelector('#thanks'),
      buttonConsultation = document.querySelectorAll('.button_consultation'),
      buttonBuy = document.querySelectorAll('.button_mini'),
      modalClose = document.querySelectorAll('.modal__close');
      orderDescr = document.querySelector('#order .modal__descr');

function displayOff(){
    overlay.style.display = 'none';
    consultation.style.display = 'none';
    order.style.display = 'none';
    thanks.style.display = 'none';
}   

function changeDisplay(type){
    if(type === "consultation"){
        overlay.style.display = 'block';
        consultation.style.display = 'block';
    } if (type === "order"){
        overlay.style.display = 'block';
        order.style.display = 'block';
    }
}

modalClose.forEach((element) => {
    element.onclick = () => displayOff();
})     
buttonConsultation.forEach(function(element){
    element.onclick = () => changeDisplay('consultation');
})
buttonBuy.forEach(function(element){
    element.onclick = () => changeDisplay('order');
})

catalog.addEventListener("click", function(event){
    if(event.target.className == 'button button_mini'){
        let catalogItem = event.target.closest('.catalog-item');
        let subtitle = catalogItem.querySelector('.catalog-item__subtitle');
        orderDescr.innerHTML = subtitle.innerHTML;
    }
})


///scroll top
let scrollTop = document.querySelector('.scroll-top');
window.addEventListener("scroll", function(){
    if(window.scrollY > 1400){
        scrollTop.classList.remove('scroll-top_hidden');
    } else if(window.scrollY < 1400){
        scrollTop.classList.add('scroll-top_hidden');
    }
})
scrollTop.addEventListener("click", () => {
    window.scrollTo(0, 0);
})



let user12 = {
    firstname: 'alex'
}
console.log(user12);
    





























