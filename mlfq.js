let btn = document.querySelector("button");
btn.addEventListener("click", multiLevelFeedbackQueueScheduling);

function sortByArrival(arr) {
  arr.sort((a, b) => a.AT - b.AT);
}

function sortByArrival(arr) {
  arr.sort((a, b) => a.AT - b.AT);
}

function multiLevelFeedbackQueueScheduling() {
  const Q1 = [];
  const Q2 = [];
  const Q3 = [];

  let n = parseInt(prompt("Enter no of processes:")) || 0;
  let time = 0;
  let k = 0,
    r = 0;

  for (let i = 0; i < n; i++) {
    Q1.push({
      name: `P${i + 1}`,
      AT: parseInt(prompt(`Enter arrival time of process P${i + 1}:`)),
      BT: parseInt(prompt(`Enter burst time of process P${i + 1}:`)),
      WT: 0,
      TAT: 0,
      RT: 0,
      CT: 0,
    });
    Q1[i].RT = Q1[i].BT;
  }

  sortByArrival(Q1);
  time = Q1[0].AT;

  let tq1 = parseInt(prompt("Enter time quantum for queue 1:")) || 5;
  let tq2 = parseInt(prompt("Enter time quantum for queue 2:")) || 8;

    let processQueueInfo = "";
    let processName = "";
    let arrivalTimes = "";
    let burstTimes = "";
    let awtValues = "";
    let aatValues = "";

  console.log(`Process in first queue following RR with qt=${tq1}`);
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
      Q2[k] = {};
      Q2[k].WT = time;
      time += tq1;
      Q1[i].RT -= tq1;
      Q2[k].BT = Q1[i].RT;
      Q2[k].RT = Q2[k].BT;
      Q2[k].name = Q1[i].name;
      k++;
    }
  }

  document.querySelector(".processQueueInfo").innerHTML = processQueueInfo;
  document.getElementById("processName").innerHTML = processName;
  document.getElementById("arrivalTimes").innerHTML = arrivalTimes;
  document.getElementById("burstTimes").innerHTML = burstTimes;
  document.getElementById("awtValues").innerHTML = awtValues;
  document.getElementById("aatValues").innerHTML = aatValues;

      let processQueueInfo1 = "";
      let processName1 = "";
      
    let arrivalTimes1 = "";
      let burstTimes1 = "";
      let awtValues1 = "";
      let aatValues1 = "";
  console.log(`Process in second queue following RR with qt=${tq2}`);
  console.log("Process\tRT\tWT\tTAT");

  for (let i = 0; i < k; i++) {
    if (Q2[i].RT <= tq2) {
      time += Q2[i].RT;
      Q2[i].RT = 0;
      Q2[i].WT = time - tq1 - Q2[i].BT;
      Q2[i].TAT = time - Q2[i].AT;
      console.log(
        `${Q2[i].name}\t${Q2[i].BT}\t${Q2[i].WT}\t${Q2[i].TAT}\t${Q1[i].AT}`
      );


      processQueueInfo1 = `Process in first queue following RR with qt=${tq2}`;
      processName1 += `<p>${Q2[i].name}</p>`;
      
      arrivalTimes1 += `<p>${Q1[i].AT}</p>`;
      burstTimes1 += `<p>${Q2[i].BT}</p>`;
      awtValues1 += `<p>${Q2[i].WT}</p>`;
      aatValues1 += `<p>${Q2[i].TAT}</p>`;
    } else {
      Q3[r] = {};
      Q3[r].AT = time;
      time += tq2;
      Q2[i].RT -= tq2;
      Q3[r].BT = Q2[i].RT;
      Q3[r].RT = Q3[r].BT;
      Q3[r].name = Q2[i].name;
      r++;
    }
  }
  document.querySelector(".processQueueInfo1").innerHTML = processQueueInfo1;
  document.getElementById("processName1").innerHTML = processName1;
  document.getElementById("burstTimes1").innerHTML = burstTimes1;
  document.getElementById("awtValues1").innerHTML = awtValues1;
  document.getElementById("aatValues1").innerHTML = aatValues1;


  console.log("Process in third queue following FCFS");
  console.log("Process\tBT\tWT\tTAT");

  for (let i = 0; i < r; i++) {
    if (i === 0) {
      Q3[i].CT = Q3[i].BT + time - tq1 - tq2;
    } else {
      Q3[i].CT = Q3[i - 1].CT + Q3[i].BT;
    }
    Q3[i].TAT = Q3[i].CT;
    Q3[i].WT = Q3[i].TAT - Q3[i].BT;
    console.log(`${Q3[i].name}\t${Q3[i].BT}\t${Q3[i].WT}\t${Q3[i].TAT}`);

    const processQueueInfo2 = document.querySelector(".processQueueInfo2");
    processQueueInfo2.innerHTML = `Process in third queue following FCFS`;

    const processName2 = document.getElementById("processName2");
    const burstTimes2 = document.getElementById("burstTimes2");
    const awtValues2 = document.getElementById("awtValues2");
    const aatValues2 = document.getElementById("aatValues2");

    processName2.innerHTML = Q3.map((process) => `<p>${process.name}</p>`).join(
      ""
    );
    
    burstTimes2.innerHTML = Q3.map((process) => `<p>${process.BT}</p>`).join(
      ""
    );
    awtValues2.innerHTML = Q3.map((process) => `<p>${process.WT}</p>`).join("");
    aatValues2.innerHTML = Q3.map((process) => `<p>${process.TAT}</p>`).join(
      ""
    );
  }
}
