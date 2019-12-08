(function() {

    var canvas, gl, program, program2;
    glUtils.SL.init({ callback: function() { main(); } });

    function main() {

        canvas = document.getElementById("glcanvas");
        gl = glUtils.checkWebGL(canvas);

        window.addEventListener('resize', resizer);

        var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
        var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
        program = glUtils.createProgram(gl, vertexShader, fragmentShader);

        var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
        program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader);

        var vertexShader3 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v3.vertex);
        program3 = glUtils.createProgram(gl, vertexShader3, fragmentShader);

        resizer();

        //kubus
        var kubus = ([
            //BAWAH
            -0.3, -0.8, 0.7, 255, 255, 255,
            0.4, -0.8, 0.7, 255, 255, 255,
            0.4, -0.8, 0.7, 255, 255, 255,
            0.4, -0.8, -0.6, 255, 255, 255,
            0.4, -0.8, -0.6, 255, 255, 255, -0.3, -0.8, -0.6, 255, 255, 255, -0.3, -0.8, -0.6, 255, 255, 255, -0.3, -0.8, 0.7, 255, 255, 255,
            //ATAS
            -0.3, 0.6, 0.7, 255, 255, 255,
            0.4, 0.6, 0.7, 255, 255, 255,
            0.4, 0.6, 0.7, 255, 255, 255,
            0.4, 0.6, -0.6, 255, 255, 255,
            0.4, 0.6, -0.6, 255, 255, 255, -0.3, 0.6, -0.6, 255, 255, 255, -0.3, 0.6, -0.6, 255, 255, 255, -0.3, 0.6, 0.7, 255, 255, 255,
            //BELAKANG
            -0.3, -0.8, 0.7, 255, 255, 255, -0.3, 0.6, 0.7, 255, 255, 255,
            0.4, -0.8, 0.7, 255, 255, 255,
            0.4, 0.6, 0.7, 255, 255, 255,
            //DEPAN
            0.4, -0.8, -0.6, 255, 255, 255,
            0.4, 0.6, -0.6, 255, 255, 255, -0.3, -0.8, -0.6, 255, 255, 255, -0.3, 0.6, -0.6, 255, 255, 255
        ]);

        var triangleVertices2 = [
            // x, y,      r, g, b
            -0.3, 0.0, 1.0, 0.0, 0.0, 
            -0.3, 0.4, 1.0, 0.0, 0.0,
            0.3, 0.0, 1.0, 1.0, 1.0,
            0.3, 0.4, 1.0, 1.0, 1.0, 
            0.3, 0.4, 1.0, 1.0, 1.0,
            0.3, 0.0, 1.0, 1.0, 1.0, 
            -0.1, 0.0, 1.0, 1.0, 1.0, 
            -0.1, -0.8, 1.0, 1.0, 1.0,
            0.1, -0.8, 1.0, 1.0, 1.0, 
            -0.1, 0.0, 1.0, 1.0, 1.0,
            0.1, 0.0, 1.0, 1.0, 1.0,
            0.1, -0.8, 1.0, 1.0, 1.0
        ];

        function drawShapes(type, vertices, n) {
            var vertexBufferObject = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);

            var vPosition = gl.getAttribLocation(program2, 'vPosition');
            var vColor = gl.getAttribLocation(program2, 'vColor');

            gl.vertexAttribPointer(
                vPosition, // variabel yang memegang posisi attribute di shader
                2, // jumlah elemen per atribut
                gl.FLOAT, // tipe data atribut
                gl.FALSE,
                5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex 
                0 // offset dari posisi elemen di array
            );
            gl.vertexAttribPointer(
                vColor,
                3,
                gl.FLOAT,
                gl.FALSE,
                5 * Float32Array.BYTES_PER_ELEMENT,
                2 * Float32Array.BYTES_PER_ELEMENT
            );
            gl.enableVertexAttribArray(vPosition);
            gl.enableVertexAttribArray(vColor);

            var vPosition = gl.getAttribLocation(program2, 'vPosition');
            var vColor = gl.getAttribLocation(program2, 'vColor');
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            gl.drawArrays(type, 0, n);
        }

        function drawShapes2(type, vertices, n) {
            var vertexBufferObject = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);

            var vPosition = gl.getAttribLocation(program3, 'vPosition');
            var vColor = gl.getAttribLocation(program3, 'vColor');

            gl.vertexAttribPointer(
                vPosition, // variabel yang memegang posisi attribute di shader
                3, // jumlah elemen per atribut
                gl.FLOAT, // tipe data atribut
                gl.FALSE,
                6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex 
                0 // offset dari posisi elemen di array
            );
            gl.vertexAttribPointer(
                vColor,
                3,
                gl.FLOAT,
                gl.FALSE,
                6 * Float32Array.BYTES_PER_ELEMENT,
                2 * Float32Array.BYTES_PER_ELEMENT
            );
            gl.enableVertexAttribArray(vPosition);
            gl.enableVertexAttribArray(vColor);

            var vPosition = gl.getAttribLocation(program3, 'vPosition');
            var vColor = gl.getAttribLocation(program3, 'vColor');
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            gl.drawArrays(type, 0, n);
        }

        var thetaLoc1 = gl.getUniformLocation(program2, 'theta1');
        var transLoc1 = gl.getUniformLocation(program2, 'trans1');
        var thetaA1 = [10, 20, 0];
        var trans1 = [0, 0, 0];
        var X1 = 0.0080;
        var Y1 = 0.0090;
        var Z1 = 0.0130;

        var thetaLocCube = gl.getUniformLocation(program3, 'theta');

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

        function render2() {

            gl.useProgram(program3);
            var thetaCube = [10, 10, 0];
            gl.uniform3fv(thetaLocCube, thetaCube);
            drawShapes2(gl.LINES, kubus, 24);
            requestAnimationFrame(render2);
        };
        render();
        render2();
    }

    function resizer() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
})();