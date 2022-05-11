const participants = ["TB, AO, R1, R2, R3, R4"];

function getIndecesOfAllParticipants(lines) {
  let re = /[0-9]./;
  const indeces = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].substring(0, 7).match(re)) indeces.push(lines[i]);
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
  // add numbers
  let counter = 1;
  for (let index = 0; index < lines.length; index++) {
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

  return lines;
}

function processTranscription(string) {
  let myLines = string.split('\n');
  myLines = addNumbers(myLines);
 
  myLines = removeRepitions("TB", myLines);
  myLines = removeRepitions("AO", myLines);
  myLines = removeRepitions("R1", myLines);
  myLines = removeRepitions("R2", myLines);
  myLines = removeRepitions("R3", myLines);
  myLines = removeRepitions("R4", myLines);
  
  const myDiv = document.getElementById("my-div");
  let processedTranscription = myLines.join('\n')
  myDiv.innerHTML = processedTranscription;
}

const myTranscription = `add a transcription here that has been transcribed by word online`
processTranscription(myTranscription);