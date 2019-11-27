//precision mediump float;

attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform float theta;

void main() {
  fColor = vColor;

  mat4 RotateM = mat4(
    cos(theta), sin(theta), 0.0, +0.8*cos(theta) -0.7,
    -sin(theta), cos(theta), 0.0, -0.95*sin(theta)+0.25,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  gl_Position = vec4(vPosition, 0.0, 1.0) * RotateM;
}
