let processArray = [];

let btn = document.querySelector("button");
btn.addEventListener("click", calculateSjf);



function addToQueue(time, queue) {
  processArray = processArray.filter((process) => {
    if (process.arrivalTime <= time) {
      queue.push(process);
      return false; // Remove added process from processArray
    }
    return true;
  });
}

function calculateSjf() {
  let numberOfProcesses =
    parseInt(prompt("How many Processes do you have?")) || 0;

  if (numberOfProcesses > 0) {
    for (let i = 1; i <= numberOfProcesses; i++) {
      let arrivalTime =
        parseFloat(prompt(`Enter the arrivalTime for P${i}:`)) || 0;
      let burstTime = parseFloat(prompt(`Enter the burstTime for P${i}:`)) || 0;

      processArray.push({
        name: `P${i}`,
        arrivalTime: arrivalTime,
        burstTime: burstTime,
        completedTime: 0,
        turnAroundTime: 0,
        waitingTime: 0,
      });
    }

    let completedList = [];
    let time = 0;
    let queue = [];

    while (processArray.length > 0 || queue.length > 0) {
      addToQueue(time, queue);

      if (queue.length === 0) {
        time++;
        continue;
      }

      queue.sort((a, b) => a.burstTime - b.burstTime);
      let processToRun = queue.shift();

      for (let i = 0; i < processToRun.burstTime; i++) {
        time++;
        addToQueue(time, queue);
      }

      processToRun.completedTime = time;
      processToRun.turnAroundTime =
        processToRun.completedTime - processToRun.arrivalTime;
      processToRun.waitingTime =
        processToRun.turnAroundTime - processToRun.burstTime;
      completedList.push(processToRun);
    }

    // Calculate averages
    let avgTurnaroundTime =
      completedList.reduce((sum, process) => sum + process.turnAroundTime, 0) /
      completedList.length;
    let avgWaitingTime =
      completedList.reduce((sum, process) => sum + process.waitingTime, 0) /
      completedList.length;
    let maxCompletedTime = Math.max(
      ...completedList.map((process) => process.completedTime)
    );
    let throughput = completedList.length / maxCompletedTime;

    // Update HTML content (assuming you have corresponding elements)
    document.getElementById("avgTat").innerText = `AAT = ${avgTurnaroundTime}`;
    document.getElementById("avgWt").innerText = `AWT = ${avgWaitingTime}`;

    // Update process details in the HTML (assuming you have corresponding elements)

    const processNumbers = document.getElementById("processNum");
    processNumbers.innerHTML = `you have ${numberOfProcesses} processes`;
    let processNamesElement = document.getElementById("processNames");
    let arrivalTimesElement = document.getElementById("arrivalTimes");
    let burstTimesElement = document.getElementById("burstTimes");
    let awtValuesElement = document.getElementById("awtValues");
    let aatValuesElement = document.getElementById("aatValues");

    processNamesElement.innerHTML = completedList
      .map((process) => `<p>${process.name}</p>`)
      .join("");
    arrivalTimesElement.innerHTML = completedList
      .map((process) => `<p>${process.arrivalTime}</p>`)
      .join("");
    burstTimesElement.innerHTML = completedList
      .map((process) => `<p>${process.burstTime}</p>`)
      .join("");
    awtValuesElement.innerHTML = completedList
      .map((process) => `<p>${process.waitingTime}</p>`)
      .join("");
    aatValuesElement.innerHTML = completedList
      .map((process) => `<p>${process.turnAroundTime}</p>`)
      .join("");
  } else {
    alert("Please enter a valid number of processes greater than 0.");
  }
}
