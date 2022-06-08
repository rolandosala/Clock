"use strict";

//tab function for hiding and displaying active item
function openClock(event, clockName){

    let clockContent = document.getElementsByClassName('clockSlide');
    for(let i = 0; i < clockContent.length; i++){
        clockContent[i].style.display = 'none';
    }

    let clockLinks = document.getElementsByClassName('clockLinks');
    for(let i = 0; i < clockLinks.length; i++){
        clockLinks[i].className = clockLinks[i].className.replace(' active', '');
    }
    document.getElementById(clockName).style.display = 'block';
    event.currentTarget.className += ' active';
}
//clock function for showing active time

function clock(){
    const timeNow = new Date();
    let hour = timeNow.getHours();
    let minute = timeNow.getMinutes();
    let second = timeNow.getSeconds();
    var timetype = '';
    if(minute <= 9){
        minute = '0' + minute;
    }
    if(hour == 12){
        hour = 12;
        timetype = 'PM'
    }
    else{
        if(hour >= 13 || hour == 23){
            timetype = 'PM'
        }
        else{
            timetype = 'AM';
        }
        hour = (hour % 12);
    }
    if(hour <= 9){
        hour = '0' + hour;
    }
    second <= 9 ? second = '0' + second : second;
    document.getElementById('main-clock').innerHTML = hour + ':' + minute + ':' + second + ' ' + timetype;
    document.getElementById('alarmset').value = hour + ':' + minute + ' ' + timetype;
}
setInterval(clock, 1000);

//function for countdown timer
var resetCount;
function countdown(){
    let hour = document.getElementById('hour');
    let minute = document.getElementById('minute');
    let second = document.getElementById('second');
    if(second.value != 0){
        second.value--;
    }
    else if(minute.value != 0 && second.value == 0){
        second.value = 59;
        minute.value--;
    }
    else if(hour.value != 0 && minute.value == 0){
        minute.value = 60;
        hour.value--;
    }
    hour.value <= 9 ? hour.value = '0' + hour.value-- : hour.value;
    minute.value <= 9 ? minute.value = '0' + minute.value-- : minute.value;
    second.value <= 9 ? second.value = '0' + second.value-- : second.value;
    return false;
}
//invoke countdown into button start event

let btnStart = document.getElementById('start');
btnStart.addEventListener('click',function(){
    if(document.getElementById('hour').value != '' || document.getElementById('minute').value != '' || document.getElementById('second').value != ''){
        console.log(countdown());
        clearInterval(resetCount);
        resetCount =  setInterval(countdown, 1000);
    }
   return false; 
   
});

//pause function
let btnPause = document.getElementById('pause');
btnPause.addEventListener('click',function(){
    clearInterval(resetCount);
});

//reset function
let btnReset = document.getElementById('reset');
btnReset.addEventListener('click',function(){
    clearInterval(resetCount);
   
    hour.value = '';
    minute.value = '';
    second.value = '';
    console.log(second.value);

});


