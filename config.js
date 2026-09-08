// Paste URL Web App dari Google Apps Script Anda di sini
const API_URL = "https://script.google.com/macros/s/AKfycbx_iAvQf8pQDlKAwgQ9CsgIzgdLPfb2tNrQ6u7NaXbVAQtxO1IyKU83f4C0nOgXSKCe/exec";

// Fungsi Helper Universal untuk Memanggil API Code.gs
async function callApi(action, payload = {}) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8', // Menghindari CORS preflight issue pada GAS
            },
            body: JSON.stringify({ action: action, payload: payload })
        });
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        return { success: false, error: { message: "Gagal terhubung ke server database." } };
    }
}