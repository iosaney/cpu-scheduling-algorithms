let btn = document.querySelector("button");
btn.addEventListener("click", MLQScheduler);

class Process {
  constructor(name, AT, BT) {
    this.name = name;
    this.AT = AT;
    this.BT = BT;
    this.WT = 0;
    this.TAT = 0;
    this.RT = BT;
    this.CT = 0;
  }
}

function sortByArrival(Q1, n) {
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (Q1[i].AT > Q1[j].AT) {
        const temp = Q1[i];
        Q1[i] = Q1[j];
        Q1[j] = temp;
      }
    }
  }
}

function MLQScheduler() {
  let n = parseInt(prompt("Enter number of processes:"));
  const Q1 = [];
  const Q2 = [];
  const Q3 = [];
  let k = 0;
  let r = 0;
  let time = 0;
  let tq1 = parseInt(prompt("Enter time quantum for queue 1 (tq1):"));
  let tq2 = parseInt(prompt("Enter time quantum for queue 2 (tq2):"));
  let flag = 0;

  let processQueueInfo = "";
  let burstTimes = ""; // For Q1
  let processName = "";
  let arrivalTimes = "";
  let awtValues = "";
  let aatValues = "";

  for (let i = 0; i < n; i++) {
    const AT = parseInt(prompt(`Enter arrival time for process P${i + 1}:`));
    const BT = parseInt(prompt(`Enter burst time for process P${i + 1}:`));
    Q1.push(new Process(`P${i + 1}`, AT, BT));
  }

  sortByArrival(Q1, n);

  time = Q1[0].AT;
  console.log("Process in first queue following RR with qt=" + tq1);
  console.log("Process\tRT\tWT\tTAT");

  for (let i = 0; i < n; i++) {
    if (Q1[i].RT <= tq1) {
      time += Q1[i].RT;
      Q1[i].RT = 0;
      Q1[i].WT = time - Q1[i].AT - Q1[i].BT;
      Q1[i].TAT = time - Q1[i].AT;
      console.log(
        `${Q1[i].name}\t${Q1[i].BT}\t${Q1[i].WT}\t${Q1[i].TAT}\t${Q1[i].AT}`
      );
      // inner HTML
      processQueueInfo = `Process in first queue following RR with qt=${tq1}`;
      processName += `<p>${Q1[i].name}</p>`;
      arrivalTimes += `<p>${Q1[i].AT}</p>`;
      burstTimes += `<p>${Q1[i].BT}</p>`;
      awtValues += `<p>${Q1[i].WT}</p>`;
      aatValues += `<p>${Q1[i].TAT}</p>`;
    } else {
      Q2[k] = new Process(Q1[i].name, 0, 0);
      Q2[k].WT = time;
      time += tq1;
      Q1[i].RT -= tq1;
      Q2[k].BT = Q1[i].RT;
      Q2[k].RT = Q2[k].BT;
      k++;
      flag = 1;
    }
  }
  document.querySelector(".processQueueInfo").innerHTML = processQueueInfo;
  document.getElementById("processName").innerHTML = processName;
  document.getElementById("arrivalTimes").innerHTML = arrivalTimes;
  document.getElementById("burstTimes").innerHTML = burstTimes;
  document.getElementById("awtValues").innerHTML = awtValues;
  document.getElementById("aatValues").innerHTML = aatValues;

  if (flag === 1) {
    console.log("Process in second queue following RR with qt=" + tq2);
    console.log("Process\tRT\tWT\tTAT");
  }

  // 2nd queue
  let processQueueInfo1 = "";
  let processName1 = "";
  let burstTimes1 = "";
  let arrivalTimes1 = "";
  let awtValues1 = "";
  let aatValues1 = "";

  for (let i = 0; i < k; i++) {
    if (Q2[i].RT <= tq2) {
      time += Q2[i].RT;
      Q2[i].RT = 0;
      Q2[i].WT = time - tq1 - Q2[i].BT;
      Q2[i].TAT = time - Q2[i].AT;
      console.log(`${Q2[i].name}\t${Q2[i].BT}\t${Q2[i].WT}\t${Q2[i].TAT}`);

      processQueueInfo1 = `Process in first queue following RR with qt=${tq2}`;
      processName1 += `<p>${Q2[i].name}</p>`;
      arrivalTimes1 += `<p>${Q2[i].AT}</p>`;
      burstTimes1 += `<p>${Q2[i].BT}</p>`;
      awtValues1 += `<p>${Q2[i].WT}</p>`;
      aatValues1 += `<p>${Q2[i].TAT}</p>`;
    } else {
      Q3[r] = new Process(Q2[i].name, 0, 0);
      Q3[r].AT = time;
      time += tq2;
      Q2[i].RT -= tq2;
      Q3[r].BT = Q2[i].RT;
      Q3[r].RT = Q3[r].BT;
      r++;
      flag = 2;
    }
  }
  document.querySelector(".processQueueInfo1").innerHTML = processQueueInfo1;
  document.getElementById("arrivalTimes1").innerHTML = arrivalTimes1;
  document.getElementById("processName1").innerHTML = processName1;
  document.getElementById("burstTimes1").innerHTML = burstTimes1;
  document.getElementById("awtValues1").innerHTML = awtValues1;
  document.getElementById("aatValues1").innerHTML = aatValues1;

  // 2nd queue
  let processQueueInfo2 = "";
  let processName2 = "";
  let burstTimes2 = "";
  let arrivalTimes2 = "";
  let awtValues2 = "";
  let aatValues2 = "";
  if (flag === 2) {
    console.log("Process in third queue following FCFS");
  }

  processQueueInfo2 = `Process in third queue following FCFS}`;
  for (let i = 0; i < r; i++) {
    if (i === 0) {
      Q3[i].CT = Q3[i].BT + time;
    } else {
      Q3[i].CT = Q3[i - 1].CT + Q3[i].BT;
    }
  }

  for (let i = 0; i < r; i++) {
    Q3[i].TAT = Q3[i].CT;
    Q3[i].WT = Q3[i].TAT - Q3[i].BT;
    console.log(`${Q3[i].name}\t${Q3[i].BT}\t${Q3[i].WT}\t${Q3[i].TAT}`);

    processName2 += `<p>${Q3[i].name}</p>`;
    arrivalTimes2 += `<p>${Q2[i].AT}</p>`;
    burstTimes2 += `<p>${Q3[i].BT}</p>`;
    awtValues2 += `<p>${Q3[i].WT}</p>`;
    aatValues2 += `<p>${Q3[i].TAT}</p>`;
  }

  document.querySelector(".processQueueInfo2").innerHTML = processQueueInfo2;
  document.getElementById("arrivalTimes2").innerHTML = arrivalTimes2;
  document.getElementById("processName2").innerHTML = processName2;
  document.getElementById("burstTimes2").innerHTML = burstTimes2;
  document.getElementById("awtValues2").innerHTML = awtValues2;
  document.getElementById("aatValues2").innerHTML = aatValues2;
}