//function on starting stopwatch
let interval;
let record = [];
let millisecond = 0;
let stopwatch_second = 0;
let stopwatch_minute = 0;
let milliElement = document.getElementById('millisecond');
let secondElement = document.getElementById('stopwatch_second');
let minuteElement = document.getElementById('minuteElement');
function stopwatchClock(){
    millisecond++;

    if(millisecond > 99 ){
        stopwatch_second++;
        millisecond = '0'+ 0;
        milliElement.innerHTML = millisecond;
    }
    if(stopwatch_second <= 9){
        secondElement.innerHTML = '0' + stopwatch_second;
    }
    else if(stopwatch_second == 60){
        stopwatch_minute++;
        stopwatch_second = 0;
        minuteElement.innerHTML = stopwatch_minute;
    }
    else{
        secondElement.innerHTML = stopwatch_second;
    }
    stopwatch_minute <= 9 ? minuteElement.innerHTML = '0' + stopwatch_minute : minuteElement.innerHTML = stopwatch_minute;
    millisecond <= 9 ? millisecond = '0' + millisecond : milliElement.innerHTML = millisecond;
    

}
document.getElementById('stopwatch-start').onclick = function(){
    clearInterval(interval);
    interval = setInterval(stopwatchClock, 10);
};
document.getElementById('stopwatch-stop').onclick = function(){
    clearInterval(interval);
};
document.getElementById('stopwatch-record').onclick = function(){
    var sec;
    if(millisecond !== 0){
        stopwatch_second <= 9 ?  sec  = '0' + stopwatch_second : sec = stopwatch_second;
        let r = stopwatch_minute + ':' + sec + ':' + millisecond;
        
        record.push(r);
        for(let i = 0; i < record.length; i++){
            record[i];
        }
        var li = document.createElement('li');
        li.className = 'listitem';
        var listvalue = record.pop();
        var listRecord = document.getElementById('list-record');
        var txt = document.createTextNode(listvalue);
        li.appendChild(txt);
        listRecord.appendChild(li);
    }
    return false;
    
};
document.getElementById('stopwatch-reset').onclick = function(){
    clearInterval(interval);
    record = [];
    stopwatch_minute = 0;
    stopwatch_second =  0;
    millisecond = 0;
    minuteElement.innerHTML = '0' + stopwatch_minute;
    secondElement.innerHTML = '0' + stopwatch_second;
    milliElement.innerHTML = '0' + millisecond;
    document.getElementById('list-record').innerHTML = '';
    var li = document.createElement('li');
    li.className = 'listitem';
    document.getElementById('list-record').appendChild(li);
};

//function loading numbers to select element
function loadclock(){
    let hourArray = [];
    let minuteArray = [];
    for(let i = 1; i <= 12; i++){
        if(i <= 9){
            i = '0' + i;
        }
        hourArray.push(`<option value="${i}">${i}</option>`);
    }
    document.getElementById('alarmhour').innerHTML = hourArray.join('');
    for(let i = 0; i <= 60; i++){
        if(i <= 9){
            i = '0' + i;
        }
        minuteArray.push(`<option value="${i}">${i}</option>`);
    }
    document.getElementById('alarmminute').innerHTML = minuteArray.join(''); 
}
loadclock();

//**function firing alarm when meet exact time

document.getElementById('btnAdd-alarm').onclick = function(){
    document.getElementById('alarm-modal').style.display = 'flex';
}
document.getElementById('btnCancel').onclick = function(){
    document.getElementById('alarm-modal').style.display = 'none';
}
var alarmArray = [];
document.getElementById('btnSet').onclick = function(){
    document.getElementById('alarm-modal').style.display = 'none';
   
   let alarmHour =  document.getElementById('alarmhour').value;
   let alarmMinute =  document.getElementById('alarmminute').value;
   let alarmType =  document.getElementById('alarmtype').value;
   let alarmTime = alarmHour + ':' + alarmMinute + ' ' + alarmType;
   alarmArray.push(alarmTime);
   
   var li = document.createElement('li');
   var span = document.createElement('span');
   var i = document.createElement('i');
   var txt = document.createTextNode(alarmTime);
   var ul = document.getElementById('alarm-list');
   li.className = 'listitem';
   span.className = 'remove';
   i.className = 'fas fa-trash';
   span.appendChild(i);
   li.appendChild(txt);
   li.appendChild(span);
   ul.appendChild(li);
   console.log(alarmArray);

   deleteItem();
   setInterval(alarmClock, 1000);
}

function alarmClock(){

   let TimeActive = document.getElementById('alarmset');
   console.log(alarmArray);

    if(alarmArray.includes(TimeActive.value)){
        let audio = new Audio();
        audio.src = "alarm.mp3";
        audio.play();
        document.getElementById('alarmset').style.color = 'red';
    }
    else{
        document.getElementById('alarmset').style.color = 'blue';
        audio.pause();
    }
}


//create a delete function
var close = document.getElementsByClassName('remove');
function deleteItem(){
    for(let i = 0; i < close.length; i++){
        close[i].onclick = function(){
            var x = this.parentElement;
            x.style.display = 'none';
            console.log(`list index ${i}`);
            console.log(`array index ${alarmArray.indexOf(alarmArray[i])}`);
            /* console.log(r.indexOf(r[i]));
            console.log(r); */
            if(alarmArray.indexOf(alarmArray[i]) == i){
                delete alarmArray[i];
                console.log(alarmArray);
            }
            return false
        }
    }
    

}
