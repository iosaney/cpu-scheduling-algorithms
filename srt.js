let processArray = [];
let btn = document.querySelector("button");
btn.addEventListener("click", calculateSrt);

function calculateSrt() {
  const p = [];
  const burstRemaining = [];
  const isCompleted = [];

  let totalTurnaroundTime = 0;
  let totalWaitingTime = 0;
  let totalResponseTime = 0;
  let totalIdleTime = 0;

  const processNames = parseInt(prompt("Enter the number of processes:")) || 0;

  for (let i = 0; i < processNames; i++) {
    p.push({
      pid: i + 1,
      arrival_time: parseInt(prompt(`Enter arrival time of process ${i + 1}:`)),
      burst_time: parseInt(prompt(`Enter burst time of process ${i + 1}:`)),
      start_time: 0,
      completion_time: 0,
      turnaround_time: 0,
      waiting_time: 0,
      response_time: 0,
    });
    burstRemaining.push(p[i].burst_time);
    isCompleted.push(0);
  }

  let current_time = 0;
  let completed = 0;

  while (completed !== processNames) {
    let idx = -1;
    let shortest = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < processNames; i++) {
      if (p[i].arrival_time <= current_time && isCompleted[i] === 0) {
        if (burstRemaining[i] < shortest) {
          shortest = burstRemaining[i];
          idx = i;
        }
      }
    }

    if (idx !== -1) {
      if (burstRemaining[idx] === p[idx].burst_time) {
        p[idx].start_time = current_time;
        totalIdleTime += p[idx].start_time - current_time;
        current_time = p[idx].start_time;
      }

      burstRemaining[idx] -= 1;
      current_time++;

      if (burstRemaining[idx] === 0) {
        p[idx].completion_time = current_time;
        p[idx].turnaround_time = p[idx].completion_time - p[idx].arrival_time;
        p[idx].waiting_time = p[idx].turnaround_time - p[idx].burst_time;
        p[idx].response_time = p[idx].start_time - p[idx].arrival_time;

        totalTurnaroundTime += p[idx].turnaround_time;
        totalWaitingTime += p[idx].waiting_time;
        totalResponseTime += p[idx].response_time;

        isCompleted[idx] = 1;
        completed++;
      }
    } else {
      current_time++;
    }
  }

  const avgTurnaroundTime = totalTurnaroundTime / processNames;
  const avgWaitingTime = totalWaitingTime / processNames;
  const avgResponseTime = totalResponseTime / processNames;
  const cpuUtilisation = ((current_time - totalIdleTime) / current_time) * 100;
  const throughput = processNames / current_time;

  console.log("\n#P\tAT\tBT\tST\tCT\tTAT\tWT\tRT\n");

  for (let i = 0; i < processNames; i++) {
    console.log(
      `${p[i].pid}\t${p[i].arrival_time}\t${p[i].burst_time}\t${p[i].start_time}\t${p[i].completion_time}\t${p[i].turnaround_time}\t${p[i].waiting_time}\t${p[i].response_time}\n`
    );
  }

  console.log(`Average Turnaround Time = ${avgTurnaroundTime}`);
  console.log(`Average Waiting Time = ${avgWaitingTime}`);
  console.log(`Average Response Time = ${avgResponseTime}`);
  console.log(`CPU Utilization = ${cpuUtilisation}%`);
  console.log(`Throughput = ${throughput} process/unit time`);

  // inner HTML
  
    const avgWt = document.getElementById("avgWt");
    avgWt.innerHTML = `Average Waiting Time = ${avgWaitingTime}`;
    const avgTat = document.getElementById("avgTat");
    avgTat.innerHTML = `Average Turnaround Time = ${avgTurnaroundTime}`;
  const processNumbers = document.getElementById("processNum");
  processNumbers.innerHTML = `you have ${processNames} processes`;
  const processNamesElement = document.getElementById("processName");
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

 

  for (let i = 0; i < processNames; i++) {
    processNamesContent += `<p>${p[i].pid}</p>`;
    arrivalTimesContent += `<p>${p[i].arrival_time}</p>`;
    burstTimesContent += `<p>${p[i].burst_time}</p>`;
    awtValuesContent += `<p>${p[i].waiting_time}</p>`;
    aatValuesContent += `<p>${p[i].turnaround_time}</p>`;
  }

  // Update the content of the DOM elements
  processNamesElement.innerHTML = processNamesContent;
  arrivalTimesElement.innerHTML = arrivalTimesContent;
  burstTimesElement.innerHTML = burstTimesContent;
  awtValuesElement.innerHTML = awtValuesContent;
  aatValuesElement.innerHTML = aatValuesContent;
}

