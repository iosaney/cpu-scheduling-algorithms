let btn = document.querySelector("button");
btn.addEventListener("click", calculate);

function calculate() {
  let numberOfProcesses = prompt("How many Processes do you have?");
  let processArray = [];
  let process = 0;
  if (numberOfProcesses) {
    numberOfProcesses = parseInt(numberOfProcesses, 10);

    if (!isNaN(numberOfProcesses) && numberOfProcesses > 0) {
      for (let i = 1; i <= numberOfProcesses; i++) {
        process = `P${i}`;
        let arrivalTime = prompt(`Enter the arrivalTime for ${process}:`);

        if (arrivalTime.trim() === "" || isNaN(parseFloat(arrivalTime))) {
          alert(
            "arrivalTime must be a valid number. Please enter a valid arrivalTime."
          );
          i--;
          continue;
        }
        let burstTime = prompt(`Enter the burstTime for ${process}:`);

        if (burstTime.trim() === "" || isNaN(parseFloat(burstTime))) {
          alert(
            "burstTime must be a valid number. Please enter a valid burstTime."
          );
          i--;
          continue;
        }
        processArray.push({
          name: process,
          arrivalTime: parseFloat(arrivalTime),
          burstTime: parseFloat(burstTime),
        });
      }

      console.log(processArray);
    } else {
      alert("Please enter a valid number of process greater than 0.");
    }
  } else {
    alert("Number of process is required.");
  }

  let totalWaitingTime = 0;
  if (processArray.length > 0) {
    let totalTurnaroundTime = 0;

    // Assuming that processArray is sorted by arrival time, you may need to sort it.
    processArray.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = processArray[0].arrivalTime;

    for (let i = 0; i < processArray.length; i++) {
      const process = processArray[i];

      if (currentTime < process.arrivalTime) {
        currentTime = process.arrivalTime;
      }

      const waitingTime = currentTime - process.arrivalTime;
      const turnaroundTime = waitingTime + process.burstTime;

      totalWaitingTime += waitingTime;
      totalTurnaroundTime += turnaroundTime;

      currentTime += process.burstTime;

      // waitingTime property to the process object
      process.waitingTime = waitingTime;
    }

    const averageWaitingTime = totalWaitingTime / processArray.length;
    const averageTurnaroundTime = totalTurnaroundTime / processArray.length;

    console.log(`Average Waiting Time: ${averageWaitingTime}`);
    console.log(`Average Turnaround Time: ${averageTurnaroundTime}`);

    const avgWt = document.getElementById("avgWt");
    avgWt.innerHTML = `AWT = ${averageWaitingTime}`;
    const avgTat = document.getElementById("avgTat");
    avgTat.innerHTML = `AAT = ${averageTurnaroundTime}`;
  }

  // Now each object in processArray has a waitingTime property
  console.log(processArray);

  // inner HTML
  const processNumbers = document.getElementById("processNum");
  processNumbers.innerHTML = `you have ${numberOfProcesses} processes`;
  const processNamesElement = document.getElementById("processNames");
  const arrivalTimesElement = document.getElementById("arrivalTimes");
  const burstTimesElement = document.getElementById("burstTimes");
  const awtValuesElement = document.getElementById("awtValues");
  const aatValuesElement = document.getElementById("aatValues");

  // HTML content based on your processArray
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

  // Update the content of the DOM elements
  processNamesElement.innerHTML = processNamesContent;
  arrivalTimesElement.innerHTML = arrivalTimesContent;
  burstTimesElement.innerHTML = burstTimesContent;
  awtValuesElement.innerHTML = awtValuesContent;
  aatValuesElement.innerHTML = aatValuesContent;
}

// SJF
let sjfBtn = document.querySelector(".buttonSjf");
sjfBtn.addEventListener("click", calculateSjf);

function calculateSjf() {
  let numberOfProcesses = prompt("How many Processes do you have?");
  let processArray = [];
  let process = 0;

  if (numberOfProcesses) {
    numberOfProcesses = parseInt(numberOfProcesses, 10);

    if (!isNaN(numberOfProcesses) && numberOfProcesses > 0) {
      for (let i = 1; i <= numberOfProcesses; i++) {
        process = `P${i}`;
        let arrivalTime = prompt(`Enter the arrivalTime for ${process}:`);

        if (arrivalTime.trim() === "" || isNaN(parseFloat(arrivalTime))) {
          alert(
            "arrivalTime must be a valid number. Please enter a valid arrivalTime."
          );
          i--;
          continue;
        }

        let burstTime = prompt(`Enter the burstTime for ${process}:`);

        if (burstTime.trim() === "" || isNaN(parseFloat(burstTime))) {
          alert(
            "burstTime must be a valid number. Please enter a valid burstTime."
          );
          i--;
          continue;
        }

        processArray.push({
          name: process,
          arrivalTime: parseFloat(arrivalTime),
          burstTime: parseFloat(burstTime),
        });
      }

      console.log(processArray);
    } else {
      alert("Please enter a valid number of process greater than 0.");
    }
  } else {
    alert("Number of process is required.");
  }

  let totalWaitingTime = 0;

  if (processArray.length > 0) {
    let totalTurnaroundTime = 0;

    // Sort processes by burst time (SJF)
    processArray.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = processArray[0].arrivalTime;

    for (let i = 0; i < processArray.length; i++) {
      const process = processArray[i];

      if (currentTime < process.arrivalTime) {
        currentTime = process.arrivalTime;
      }

      const waitingTime = currentTime - process.arrivalTime;
      const turnaroundTime = waitingTime + process.burstTime;

      totalWaitingTime += waitingTime;
      totalTurnaroundTime += turnaroundTime;

      currentTime += process.burstTime;

      // Add waitingTime and turnaroundTime properties to the process object
      process.waitingTime = waitingTime;
      process.turnaroundTime = turnaroundTime;
    }

    const averageWaitingTime = totalWaitingTime / processArray.length;
    const averageTurnaroundTime = totalTurnaroundTime / processArray.length;

    console.log(`Average Waiting Time: ${averageWaitingTime}`);
    console.log(`Average Turnaround Time: ${averageTurnaroundTime}`);

    const avgWt = document.getElementById("avgWt");
    avgWt.innerHTML = `AWT = ${averageWaitingTime}`;
    const avgTat = document.getElementById("avgTat");
    avgTat.innerHTML = `AAT = ${averageTurnaroundTime}`;
  }

  // Now each object in processArray has waitingTime and turnaroundTime properties
  console.log(processArray);

  // inner HTML
  const processNumbers = document.getElementById("processNum");
  processNumbers.innerHTML = `you have ${numberOfProcesses} processes`;
  const processNamesElement = document.getElementById("processNames");
  const arrivalTimesElement = document.getElementById("arrivalTimes");
  const burstTimesElement = document.getElementById("burstTimes");
  const awtValuesElement = document.getElementById("awtValues");
  const aatValuesElement = document.getElementById("aatValues");

  // HTML content based on your processArray
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

  // Update the content of the DOM elements
  processNamesElement.innerHTML = processNamesContent;
  arrivalTimesElement.innerHTML = arrivalTimesContent;
  burstTimesElement.innerHTML = burstTimesContent;
  awtValuesElement.innerHTML = awtValuesContent;
  aatValuesElement.innerHTML = aatValuesContent;
}
