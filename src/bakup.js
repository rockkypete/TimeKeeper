let shortbreakMinutes = 5;
let longbreakMinutes = 10;

const breaks = [ {name: 'short break', minutes: `${shortbreakMinutes} minutes`}, {name: 'long break', minutes: `${longbreakMinutes} minutes`} ];


//function to count down to brek time
let counter = setInterval(() =>{
    let arr = [5, 4, 3, 2, 1];
    arr.forEach(sec => {
        return sec;
    });
}, 1000)

//function to display breaks to DOM
let breakDisplay = function(bClock, breakType, pClock){
    //output the static break time to the DOM
    breakClockFace.textContent = `${bClock.displayMinutes()} : ${bClock.displaySeconds()}`;

    bClock.startTimer(breakClockFace);
    //break info update
    if(bclock.totalSeconds === (breakType.minutes*60)){
        breakText.textContent = `You are now on a ${breakType.minutes} ${breakType.name}!`;
    }else if(bclock.totalSeconds === 5){
        breakText.textContent = `Your ${breakType.minutes} ${breakType.name} ends in ${counter}`;

    }else if(bclock.totalSeconds === 0){
        breakDiv.innerHTML = '<div></div><div>Click <strong>start</strong> begin a session</div>. ';
        //update period
        if(period < 4){
            period ++;
        }else if(period === 4){
            period = 0;
        }
        pClock.startTimer(pomodoroClockFace);
        bClock.stopTimer();
    }
}
//break  timer instances
//let shortBreak = new Clock(shortbreakMinutes, 'isReady', null);
//let longBreak = new Clock(longbreakMinutes, 'isReady', null);


//sb start button
document.querySelector('.sbStart').addEventListener('click', ()=>{
    shortBreak.startTimer(breakClockFace);    
})


//pomodoro tab
document.querySelector('.pClock').addEventListener('click', ()=>{
    pomodoroClockFace.textContent = `${pomodoro.displayMinutes()} : ${pomodoro.displaySeconds()}`;
    //change the class name of the start button
    //startButton.addClassList('class', 'start');


})



//short break tab
document.querySelector('.sbClock').addEventListener('click', ()=>{
    pomodoroClockFace.textContent = `${shortBreak.displayMinutes()} : ${shortBreak.displaySeconds()}`;
    //change the class name of the start button
    //startButton.style('class', 'sbStart');
})

//long break tab
document.querySelector('.lbClock').addEventListener('click', ()=>{
    pomodoroClockFace.textContent = `${longBreak.displayMinutes()} : ${longBreak.displaySeconds()}`;
    //change the class name of the start button
    startButton.style('class', 'lbStart');

})



/*time settings form handler
const form = document.querySelector('.clockSettingsForm');
form.addEventListener('submit', (e)=>{
    //prevent the form default behaviour
    e.preventDefault();

    //assign the various form field values to their respective variables
    //period = document.querySelector('.period').value;
    periodLength = document.querySelector('.period_length').value;
    pomodoro = document.querySelector('.pomodoro_minutes').value;
    shortbreakMinutes = document.querySelector('.short_minutes').value;
    longbreakMinutes = document.querySelector('.long_minutes').value;

})
*/


