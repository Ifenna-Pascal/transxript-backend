import { customAlphabet } from 'nanoid';

export default async function () {
  const password = customAlphabet('1234567890abcdefghijklmnopqrstuvwzyz', 6);
  return await password();
}
