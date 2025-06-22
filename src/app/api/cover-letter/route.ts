import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey});

export async function POST(request: Request) {
  const { cvText, jobData, language } = await request.json();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-04-17",
    contents: [
      {
        role: "user",
        parts: [{
          text: `
          Buatkan saya sebuah cover letter dalam bahasa ${language} yang sopan dan profesional berdasarkan informasi CV dan lowongan kerja berikut ini.

          ⚠️ Penting:
          - Jangan awali atau akhiri dengan kalimat pengantar seperti "Berikut adalah..." atau "Demikian cover letter ini..."
          - Langsung tampilkan hasil akhir cover letter tanpa penjelasan tambahan.
          - Gunakan struktur dan format seperti ini:

          <p><strong>[Nama Lengkap]</strong><br>
          📞 [Nomor Telepon]<br>
          📧 [Email Aktif]</p>

          <p>[lokasi , tanggal/bulan/tahun]</p>

          <p><strong>Kepada: HR Devisi [Nama Perusahaan]</strong></p>

          <p>Dengan hormat, <br>
          Paragraf 1: Perkenalan diri singkat, posisi yang dilamar, dan alasan tertarik mendaftar.</p>

          <p>Paragraf 2: Penjabaran skill dan pengalaman yang relevan dengan posisi yang dilamar. Jika belum memiliki pengalaman kerja, jelaskan pengalaman magang, proyek kuliah, atau hasil bootcamp yang bisa membantu memenuhi kebutuhan perusahaan.</p>

          <p>Paragraf 3: Penutup. Tegaskan bahwa skill dan pengalaman yang dimiliki sesuai dengan kualifikasi posisi, sampaikan harapan untuk bisa lanjut ke tahap wawancara, dan ucapkan terima kasih.</p>

          <p>Hormat saya,<br>
          <strong>[Nama Lengkap]</strong></p>

          Gunakan data berikut untuk menyusun cover letter:

          - **Informasi CV**:
          Informasi CV:
          ${cvText}

          Informasi Lowongan Kerja:
          ${JSON.stringify(jobData, null, 2)}

          Tolong hasilkan cover letter yang sesuai dengan struktur di atas, bahasa formal namun tidak kaku, dan langsung mengisi placeholder seperti nama perusahaan dan posisi yang dilamar. Jangan munculkan placeholder seperti [Nama Perusahaan] atau [Posisi yang dilamar] dalam hasil akhir.`
        }]
      }
    ],
  });

  const result = response.text;

  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
}