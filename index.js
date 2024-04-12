// Your code here
function createEmployeeRecord(argArray) {
    return {
    firstName:argArray[0],
    familyName: argArray[1],
    title: argArray[2],
    payPerHour: argArray[3],
    timeInEvents: [],
    timeOutEvents: []
    }
}

let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1])
console.log(testEmployee.firstName);
function createEmployeeRecords(arraysArg) {
    return arraysArg.map(obj => {
        return createEmployeeRecord(obj);
    })
}



function createTimeInEvent(employee, timeStamp) {
    let [date, hour] = timeStamp.split(" ");
    employee.timeInEvents.push({
        type: "TimeIn",
        hour,
        date,
    });
    return employee;
}
function createTimeOutEvent(employee, timeStamp) {
    let [date, hour] = timeStamp.split(" ");
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour,
        date,
    });
    return employee;
}

function hoursWorkedOnDate(employeeObj, date) {
    let dateTimeIn = employeeObj.timeInEvents.find(event => event.date === date);
    let dateTimeOut = employeeObj.timeOutEvents.find(event => event.date === date);

    if(dateTimeIn && dateTimeOut){
        let timeIn = parseInt(dateTimeIn.hour.split(":")[0]) * 60 + parseInt(dateTimeIn.hour.split(":")[1]);
        let timeOut = parseInt(dateTimeOut.hour.split(":")[0]) * 60 + parseInt(dateTimeOut.hour.split(":")[1]);

        let hrsWorked = (timeOut - timeIn) / 60;
        return hrsWorked
    }
}
function wagesEarnedOnDate(employeeObj, date) {
    let payRate = employeeObj.payPerHour;
    let pay = hoursWorkedOnDate(employeeObj, date) * payRate;
    return pay;
}

function allWagesFor(employee){
    let eligibleDates = employee.timeInEvents.map((event) => {
        return event.date;
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}
function  calculatePayroll(employeeRecords){
    return employeeRecords.reduce((acc, employee) => {
        return acc + allWagesFor(employee)
    }, 0)
}