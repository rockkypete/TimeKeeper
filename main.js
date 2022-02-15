//variables for clock faces in DOM
let pomodoroClockFace = document.querySelector('.display-time');
let startButton = document.querySelector('.start');

//variables for clock settings
let period = 0;
let pomodoroMinutes = 20;
let breakMinutes = 5;
let tMinus = 6;

//break counter
let alertMe = function(){
    setInterval(()=>{
        tMinus -= 1;
        if(tMinus >= 0){
            document.getElementById('break-alert').innerHTML = `Your 5 Minutes Short break starts in ${tMinus} `;
        }
    },1000);
} 


//clock object constructor
class Clock {
    constructor(totalMinutes, state, timeInstance){
        this.totalMinutes = totalMinutes;
        this.totalSeconds = totalMinutes * 60;
        this.state = state;
        this.timeInstance = timeInstance;
    }
       
    formatTime(time){
        if(time < 10){
            return `0${time}`;
        }
        return time.toString();
    }

    displayMinutes(){
        const minutes = Math.floor(this.totalSeconds / 60);
        return this.formatTime(minutes);
    }

    displaySeconds(){
        const seconds = this.totalSeconds % 60;
        return this.formatTime(seconds);
    }

    timercheck(){
        
        if(this.totalSeconds === 0){
            this.stopTimer();
            this.resetTimer();
        }

        if(this.totalSeconds === 6 ){
            alertMe();
        }

        if(this.totalSeconds === 0 ){
            document.getElementById('break-alert').innerHTML = `Weldone! You can now take a break...`;
        }
    }

    startTimer(displayArea){
        //check state for start status
        if(this.state === 'isReady' || this.state === 'paused'){
            this.timeInstance = setInterval(()=>{
                this.totalSeconds -=1;
                displayArea.textContent = `${this.displayMinutes()} : ${this.displaySeconds()}`;
                this.timercheck();
                
            }, 1000)
            period += 1;
            displayPeriod(period);
        };
        
        // set state to running and update period counts
        this.state = 'isRunning';      
    }

    stopTimer(){
        //stop the countdown
        clearInterval(this.timeInstance);

        //enable the reset button
        this.state = 'paused';
    }

    resetTimer(displayArea){
        if(this.state === 'paused'){
            //reset the display time in the DOM
            this.totalSeconds = this.totalMinutes * 60;
            displayArea.textContent = `${this.displayMinutes()} : ${this.displaySeconds()}`;
            this.state = 'isReady';
        }
        
    }
    
}


//init pomodoro clock
let pomodoro = new Clock(pomodoroMinutes, 'isReady', null);
console.log(pomodoro.totalMinutes);

let breakTimer = new Clock(breakMinutes, 'isReady', null);

//display period function
let displayPeriod = function(session){
    //period counter in DOM
    document.querySelector('.period_counter').textContent = session;
}

//display initial period  out in DoM
displayPeriod(period);


//Display static pomodoro time to DOM
pomodoroClockFace.innerHTML = `${pomodoro.displayMinutes()} : ${pomodoro.displaySeconds()}`;



//start the timer
document.querySelector('.start').addEventListener('click', ()=>{
    pomodoro.startTimer(pomodoroClockFace);  
})


//stop timer
document.querySelector('.stop').addEventListener('click', ()=>{
    pomodoro.stopTimer();
})

//reset timer back to zero
document.querySelector('.reset').addEventListener('click', ()=>{
    if(pomodoro.state !== 'isRunning'){
        period = 0;
        displayPeriod(period);
    }    
    pomodoro.resetTimer(pomodoroClockFace);
})

