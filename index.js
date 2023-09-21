// Your code here
function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeeInfo) {
    const employeeRecords = [];
    for (let i = 0; i < employeeInfo.length; i++) {
        employeeRecords.push(createEmployeeRecord(employeeInfo[i]));
    }
    return employeeRecords;
}

function createTimeInEvent(employeeRecord, timeStamp) {
    const timeInEvent = {
        type: "TimeIn",
        hour: Number.parseInt(timeStamp.slice(timeStamp.lastIndexOf(" ") + 1)),
        date: timeStamp.slice(0, timeStamp.lastIndexOf(" "))
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeStamp) {
    const timeOutEvent = {
        type: "TimeOut",
        hour: Number.parseInt(timeStamp.slice(timeStamp.lastIndexOf(" ") + 1)),
        date: timeStamp.slice(0, timeStamp.lastIndexOf(" "))
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    let hours = 0;
        for (let i = 0; i < employeeRecord.timeInEvents.length; i++) {
            if (employeeRecord.timeInEvents[i].date === date) {
                try {
                    const startTime = employeeRecord.timeInEvents[i].hour;
                    const endTime = employeeRecord.timeOutEvents[i].hour;
                    hours = Number.parseInt((endTime - startTime) / 100);
                } catch (error) {
                    console.error(`Employee, ${employeeRecord.firstName} ${employeeRecord.familyName}, hasn't punched out yet.`);
                } finally {
                    return hours;
                }
            }
        }
    return hours;
}

function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
    let totalPay = 0;
    for (const timeIn of employeeRecord.timeInEvents) {
        totalPay += wagesEarnedOnDate(employeeRecord, timeIn.date);
    }
    return totalPay;
}

function calculatePayroll(employeeRecords) {
    let payRoll = 0;
    for (const employeeRecord of employeeRecords) {
        payRoll += allWagesFor(employeeRecord);
    }
    return payRoll;
}