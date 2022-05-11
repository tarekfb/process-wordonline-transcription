const participants = ["TB, AO, R1, R2, R3, R4"];

function getIndecesOfAllParticipants(lines) {
  let re = /[0-9]./;
  const indeces = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].substring(0, 7).match(re)) indeces.push(lines[i]);
  }
  return indeces;
}

function actuallyGetIndecesOfAllParticipants(lines) {
  let re = /[0-9]./;
  const indeces = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].substring(0, 7).match(re)) indeces.push(i);
  }
  return indeces;
}

function extractInitialsFromLine(line) {
  return line.substring(line.length - 3).replace(/\s/g, '');
}

function removeRepitions(string, lines) {
  const indecesToRemove = [];
  let allNumberedLines = getIndecesOfAllParticipants(lines);

  for (let i = 0; i < allNumberedLines.length - 1; i++) {
    let initials = extractInitialsFromLine(allNumberedLines[i]); // this mean names have to be 2 chars
    if (initials == string) {
      if (extractInitialsFromLine(allNumberedLines[i + 1]) === initials) {
        const next = allNumberedLines[i + 1];
        let nextIndex = lines.indexOf(next)

        // remove empty lines too
        indecesToRemove.push(nextIndex - 1);
        indecesToRemove.push(nextIndex);
        indecesToRemove.push(nextIndex + 1);
      }
    }
  }

  indecesToRemove.reverse();

  indecesToRemove.forEach(nextIndex => {
    lines.splice(nextIndex, 1)
  });

  return lines;
}

function addNumbers(lines) {
  let counter = 1;
  for (let index = 0; index < lines.length; index++) {
    if (lines[index]) {
      let substring = lines[index].substring(0, 2)
      switch (substring) {
        case "AO":
        case "TB":
        case "R1":
        case "R2":
        case "R3":
        case "R4":
          lines[index] = counter + ". " + lines[index];
          counter++;
        default:
          break;
      }
    }
  }

  return lines;
}

function replaceInitials(lines) {
  let speaker1 = prompt("What is the initials of speaker 1?");
  let speaker2 = prompt("What is the initials of speaker 2?");
  let speaker3 = prompt("What is the initials of speaker 3?");

  for (let index = 0; index < lines.length; index++) {
    let substring = lines[index].substring(1, 8)
    // console.log(lines[index].substring(1, 9))
    // console.log(substring == "Speaker")
    // console.log(substring.length);
    // console.log("Speaker".length)
    if (substring === "Speaker") {
      let full = lines[index].substring(1, 10)
      switch (full) {
        case "Speaker 1":
          lines[index] = speaker1
          break;
        case "Speaker 2":
          lines[index] = speaker2
          break;
        case "Speaker 3":
          lines[index] = speaker3
          break;
        case "Speaker 4":
          alert("Found a 4th speaker at line: " + lines[index + 2] + "\nPlease remove any instances of a 4th speaker or this might not work.")
          break;
        default:
          break;
      }
    }
  }
  return lines;
}

function removeNumbers(lines) {
  let allNumberedLines = actuallyGetIndecesOfAllParticipants(lines);
  console.log(allNumberedLines)
  allNumberedLines.forEach(indexOfNumberedLine => {
    const removeFrom = lines[indexOfNumberedLine].indexOf(".") + 2;
    lines[indexOfNumberedLine] = lines[indexOfNumberedLine].substring(removeFrom);
  });
  return lines;
}

function addNumbersAndRemoveBlanks(lines){
  let counter = 1;
  for (let index = 0; index < lines.length; index++) {
    if (lines[index]) {
      let substring = lines[index].substring(0, 2)
      switch (substring) {
        case "AO":
        case "TB":
        case "R1":
        case "R2":
        case "R3":
        case "R4":
          lines[index] = counter + ". " + lines[index];
          lines.splice([index + 1], 1)
          counter++;
        default:
          break;
      }
    }
  }

  return lines;
}

function processTranscription(lines) {
  lines = replaceInitials(lines)
  lines = addNumbers(lines);

  lines = removeRepitions("TB", lines);
  lines = removeRepitions("AO", lines);
  lines = removeRepitions("R1", lines);
  lines = removeRepitions("R2", lines);
  lines = removeRepitions("R3", lines);
  lines = removeRepitions("R4", lines);

  lines = removeNumbers(lines);
  lines = addNumbersAndRemoveBlanks(lines);
  

  const myDiv = document.getElementById("my-div");
  let processedTranscription = lines.join('\n')
  myDiv.innerHTML = processedTranscription;
}

const myTranscription = `add a transcription here that has been transcribed by word online`
let lines = r2v2.split('\n');
processTranscription(myTranscription);
