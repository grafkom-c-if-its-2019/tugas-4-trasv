precision mediump float;

attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform vec3 trans1;
uniform vec3 theta1;
// uniform float scaleX;
// uniform float scaleY;

void main() {
  fColor = vColor;
  vec3 angle = radians(theta1);
  vec3 s = sin(angle);
  vec3 c = cos(angle);

  mat4 ry = mat4(
    c.y, 0.0, -s.y, 0.0,
    0.0, 1.0, 0.0, 0.0,
    s.y, 0.0, c.y, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
   
  mat4 translasi = mat4(
    1.0, 0.0, 0.0, trans1.x,
    0.0, 1.0, 0.0, trans1.y,
    0.0, 0.0, 1.0, trans1.z,
    0.0, 0.0, 0.0, 1.0
  );

  mat4 skalasi = mat4(
    0.3, 0.0, 0.0, 0.0,
    0.0, 0.3, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );

  gl_Position = vec4(vPosition, 0.0, 1.0) * skalasi * ry;
  gl_Position *=  translasi;}
