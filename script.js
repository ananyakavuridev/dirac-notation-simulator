/* ---------- Homepage Navigation ---------- */

var launchBtn = document.getElementById("launchBtn");

if (launchBtn) {

    launchBtn.onclick = function () {

        window.location.href = "simulator.html";

    };

}


var learnBtn = document.getElementById("learnBtn");

if (learnBtn) {

    learnBtn.onclick = function () {

        window.location.href = "learn.html";

    };

}



/* ---------- Accordion Logic ---------- */

var acc = document.getElementsByClassName("accordion");

for (var i = 0; i < acc.length; i++) {

    acc[i].addEventListener("click", function () {

        this.classList.toggle("active");

        var panel = this.nextElementSibling;

        if (panel.style.maxHeight) {

            panel.style.maxHeight = null;

        } else {

            panel.style.maxHeight =
                panel.scrollHeight + "px";

        }

    });

}



/* ---------- Measurement + Operator Logic ---------- */

var measureBtn = document.getElementById("measureBtn");

if (measureBtn) {

    measureBtn.addEventListener("click", function () {

        var a = parseFloat(
            document.getElementById("coeffA").value
        );

        var b = parseFloat(
            document.getElementById("coeffB").value
        );

        if (isNaN(a) || isNaN(b)) {

            alert("Please enter values for a and b");

            return;

        }


        /* Get Selected Operator */

        var operator =
            document.getElementById("operatorSelect").value;



        /* Apply Operator */

        if (operator === "pauliX") {

            var temp = a;

            a = b;

            b = temp;

        }


        if (operator === "pauliZ") {

            b = -b;

        }


        if (operator === "hadamard") {

            var newA =
                (a + b) / Math.sqrt(2);

            var newB =
                (a - b) / Math.sqrt(2);

            a = newA;

            b = newB;

        }



        /* Calculate Probabilities */

        var p0 = a * a;

        var p1 = b * b;

        var total = p0 + p1;


        var message = "";

        if (total !== 1) {

            p0 = p0 / total;
            p1 = p1 / total;

            message =
                "⚠ State normalized automatically";

        }


        /* Show Message */

        document.getElementById(
            "normalizationMsg"
        ).innerText = message;

        /* Update Probability Bars */

            var width0 = p0 * 100;
            var width1 = p1 * 100;

            document.getElementById("bar0").style.width =
                width0 + "%";

            document.getElementById("bar1").style.width =
                width1 + "%";

        
                /* Update Labels */

            document.getElementById("label0").innerText =
                "P(0) = " + p0.toFixed(3);

            document.getElementById("label1").innerText =
                "P(1) = " + p1.toFixed(3);

        document.getElementById(
            "outputState"
        ).innerHTML =

            "\\(|\\psi\\rangle = "
            + a.toFixed(3) + "|0\\rangle + "
            + b.toFixed(3) + "|1\\rangle\\)";



        /* Refresh MathJax */

        if (window.MathJax) {

            MathJax.typeset();

        }

    });

}

/* ---------- Operator Matrix Display ---------- */

var operatorSelect =
    document.getElementById("operatorSelect");

if (operatorSelect) {

    operatorSelect.addEventListener(
        "change",
        function () {

            var matrixText = "";

            var op = this.value;


            if (op === "identity") {

                matrixText =
                    "\\( \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\end{bmatrix} \\)";

            }


            if (op === "pauliX") {

                matrixText =
                    "\\( \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix} \\)";

            }


            if (op === "pauliZ") {

                matrixText =
                    "\\( \\begin{bmatrix} 1 & 0 \\\\ 0 & -1 \\end{bmatrix} \\)";

            }


            if (op === "hadamard") {

                matrixText =
                    "\\( \\frac{1}{\\sqrt{2}} \\begin{bmatrix} 1 & 1 \\\\ 1 & -1 \\end{bmatrix} \\)";

            }


            document.getElementById(
                "operatorMatrix"
            ).innerHTML = matrixText;


            /* Refresh MathJax */

            if (window.MathJax) {

                MathJax.typeset();

            }

        }

    );

}