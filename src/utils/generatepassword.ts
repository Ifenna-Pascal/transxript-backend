export default async function () {
  const alphaNumeric = '1234567890abcdefghijklmnopqrstuvwzyz';
  let password = '';
  for (let i = 0; i <= 6; i++) {
    password += alphaNumeric[Math.floor(Math.random() * alphaNumeric.length)];
  }
  return password;
}
