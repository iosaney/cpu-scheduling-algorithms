let btn = document.querySelector("button");
btn.addEventListener("click", calculate);

function calculate() {
  let numberOfProcesses = prompt("How many Processes do you have?");
  let numberOfProcessors = prompt("How many Processors do you have?");
  let processArray = [];

  // Capture process details
  for (let i = 0; i < numberOfProcesses; i++) {
    let process = `P${i + 1}`;
    let arrivalTime = prompt(`Enter the arrivalTime for ${process}:`);
    let burstTime = prompt(`Enter the burstTime for ${process}:`);

    processArray.push({
      name: process,
      arrivalTime: parseFloat(arrivalTime),
      burstTime: parseFloat(burstTime),
      waitingTime: 0,
      turnaroundTime: 0,
    });
  }

  if (processArray.length > 0 && numberOfProcessors) {
    numberOfProcessors = parseInt(numberOfProcessors, 10);

    // Create an array of queues, one for each processor
    let processorQueues = Array.from({ length: numberOfProcessors }, () => []);

    // Distribute processes among processor queues using Round Robin scheduling
    let currentProcessor = 0;
    for (let i = 0; i < processArray.length; i++) {
      processorQueues[currentProcessor].push(processArray[i]);
      currentProcessor = (currentProcessor + 1) % numberOfProcessors;
    }

    // Process each processor queue separately
    let totalWaitingTime = 0;
    let totalTurnaroundTime = 0;

    for (let i = 0; i < numberOfProcessors; i++) {
      let currentTime = 0;

      processorQueues[i].forEach((process) => {
        if (currentTime < process.arrivalTime) {
          currentTime = process.arrivalTime;
        }

        const waitingTime = currentTime - process.arrivalTime;
        const turnaroundTime = waitingTime + process.burstTime;

        totalWaitingTime += waitingTime;
        totalTurnaroundTime += turnaroundTime;

        currentTime += process.burstTime;

        process.waitingTime = waitingTime;
        process.turnaroundTime = turnaroundTime;
      });
    }

    const averageWaitingTime = totalWaitingTime / processArray.length;
    const averageTurnaroundTime = totalTurnaroundTime / processArray.length;

    const avgWt = document.getElementById("avgWt");
    avgWt.innerHTML = `AWT = ${averageWaitingTime}`;
    const avgTat = document.getElementById("avgTat");
    avgTat.innerHTML = `AAT = ${averageTurnaroundTime}`;

    // Update DOM elements with process details
    const processNumbers = document.getElementById("processNum");
    processNumbers.innerHTML = `You have ${numberOfProcesses} processes`;
    const processNamesElement = document.getElementById("processNames");
    const arrivalTimesElement = document.getElementById("arrivalTimes");
    const burstTimesElement = document.getElementById("burstTimes");
    const awtValuesElement = document.getElementById("awtValues");
    const aatValuesElement = document.getElementById("aatValues");

    let processNamesContent = "";
    let arrivalTimesContent = "";
    let burstTimesContent = "";
    let awtValuesContent = "";
    let aatValuesContent = "";

    processArray.forEach((process) => {
      processNamesContent += `<p>${process.name}</p>`;
      arrivalTimesContent += `<p>${process.arrivalTime}</p>`;
      burstTimesContent += `<p>${process.burstTime}</p>`;
      awtValuesContent += `<p>${process.waitingTime}</p>`;
      aatValuesContent += `<p>${process.turnaroundTime}</p>`;
    });

    processNamesElement.innerHTML = processNamesContent;
    arrivalTimesElement.innerHTML = arrivalTimesContent;
    burstTimesElement.innerHTML = burstTimesContent;
    awtValuesElement.innerHTML = awtValuesContent;
    aatValuesElement.innerHTML = aatValuesContent;
  }
}
