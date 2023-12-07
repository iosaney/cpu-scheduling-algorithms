let btn = document.querySelector("button");
btn.addEventListener("click", roundRobin);

class Process {
  constructor(pid, arrivalTime, burstTime) {
    this.pid = pid;
    this.arrivalTime = arrivalTime;
    this.burstTime = burstTime;
    this.startTime = 0;
    this.completionTime = 0;
    this.turnaroundTime = 0;
    this.waitingTime = 0;
    this.responseTime = 0;
  }
}

function compareArrivalTime(p1, p2) {
  return p1.arrivalTime - p2.arrivalTime;
}

function roundRobin() {
  const n = parseInt(prompt("Enter the number of processes:"));
  const timeQuantum = parseInt(prompt("Enter time quantum:"));

  const processes = [];
  const burstRemaining = new Array(n).fill(0);

  let totalTurnaroundTime = 0;
  let totalWaitingTime = 0;
  let totalResponseTime = 0;

  for (let i = 0; i < n; i++) {
    const arrivalTime = parseInt(
      prompt(`Enter arrival time of process ${i + 1}:`)
    );
    const burstTime = parseInt(prompt(`Enter burst time of process ${i + 1}:`));

    burstRemaining[i] = burstTime;
    processes.push(new Process(i + 1, arrivalTime, burstTime));
  }

  processes.sort(compareArrivalTime);

  let currentTime = 0;
  while (true) {
    let done = true;

    for (let i = 0; i < n; i++) {
      if (burstRemaining[i] > 0) {
        done = false;

        if (burstRemaining[i] > timeQuantum) {
          currentTime += timeQuantum;
          burstRemaining[i] -= timeQuantum;
        } else {
          currentTime += burstRemaining[i];
          processes[i].completionTime = currentTime;
          burstRemaining[i] = 0;
        }
      }
    }

    if (done) break;

    for (let i = 0; i < n; i++) {
      if (processes[i].arrivalTime <= currentTime && burstRemaining[i] > 0) {
        if (processes[i].startTime === 0) {
          processes[i].startTime = currentTime;
        }
      }
    }
  }

  for (let i = 0; i < n; i++) {
    processes[i].turnaroundTime =
      processes[i].completionTime - processes[i].arrivalTime;
    processes[i].waitingTime =
      processes[i].turnaroundTime - processes[i].burstTime;
    processes[i].responseTime =
      processes[i].startTime - processes[i].arrivalTime;

    totalTurnaroundTime += processes[i].turnaroundTime;
    totalWaitingTime += processes[i].waitingTime;
    totalResponseTime += processes[i].responseTime;
  }

  const avgTurnaroundTime = totalTurnaroundTime / n;
  const avgWaitingTime = totalWaitingTime / n;
  const avgResponseTime = totalResponseTime / n;

  processes.sort((a, b) => a.pid - b.pid);

  console.log("\n#P\tAT\tBT\tST\tCT\tTAT\tWT\tRT");

  for (let i = 0; i < n; i++) {
    const p = processes[i];
    console.log(
      `${p.pid}\t${p.arrivalTime}\t${p.burstTime}\t${p.startTime}\t${p.completionTime}\t${p.turnaroundTime}\t${p.waitingTime}\t${p.responseTime}`
    );
  }

  console.log(`Average Turnaround Time = ${avgTurnaroundTime}`);
  console.log(`Average Waiting Time = ${avgWaitingTime}`);
  console.log(`Average Response Time = ${avgResponseTime}`);

  document.getElementById("avgTat").innerHTML = `AAT = ${avgTurnaroundTime}`;
  document.getElementById("avgWt").innerHTML = `AWT = ${avgWaitingTime}`;

  const processNumbers = document.getElementById("processNum");
  processNumbers.innerHTML = `You have ${n} processes`;

  let processNamesElement = document.getElementById("processNames");
  let arrivalTimesElement = document.getElementById("arrivalTimes");
  let burstTimesElement = document.getElementById("burstTimes");
  let awtValuesElement = document.getElementById("awtValues");
  let aatValuesElement = document.getElementById("aatValues");

  // Generating HTML content for process details
  let processNamesHTML = "";
  let arrivalTimesHTML = "";
  let burstTimesHTML = "";
  let awtValuesHTML = "";
  let aatValuesHTML = "";

  for (let i = 0; i < n; i++) {
    processNamesHTML += `<p>${processes[i].pid}</p>`;
    arrivalTimesHTML += `<p>${processes[i].arrivalTime}</p>`;
    burstTimesHTML += `<p>${processes[i].burstTime}</p>`;
    awtValuesHTML += `<p>${processes[i].waitingTime}</p>`;
    aatValuesHTML += `<p>${processes[i].turnaroundTime}</p>`;
  }

  processNamesElement.innerHTML = processNamesHTML;
  arrivalTimesElement.innerHTML = arrivalTimesHTML;
  burstTimesElement.innerHTML = burstTimesHTML;
  awtValuesElement.innerHTML = awtValuesHTML;
  aatValuesElement.innerHTML = aatValuesHTML;
}
