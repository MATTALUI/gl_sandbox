(async () => {
  // Set up GL
  const canvas = document.querySelector("canvas");
  const gl = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl");
  if (!gl) return console.error("You can't use GL, Looks like :<");
  // Fetch shader sources
  const [fragmentShaderSource, vertexShaderSource] = await Promise.all([
    fetch('/assets/frag.glsl').then(r => r.text()),
    fetch('/assets/vert.glsl').then(r => r.text()),
  ]);
  // Build the program
  const program = gl.createProgram();
  // Vertex Shader
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);
  gl.attachShader(program, vertexShader);
  // Fragment Shader
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);
  gl.attachShader(program, fragmentShader);


  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    // Checking the logs is expensive, so only do it if we have to.
    const linkErrLog = gl.getProgramInfoLog(program);
    cleanup();
    console.error(`Shader program did not link successfully. Error log: ${linkErrLog}`);
    return;
  }

  gl.useProgram(program);

  gl.drawArrays(gl.POINTS, 0, 1);
})();