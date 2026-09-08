// Paste URL Web App dari Google Apps Script Anda di sini
const API_URL = "https://script.google.com/macros/s/AKfycbx_iAvQf8pQDlKAwgQ9CsgIzgdLPfb2tNrQ6u7NaXbVAQtxO1IyKU83f4C0nOgXSKCe/exec";

// Fungsi Helper Universal untuk Memanggil API Code.gs
async function callApi(action, payload = {}) {
    try {
        // Gunakan URLSearchParams untuk menghindari pembatasan CORS dan penanganan Redirect GAS
        const response = await fetch(API_URL, {
            method: 'POST',
            redirect: 'follow', // Wajib untuk mengikuti redirect bawaan Google Apps Script
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({ action: action, payload: payload })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API Error:", error);
        
        // Coba metode fallback menggunakan GET jika POST diblokir oleh browser
        try {
            const urlWithParams = `${API_URL}?action=${encodeURIComponent(action)}&payload=${encodeURIComponent(JSON.stringify(payload))}`;
            const getResponse = await fetch(urlWithParams, { method: 'GET' });
            return await getResponse.json();
        } catch (fallbackError) {
            console.error("Fallback API Error:", fallbackError);
            return { 
                success: false, 
                error: { message: "Gagal terhubung ke server database. Pastikan deployment Apps Script diset ke 'Anyone'." } 
            };
        }
    }
}
