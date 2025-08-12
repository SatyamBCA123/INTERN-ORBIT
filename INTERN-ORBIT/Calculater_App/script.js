let input = document.getElementById('inputBox');
        let buttons = document.querySelectorAll('button');

        let string = "";

        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                let btnValue = e.target.innerText;

                if (btnValue === "=") {
                    try {
                        string = eval(string);  // Use eval() instead of Function()
                        input.value = string;
                    } catch {
                        input.value = "Error";
                        string = "";
                    }
                } else if (btnValue === 'AC') {
                    string = "";
                    input.value = "";
                } else if (btnValue === 'DEL') {
                    string = string.slice(0, -1);
                    input.value = string;
                } else {
                    string += btnValue;
                    input.value = string;
                }
            });
        });