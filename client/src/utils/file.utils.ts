// genrate random numer

export function generateCode() {
  // Generate a random 5-digit number
  const num = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

  // Calculate the product of the digits
  let payload = 1;
  for (const digit of num.toString()) {
    payload *= parseInt(digit, 10);
  }

  const result = {
    id: num,
    payloadCode: payload.toString().slice(-1),
  };

  return result;
}
