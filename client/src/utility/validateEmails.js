const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export default emails => {
  const invalidEmailList = emails
    .split(",")
    .map(email => email.trim())
    .filter(email => regex.test(email) === false);

  if (invalidEmailList.length) {
    return `These emails are invalid! ${invalidEmailList}`;
  }
  return null;
};
