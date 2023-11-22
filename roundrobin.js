let processArray = [];

let btn = document.querySelector("button");
btn.addEventListener("click", roundRobin);

function roundRobin() {
  let timeQuantum = parseInt(prompt("Enter the time quantum:"), 10);

  if (isNaN(timeQuantum) || timeQuantum <= 0) {
    alert("Please enter a valid time quantum.");
    return;
  }

  let completedList = [];
  let time = 0;
  let queue = [];

  let numberOfProcesses = parseInt(prompt("How many Processes do you have?"));

  if (isNaN(numberOfProcesses) || numberOfProcesses <= 0) {
    alert("Please enter a valid number of processes greater than 0.");
    return;
  }

  for (let i = 1; i <= numberOfProcesses; i++) {
    let arrivalTime =
      parseFloat(prompt(`Enter the arrivalTime for P${i}:`)) || 0;
    let burstTime = parseFloat(prompt(`Enter the burstTime for P${i}:`)) || 0;

    let theProcess = {
      name: `P${i}`,
      arrivalTime: arrivalTime,
      burstTime: burstTime,
      completedTime: 0,
      turnAroundTime: 0,
      waitingTime: 0,
    };
    processArray.push(theProcess);
  }

  function addToQueue() {
    for (var i = 0; i < processArray.length; i++) {
      if (processArray[i].arrivalTime === time) {
        var process = {
          name: processArray[i].name,
          arrivalTime: processArray[i].arrivalTime,
          burstTime: processArray[i].burstTime,
        };
        processArray.splice(i, 1);
        queue.push(process);
      }
    }
  }

  function selectProcessForRR() {
    if (queue.length != 0) {
      queue.sort(function (a, b) {
        if (a.burstTime > b.burstTime) {
          return 1;
        } else {
          return -1;
        }
      });

      if (queue[0].burstTime < timeQuantum) {
        process = queue.shift();
        process.completedTime = time + process.burstTime;

        for (var index = 0; index < process.burstTime; index++) {
          time++;
          addToQueue();
        }
        completedList.push(process);
      } else if (queue[0].burstTime == timeQuantum) {
        process = queue.shift();
        process.completedTime = time + timeQuantum;
        completedList.push(process);

        for (var index = 0; index < timeQuantum; index++) {
          time++;
          addToQueue();
        }
      } else if (queue[0].burstTime > timeQuantum) {
        process = queue[0];
        queue[0].burstTime = process.burstTime - timeQuantum;

        for (var index = 0; index < timeQuantum; index++) {
          time++;
          addToQueue();
        }
      }
    }
  }

  while (processArray.length > 0 || queue.length > 0) {
    addToQueue();
    while (queue.length === 0) {
      time++;
      addToQueue();
    }
    selectProcessForRR();
  }

  var totalTurnaroundTime = completedList.reduce(
    (sum, process) => sum + process.completedTime - process.arrivalTime,
    0
  );
  var totalWaitingTime = completedList.reduce(
    (sum, process) =>
      sum + process.completedTime - process.arrivalTime - process.burstTime,
    0
  );

  var avgTurnaroundTime = totalTurnaroundTime / completedList.length;
  var avgWaitingTime = totalWaitingTime / completedList.length;

  document.getElementById("avgTat").innerText = `AAT = ${avgTurnaroundTime}`;
  document.getElementById("avgWt").innerText = `AWT = ${avgWaitingTime}`;

  const processNumbers = document.getElementById("processNum");
  processNumbers.innerHTML = `you have ${numberOfProcesses} processes`;
  let processNamesElement = document.getElementById("processNames");
  let arrivalTimesElement = document.getElementById("arrivalTimes");
  let burstTimesElement = document.getElementById("burstTimes");
  let awtValuesElement = document.getElementById("awtValues");
  let aatValuesElement = document.getElementById("aatValues");

  let ctValuesElement = document.getElementById("ctValues");

  processNamesElement.innerHTML = completedList
    .map((process) => `<p>${process.name}</p>`)
    .join("");
  arrivalTimesElement.innerHTML = completedList
    .map((process) => `<p>${process.arrivalTime}</p>`)
    .join("");
  burstTimesElement.innerHTML = completedList
    .map((process) => `<p>${process.burstTime}</p>`)
    .join("");

  ctValuesElement.innerHTML = completedList
    .map((process) => `<p>${process.completedTime}</p>`)
    .join("");

  awtValuesElement.innerHTML = completedList
    .map(
      (process) =>
        `<p>${
          process.completedTime - process.arrivalTime - process.burstTime
        }</p>`
    )
    .join("");
  aatValuesElement.innerHTML = completedList
    .map((process) => `<p>${process.completedTime - process.arrivalTime}</p>`)
    .join("");
}
