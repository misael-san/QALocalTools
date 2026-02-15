document.addEventListener('DOMContentLoaded', () => {
    
    // Función principal de generación
    function generateTemplate() {
        // 1. Leemos el template base DESDE EL HTML (RAW STRING)
        // Usamos .textContent para obtener el texto puro sin interpretaciones
        let finalOutput = document.getElementById('template-base').textContent;

        // 2. Iteramos por las 7 posiciones
        for (let i = 1; i <= 7; i++) {
            const inputElement = document.getElementById(`pos${i}`);
            let valueToUse = "";

            // Verificamos si el usuario escribió algo
            if (inputElement && inputElement.value !== "") {
                // Usamos el texto del usuario tal cual
                valueToUse = inputElement.value;
            } else {
                // Si no, buscamos el valor por defecto en el HTML (RAW STRING)
                const defaultScript = document.getElementById(`default-${i}`);
                if (defaultScript) {
                    valueToUse = defaultScript.textContent;
                }
            }

            // 3. Reemplazo simple de string
            // Buscamos [[POS_X]] y pegamos el texto
            finalOutput = finalOutput.replace(`[[POS_${i}]]`, valueToUse);
        }

        // 4. Mostrar resultado
        document.getElementById('resultOutput').value = finalOutput;
    }

    // Función para copiar
    function copyToClipboard() {
        const outputText = document.getElementById('resultOutput');
        outputText.select();
        document.execCommand('copy');
        
        const btn = document.getElementById('copyButton');
        const originalText = btn.innerText;
        btn.innerText = "COPIED!";
        setTimeout(() => btn.innerText = originalText, 2000);
    }

    // Event Listeners
    document.getElementById('generateButton').addEventListener('click', generateTemplate);
    document.getElementById('copyButton').addEventListener('click', copyToClipboard);
});