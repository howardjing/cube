// @flow

const padLeft = (
  desiredLength: number,
  char: string,
  message: string
): string => {
  if (message.length >= desiredLength) { return message; }

  const diff = desiredLength - message.length;
  return char.slice(0, 1).repeat(diff) + message;
}

const format = (millis: number): string => {
  const time = Math.round(millis);
  const centiseconds = (time % 1000);
  const secondsRaw = Math.floor(time / 1000);
  const seconds = secondsRaw % 60;
  const minutes = Math.floor(secondsRaw / 60);

  return (
    padLeft(2, '0', minutes.toString()) + ':' +
    padLeft(2, '0', seconds.toString()) + '.' +
    padLeft(3, '0', centiseconds.toString())
  );
};

export default format;
export {
  padLeft
};