async function calculate() {
    const num1 = document.getElementById("num1").value;
    const num2 = document.getElementById("num2").value;
    const operation = document.getElementById("operation").value;
    const resultElement = document.getElementById("result");

    if (num1 === "" || num2 === "") {
        resultElement.textContent = "Result : Please enter both numbers.";
        return;
    }

    const baseUrl = window.location.origin && window.location.origin !== "null"
        ? window.location.origin
        : "http://localhost:5500";
    const url = `${baseUrl}/${operation}?num1=${encodeURIComponent(num1)}&num2=${encodeURIComponent(num2)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            resultElement.textContent = `Result : ${data.error || "Request failed"}`;
            return;
        }

        resultElement.textContent = data.error
            ? `Result : ${data.error}`
            : `Result : ${data.result}`;
    } catch (error) {
        resultElement.textContent = `Result : Unable to reach the API.`;
        console.error("Calculation request failed:", error);
    }
}