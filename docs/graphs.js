const drawFrequencyData = (context, width, height) => {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.beginPath();
    const sliceWidth = width * 1.0 / bufferLength;
    let x = 0;

    context.moveTo(0, height);

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 256;
      const y = (1 - v) * height;

      context.lineTo(x, y);

      x += sliceWidth;
    }

    context.stroke();
  }

  const drawTimeDomainData = (context, width, height) => {
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.beginPath();
    const sliceWidth = width * 1.0 / bufferLength;
    let x = 0;

    context.moveTo(0, height / 2);

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128;
      const y = v * height / 2;

      context.lineTo(x, y);

      x += sliceWidth;
    }

    context.stroke();
  }
