async function generatepassword() {
  const alphaNumeric = '1234567890abcdefghijklmnopqrstuvwzyz';
  let password = '';
  for (let i = 0; i <= 6; i++) {
    password += alphaNumeric[Math.floor(Math.random() * alphaNumeric.length)];
  }
  return password;
}

function generateRegNumber(session: string): string {
  const number = '1234567890';
  let regNumber = '';
  for (let i = 0; i <= 9; i++) {
    regNumber += number[Math.floor(Math.random() * number.length)];
  }
  return `${session.substring(0, 4)}${regNumber}`;
}

export { generatepassword, generateRegNumber };

// console.log(generateRegNumber('2017/2018'));
