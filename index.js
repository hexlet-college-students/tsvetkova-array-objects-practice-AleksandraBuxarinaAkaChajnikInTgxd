const normalizedData = (content) => content.trim().split('\n').slice(1).map((str) => {
  const temp = str.split(';');
  const newStr = temp.map((elem) => Number(elem) || elem);
  return newStr;
});

// task 1
const hiestRaiting = (data) => data.reduce((top, now) => (top[2] < (now[2] + now[3]) ? [now[0], now[1], now[2] + now[3]] : top), ['name', 'dev', 0]);

const indiaMax = (data) => data.reduce((mx, now) => Math.max(mx, now[6]), 0);
const indiaMin = (data) => data.reduce((mx, now) => Math.min(mx, now[6]), Infinity);

const mostPopularAustralia = (data) => {
  const sortDlAustr = data.map((item) => Number(item[5])).sort((a, b) => b - a);
  const downloadAust = data.map((item) => Number(item[5]));
  const sortedTop3 = [
    data[downloadAust.indexOf(sortDlAustr[0])][0],
    data[downloadAust.indexOf(sortDlAustr[1])][0],
    data[downloadAust.indexOf(sortDlAustr[2])][0],
  ];
  return sortedTop3.sort();
};

const numberOfDownload = (data) => {
  const averNumberOfDl = data.reduce((acc, item) => {
    const count = (Number(item[4]) + Number(item[5]) + Number(item[6]) + Number(item[7])) / 4;
    acc.push(count);
    return acc;
  }, []);

  const averNumberName = averNumberOfDl.reduce((acc, item) => {
    const nameApp = data[averNumberOfDl.indexOf(item)][0];
    acc.push([item, nameApp]);
    return acc;
  }, []);

  averNumberOfDl.sort((a, b) => a - b);

  const namesAverDl = averNumberOfDl.reduce((acc, item) => {
    const nameApp = averNumberName.filter((num) => num[0] === item);
    acc.push(nameApp[0][1]);
    return acc;
  }, []);

  return namesAverDl.join(', ');
};

const mostOwned = (data) => {
  const owners = data.reduce((acc, item) => {
    const owner = item[1];
    if (!Object.hasOwn(acc, owner)) {
      acc[owner] = 0;
    }
    acc[owner] += 1;
    return acc;
  }, {});

  const ownersFilt = Object.entries(owners).filter((item) => item[1] >= 2);

  const topOwners = ownersFilt.map((item) => item[0]).join(', ');
  return topOwners;
};

const tableParsing = (content) => {
  const data = normalizedData(content);
  const topM = hiestRaiting(data);
  console.log(`General top messenger: ${topM[0]}, Owner: ${topM[1]}`);

  const [mx, mn] = [indiaMax(data), indiaMin(data)];
  console.log(`Download count: Max count: ${mx}, Min count: ${mn}`);

  const [top1, top2, top3] = mostPopularAustralia(data);
  console.log(`Top-3 Australia: ${top1}, ${top2}, ${top3}`);

  const names = numberOfDownload(data);
  console.log(`Top downloads: ${names}`);

  const owners = mostOwned(data);
  console.log(`Top owner: ${owners}`);
};

// task 2
const candidateAssessment = (/* content */) => {

};

// task 3
const actorRating = (/* content */) => {

};

export { tableParsing, candidateAssessment, actorRating };
