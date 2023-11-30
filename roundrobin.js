let btn = document.querySelector("button");
btn.addEventListener("click", roundRobin);

class Process {
  constructor(pid, arrival_time, burst_time) {
    this.pid = pid;
    this.arrival_time = arrival_time;
    this.burst_time = burst_time;
    this.start_time = 0;
    this.completion_time = 0;
    this.turnaround_time = 0;
    this.waiting_time = 0;
    this.response_time = 0;
  }
}

function compareArrivalTime(p1, p2) {
  return p1.arrival_time - p2.arrival_time;
}

function comparePid(p1, p2) {
  return p1.pid - p2.pid;
}

function roundRobin() {
  const n = parseInt(prompt("Enter the number of processes:"));
  const tq = parseInt(prompt("Enter time quantum:"));

  const p = [];
  const burst_remaining = new Array(n).fill(0);

  let total_turnaround_time = 0;
  let total_waiting_time = 0;
  let total_response_time = 0;

  for (let i = 0; i < n; i++) {
    const arrival_time = parseInt(
      prompt(`Enter arrival time of process ${i + 1}:`)
    );
    const burst_time = parseInt(
      prompt(`Enter burst time of process ${i + 1}:`)
    );

    burst_remaining[i] = burst_time;
    p.push(new Process(i + 1, arrival_time, burst_time));
  }

  p.sort(compareArrivalTime);

  const q = [];
  let current_time = 0;

  while (true) {
    let done = true;

    for (let i = 0; i < n; i++) {
      if (burst_remaining[i] > 0) {
        done = false;

        if (burst_remaining[i] > tq) {
          current_time += tq;
          burst_remaining[i] -= tq;
        } else {
          current_time += burst_remaining[i];
          burst_remaining[i] = 0;
          p[i].completion_time = current_time;
        }
      }
    }

    if (done) break;

    for (let i = 0; i < n; i++) {
      if (p[i].arrival_time <= current_time && burst_remaining[i] > 0) {
        if (!q.includes(i)) {
          q.push(i);
        }
      }
    }

    const idx = q.shift();
    if (idx !== undefined) {
      if (p[idx].start_time === 0) {
        p[idx].start_time = current_time;
      }
    }
  }

  for (let i = 0; i < n; i++) {
    p[i].turnaround_time = p[i].completion_time - p[i].arrival_time;
    p[i].waiting_time = p[i].turnaround_time - p[i].burst_time;
    p[i].response_time = p[i].start_time - p[i].arrival_time;

    total_turnaround_time += p[i].turnaround_time;
    total_waiting_time += p[i].waiting_time;
    total_response_time += p[i].response_time;
  }

  const avg_turnaround_time = total_turnaround_time / n;
  const avg_waiting_time = total_waiting_time / n;
  const avg_response_time = total_response_time / n;

  p.sort(comparePid);

  console.log("\n#P\tAT\tBT\tST\tCT\tTAT\tWT\tRT\t");

  for (let i = 0; i < n; i++) {
    console.log(
      `${p[i].pid}\t${p[i].arrival_time}\t${p[i].burst_time}\t${p[i].start_time}\t${p[i].completion_time}\t${p[i].turnaround_time}\t${p[i].waiting_time}\t${p[i].response_time}\t`
    );
  }

  console.log(`Average Turnaround Time = ${avg_turnaround_time}`);
  console.log(`Average Waiting Time = ${avg_waiting_time}`);
  console.log(`Average Response Time = ${avg_response_time}`);

  document.getElementById("avgTat").innerHTML = `AAT = ${avg_turnaround_time}`;
  document.getElementById("avgWt").innerHTML = `AWT = ${avg_waiting_time}`;

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
    processNamesHTML += `<p>${p[i].pid}</p>`;
    arrivalTimesHTML += `<p>${p[i].arrival_time}</p>`;
    burstTimesHTML += `<p>${p[i].burst_time}</p>`;
    awtValuesHTML += `<p>${p[i].waiting_time}</p>`;
    aatValuesHTML += `<p>${p[i].turnaround_time}</p>`;
  }

  processNamesElement.innerHTML = processNamesHTML;
  arrivalTimesElement.innerHTML = arrivalTimesHTML;
  burstTimesElement.innerHTML = burstTimesHTML;
  awtValuesElement.innerHTML = awtValuesHTML;
  aatValuesElement.innerHTML = aatValuesHTML;
}

