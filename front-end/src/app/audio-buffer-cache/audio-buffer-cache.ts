import { toByteArray } from '../lib/bytes';

const audioContextClass = window.AudioContext || window.webkitAudioContext;
const audioContext = new audioContextClass();

const cache: { [key: string]: AudioBuffer } = {};

const get = (key: string) => cache[key];

const put = (key: string, base64EncodedSample: string) => {
  const sample = toByteArray(base64EncodedSample);
  audioContext.decodeAudioData(
    sample,
    (buffer) => (cache[key] = buffer),
    (e) => console.error('Unable to decode audio data: ' + e.message)
  );
};

export const audioBufferCache = {
  get,
  put
};
