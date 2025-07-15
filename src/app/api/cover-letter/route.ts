import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey});

export async function POST(request: Request) {
  const { cvText, jobData, language } = await request.json();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite-preview-06-17",
    contents: [
      {
        role: "user",
        parts: [{
          text: 
          ` Buatkan **output dalam format JSON** dengan struktur sebagai berikut:
            {
              "coverLetter": "", 
              "compatibility": {
                "percentage": "", 
                "strong_match": "", 
                "experience_level": "", 
                "minor_gap": ""
              }
            }

            ⚠️ Ketentuan:
            - "coverLetter": Surat lamaran kerja dalam bahasa ${language}, formal tapi tidak kaku, berdasarkan informasi CV dan lowongan di bawah.
            - "percentage": Angka kecocokan keseluruhan antara CV dan lowongan (dalam persentase, tanpa simbol %).
            - "strong_match": Paragraf pendek yang menjelaskan dengan bahasa ${language} formal dan tidak terlalu kaku dan menggunakan kata "kamu" aspek-aspek yang paling cocok antara kamu dan posisi yang dilamar.
            - "experience_level": Paragraf pendek dengan bahasa ${language} formal dan tidak terlalu kaku yang menjelaskan seberapa cocok pengalaman kamu dengan persyaratan lowongan.
            - "minor_gap": Paragraf pendek dengan bahasa ${language} formal dan tidak terlalu kaku yang menyebutkan kekurangan kecil atau hal yang perlu kamu tingkatkan agar lebih sesuai dengan lowongan.

            📌 Format **cover letter** wajib mengikuti struktur ini:

            <p><strong>[Nama Lengkap]</strong><br>
            📞 [Nomor Telepon]<br>
            📧 [Email Aktif]</p>

            <p>[lokasi , tanggal/bulan/tahun]</p>

            <p><strong>Kepada: HR Devisi [Nama Perusahaan]</strong></p>

            <p>Dengan hormat, <br>
            Paragraf 1: Perkenalan singkat, posisi yang dilamar, dan alasan tertarik.</p>

            <p>Paragraf 2: Penjabaran skill dan pengalaman relevan (magang, proyek, atau bootcamp).</p>

            <p>Paragraf 3: Penutup, harapan ke tahap wawancara, dan ucapan terima kasih.</p>

            <p>Hormat saya,<br>
            <strong>[Nama Lengkap]</strong></p>

            📎 Gunakan data berikut:

            - CV:
            ${cvText}

            - Lowongan Kerja:
            ${JSON.stringify(jobData, null, 2)}

            ⚠️ Penting
            - Jangan tampilkan placeholder seperti [Nama Perusahaan] atau [Posisi yang dilamar] dalam hasil akhir.  
            - Format keluaran wajib valid JSON seperti struktur di atas.
            - Jangan gunakan tag HTML seperti <strong>, <em>, atau lainnya dalam bagian compatibility (strong_match, experience_level, minor_gap).`
        }]
      }
    ],
  });

  const result = response.text;
  let responseJson = result?.replace(/```json|```/g, "").trim();

  return new Response(responseJson, {
    headers: { "Content-Type": "application/json" },
  });
}