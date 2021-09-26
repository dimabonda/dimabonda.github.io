import {months, MONTHS, monthDays, prev, next, monthBtn, yearBtn, dayBtn, calendarWrapperBtn, 
    newDay, overlay, calendarClose, week_days, toDoDay, year, monthList, } from './variables.js';


export function createCalendar(){

    let curryear = year.innerHTML = new Date().getFullYear();
    let currmonth = new Date().getMonth();
    let currday = new Date().getDate();

    function showTodayDate(){
        let day = currday;
        let month = document.querySelectorAll('.month_header')[currmonth].innerHTML;
        let year = curryear;
        toDoDay.innerHTML = day + ' ' + month + ' ' + year;
    }


    function showWeekDayForCalendarDay(){
        let date = new Date(curryear, currmonth, currday).getDay();
        let month = document.querySelectorAll('.month')[currmonth];
        let week_days = month.querySelectorAll('.week_day');
        week_days.forEach((item) => {
            if(item.classList.contains('week_day_active')){
                item.classList.remove('week_day_active')
            }
        })
        week_days[date].classList.add('week_day_active')
    }

    function removeCalendar(){
        let days = document.querySelectorAll('.day');
        days.forEach((item) => {
            item.remove();
        })
    }

    function createCalendarDay(indexMonth, param){            /////////create calendar for day
        let div = document.createElement('div');                /////////////////////////create empty cells for the month 
        monthDays[indexMonth].appendChild(div);
        div.classList.add('day');           
        if(param){
            div.classList.add('day_active');
        }
        
    }


    function createCurrentMonth(dWeek, daysMonth, indexMonth){       /////////////////// fill cells-days of the month
        let days = monthDays[indexMonth].querySelectorAll('.day');
        let k = dWeek;
        for(let i = 1; i <= daysMonth; i++){
            days[k].innerHTML = i;
            k++;
        }
    }

    function createMonthElements(month, year) {            
        let daysInMonth = new Date(year, month+1, 0).getDate();          ///find the number of days in a month
        let dayOfWeek = new Date(year, month, 1).getDay();                 ///which day of the week
        for(let i = 0; i < daysInMonth + dayOfWeek; i++){
            createCalendarDay(month);
        }
        createCurrentMonth(dayOfWeek, daysInMonth, month);
        
    }


    function createCalendarForYear(){                   
        months.forEach((item) => {                           ///remove all active months and days of the week
            item.classList.remove('month_active');
            item.style.display = 'block';
        })
        week_days.forEach((item) => {                                
            item.classList.remove('week_day_active');
        })
        for (let i = 0; i < MONTHS; i++){
            createMonthElements(i, curryear);                 
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    function createCalendarForMonth (month, curryear){              ////////create month-calendar
        months.forEach((item) => {                              
            item.classList.add('month_active');              //////////////remove all active months and days of the week
            item.style.display = 'none';                     ///  hiding all months 
        })
        week_days.forEach((item) => {
            item.classList.remove('week_day_active');
        })

        months[month].style.display = 'block';                     ///////show current month
        createMonthElements(month, curryear);
    }

    /////////////////////////////////////////////////////////


    function createCalendarForDay(month, day){                      ///create calendar for one day
        months.forEach((item) => {
            item.classList.add('month_active');                      
            item.style.display = 'none';
        })
        months[month].style.display = 'block';
        createCalendarDay(month, true);
        let calDay = document.querySelector('.day');
        calDay.innerHTML = day;
        
        showWeekDayForCalendarDay();
    }


    ///////////////////////////////////////////////////////////////////////
    function prevForYear (){
        year.innerHTML = --curryear;
        removeCalendar();
        createCalendarForYear();
    }

    function nextForYear (){
        year.innerHTML = ++curryear;
        removeCalendar();
        createCalendarForYear();
    }

    function prevForMonth (){
        removeCalendar();
        year.innerHTML = (currmonth === 0) ? --curryear : curryear;
        currmonth = (currmonth === 0) ? 11 : --currmonth;
        createCalendarForMonth(currmonth, curryear);
    }

    function nextForMonth (){
        removeCalendar();
        year.innerHTML = (currmonth === 11) ? ++curryear : curryear;
        currmonth = (currmonth === 11) ? 0 : ++currmonth;
        createCalendarForMonth(currmonth, curryear);
    }

    function nextForDay (){
        removeCalendar();
        let daysInMonth = new Date(curryear, currmonth+1, 0).getDate();
        year.innerHTML = (currday === daysInMonth && currmonth === 11) ? ++curryear : curryear;
        currmonth = (currday === daysInMonth) ? ++currmonth : currmonth;
        currmonth = (currmonth === 12) ? 0 : currmonth;
        currday = (currday === daysInMonth) ? 1 : ++currday;
        createCalendarForDay(currmonth, currday);
    }

    function prevForDay (){
        removeCalendar();
        year.innerHTML = (currday === 1 && currmonth === 0) ? --curryear : curryear;
        currmonth = (currday === 1) ? --currmonth : currmonth;
        currmonth = (currmonth === -1) ? 11 : currmonth;
        let daysInMonth = new Date(curryear, currmonth+1, 0).getDate();
        currday = (currday === 1) ? daysInMonth : --currday;
        createCalendarForDay(currmonth, currday);
    }

    

    ////////////////////////////////////////////////switch buttons for year or months or days
    dayBtn.addEventListener('click', () => {
        prev.removeEventListener("click", prevForMonth);
        next.removeEventListener("click", nextForMonth);
        prev.removeEventListener("click", prevForYear);
        next.removeEventListener("click", nextForYear);
        removeCalendar();
        createCalendarForDay(currmonth, currday);
        prev.addEventListener("click", prevForDay);
        next.addEventListener("click", nextForDay);
    });
    monthBtn.addEventListener("click", () => {
        prev.removeEventListener("click", nextForDay);
        next.removeEventListener("click", nextForDay);
        prev.removeEventListener("click", prevForYear);
        next.removeEventListener("click", nextForYear);
        removeCalendar();
        createCalendarForMonth(currmonth, curryear);
        prev.addEventListener("click", prevForMonth);
        next.addEventListener("click", nextForMonth);
    })
        
    yearBtn.addEventListener("click", () => {
        prev.removeEventListener("click", nextForDay);
        next.removeEventListener("click", nextForDay);
        prev.removeEventListener("click", prevForMonth);
        next.removeEventListener("click", nextForMonth);
        removeCalendar();
        createCalendarForYear();
        prev.addEventListener("click", prevForYear);
        next.addEventListener("click", nextForYear);
    })    
            


    ///////switch tabs for day or month or year
    let selectedBtn = document.querySelector('.calendar_btn_active');
    calendarWrapperBtn.addEventListener('click', (event) => {
        let target = event.target;
        if(target.closest('button')){
            highlightBtn(target.closest('button'))
        }
    })

    function highlightBtn(button){
        if(selectedBtn){
            selectedBtn.classList.remove('calendar_btn_active')
        }
        selectedBtn = button;
        selectedBtn.classList.add('calendar_btn_active');
    }
    //////////////open calendar
    newDay.addEventListener('click', () => {
        overlay.style.display = 'block';
    });
    calendarClose.addEventListener('click', () => {
        overlay.style.display = 'none'
    })

    //////////////add date 
    monthList.addEventListener("click", (event) => {
        let target = event.target;
        if ((target.closest('.day'))&&(target.innerHTML != "")){
            let day = target.innerHTML;
            let month = target.closest('.month');
            let headerMonth = month.querySelector('.month_header').innerHTML;
            toDoDay.innerHTML = day +" "+ headerMonth +" "+ curryear;
            setTimeout(() => {
                overlay.style.display = 'none';
            },200)
        }
    })

    showTodayDate();
    createCalendarForYear();

    prev.addEventListener("click", prevForYear);     
    next.addEventListener("click", nextForYear);
}







