(function() {

    glUtils.SL.init({ callback: function() { main(); } });

    function main() {

        var mmLoc, mm, vmLoc, vm, pmLoc, pm, camera;
        var dcLoc, dc, ddLoc, dd, acLoc, ac, nmLoc;
        var vPosition, vColor, vNormal, vTexCoord;
        var flag, flagUniformLocation, fFlagUniformLocation;
    
        var canvas = document.getElementById("glcanvas");
        var gl = glUtils.checkWebGL(canvas);
    
        var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
        var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
        var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
        gl.useProgram(program);
        
        var transLoc = gl.getUniformLocation(program, 'trans');
        var trans = [0, 0, 0]; 
        var X = 1.0;
        var Y = 1.0;
        var Z = 1.0;
        var lebar = 1.0;
    
        var Kubus = [];
        var cubePoints = [
          [ -0.8, -0.8,  0.8 ],
          [ -0.8,  0.8,  0.8 ],
          [  0.8,  0.8,  0.8 ],
          [  0.8, -0.8,  0.8 ],
          [ -0.8, -0.8, -0.8 ],
          [ -0.8,  0.8, -0.8 ],
          [  0.8,  0.8, -0.8 ],
          [  0.8, -0.8, -0.8 ]
        ];
        var cubeColors = [
          [],
          [1.0, 0.0, 0.0], // merah
          [0.0, 1.0, 0.0], // hijau
          [0.0, 0.0, 1.0], // biru
          [1.0, 1.0, 1.0], // putih
          [1.0, 0.5, 0.0], // oranye
          [1.0, 1.0, 0.0], // kuning
          []
        ];
        var cubeNormals = [
          [],
          [  0.0,  0.0,  1.0 ], // depan
          [  1.0,  0.0,  0.0 ], // kanan
          [  0.0, -1.0,  0.0 ], // bawah
          [  0.0,  0.0, -1.0 ], // belakang
          [ -1.0,  0.0,  0.0 ], // kiri
          [  0.0,  1.0,  0.0 ], // atas
          []
        ];

        var triangleVertices2 = [
            // x, y, z      r, g, b
            -0.3, 0.0, 0.0,      1.0, 0.0, 0.0,
            -0.3, 0.3, 0.0,     1.0, 0.0, 0.0,
            0.3, 0.0, 0.0,       1.0, 0.0, 0.0,
            0.3, 0.3, 0.0,      1.0, 0.0, 0.0,
            -0.3, 0.3, 0.0,      1.0, 0.0, 0.0,
            0.3, 0.0, 0.0,       1.0, 0.0, 0.0,
    
            -0.1, 0.0, 0.0,      1.0, 0.0, 0.0,
            -0.1, -0.4, 0.0,    1.0, 0.0, 0.0,
            0.1, -0.4, 0.0,     1.0, 0.0, 0.0,
            -0.1, 0.0, 0.0,      1.0, 0.0, 0.0,
            0.1, 0.0, 0.0,       1.0, 0.0, 0.0,
            0.1, -0.4, 0.0,     1.0, 0.0, 0.0,
        ];


        function quad(a, b, c, d) {
            var indices = [a, b, c, a, c, d];
            for (var i=0; i < indices.length; i++) {
              for (var j=0; j < 3; j++) {
                Kubus.push(cubePoints[indices[i]][j]);
              }
              for (var j=0; j < 3; j++) {
                Kubus.push(cubeColors[a][j]);
              }
              for (var j=0; j < 3; j++) {
                Kubus.push(-1*cubeNormals[a][j]);
              }
              switch (indices[i]) {
                case a:
                  Kubus.push((a-2)*0.125);
                  Kubus.push(0.0);
                  break;
                case b:
                  Kubus.push((a-2)*0.125);
                  Kubus.push(1.0);
                  break;
                case c:
                  Kubus.push((a-1)*0.125);
                  Kubus.push(1.0);
                  break;
                case d:
                  Kubus.push((a-1)*0.125);
                  Kubus.push(0.0);
                  break;
              
                default:
                  break;
              }
            }
          }
      
        // quad(1, 0, 3, 2);
        quad(2, 3, 7, 6);
        quad(3, 0, 4, 7);
        quad(4, 5, 6, 7);
        quad(5, 4, 0, 1);
        quad(6, 5, 1, 2);

        var dragging, lastx, lasty;
        function onMouseDown(event) {
          var x = event.clientX;
          var y = event.clientY;
          var rect = event.target.getBoundingClientRect();
          // Saat mouse diklik di area aktif browser,
          //  maka flag dragging akan diaktifkan
          if (
            rect.left <= x &&
            rect.right > x &&
            rect.top <= y &&
            rect.bottom > y
          ) {
            dragging = true;
            lastx = x;
            lasty = y;
          }
        }
        function onMouseUp(event) {
          // Ketika klik kiri mouse dilepas
          dragging = false;
        }
        function onMouseMove(event) {
          var x = event.clientX;
          var y = event.clientY;
          if (dragging) {
            factor = 10 / canvas.height;
            var dx = factor * (x - lastx);
            var dy = factor * (y - lasty);
            // Menggunakan dx dan dy untuk memutar kubus
            glMatrix.mat4.rotateY(mm, mm, dx);
            glMatrix.mat4.rotateX(mm, mm, dy);
          }
          lastx = x;
          lasty = y;
        }
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mousemove', onMouseMove);
    
        function onKeyDown(event) {
          if (event.keyCode == 83) thetaSpeed -= 0.01;       // key 's' google chrome
          else if (event.keyCode == 87) thetaSpeed += 0.01;  // key 'w'
          // if (event.keyCode == 173) thetaSpeed -= 0.01;       // key '-' firefox mozilla
          // else if (event.keyCode == 61) thetaSpeed += 0.01;  // key '='
          else if (event.keyCode == 48) thetaSpeed = 0;       // key '0'
          if (event.keyCode == 190) camera.z -= 0.1;          // key '/'
          else if (event.keyCode == 191) camera.z += 0.1;     // key '.'
          if (event.keyCode == 37) camera.x -= 0.1;           // key kiri
          else if (event.keyCode == 39) camera.x += 0.1;      // key kanan
          if (event.keyCode == 38) camera.y += 0.1;           // key atas 
          else if (event.keyCode == 40) camera.y -= 0.1;      // key Bawah
        }
        document.addEventListener('keydown', onKeyDown);


        function drawShapes(type, vertices, n) {
        var vertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);

        var vPosition = gl.getAttribLocation(program, 'vPosition');
        var vColor = gl.getAttribLocation(program, 'vColor');
        gl.vertexAttribPointer(
          vPosition, //variabel pemegang posisi atribut di shader
          3,          // jumlah elemen per atribut
          gl.FLOAT,   // tipe data atribut
          gl.FALSE,
          6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
          0
        );
        gl.vertexAttribPointer(
          vColor,
          3,
          gl.FLOAT,
          gl.FALSE,
          6 * Float32Array.BYTES_PER_ELEMENT,
          3 * Float32Array.BYTES_PER_ELEMENT
        );
        gl.enableVertexAttribArray(vPosition);
        gl.enableVertexAttribArray(vColor);

        var vPosition = gl.getAttribLocation(program, 'vPosition');
        var vColor = gl.getAttribLocation(program, 'vColor');
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        gl.uniform3fv(transLoc, trans);

        gl.enableVertexAttribArray(vPosition);
        gl.enableVertexAttribArray(vColor);
        gl.drawArrays(type, 0, n);
      }

        function render() {

            gl.useProgram(program2);
            // Bersihkan layar jadi hitam
            gl.clearColor(0.0, 0.0, 0.0, 1.0);

            // Bersihkan buffernya canvas
            gl.clear(gl.COLOR_BUFFER_BIT);

            if (trans1[0] >= 0.4 * 0.8 || trans1[0] <= -0.3 * 0.8) {
                X1 *= -1;
            }
            trans1[0] += X1;

            if (trans1[1] >= 0.6 * 0.8 || trans1[1] <= -0.8 * 0.8) {
                Y1 *= -1;
            }
            trans1[1] += Y1;

            if (trans1[2] >= 0.7 * 0.8 || trans1[2] <= -0.6 * 0.8) {
                Z1 *= -1;
            }
            trans1[2] += Z1;

            gl.uniform3fv(transLoc1, trans1);
            thetaA1[1] += 0.149;
            gl.uniform3fv(thetaLoc1, thetaA1);
            // gl.uniform1f(scaleYLocation, scaleY);

            //huruf t
            drawShapes(gl.TRIANGLES, triangleVertices2, 12);
            requestAnimationFrame(render);
        };
})();