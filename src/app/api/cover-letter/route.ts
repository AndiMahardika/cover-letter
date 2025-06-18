import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey});

export async function POST(request: Request) {
  const { cv, job } = await request.json();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-05-20",
    contents: [
      {
        role: "user",
        parts: [{text: `
            Buatkan saya sebuah cover letter dalam bahasa Indonesia yang sopan dan profesional berdasarkan informasi CV dan lowongan kerja berikut ini. 

            ⚠️ Penting:
            - Jangan awali atau akhiri dengan kalimat pengantar seperti "Berikut adalah..." atau "Demikian cover letter ini..."
            - Langsung tampilkan hasil akhir cover letter tanpa penjelasan tambahan.
            - Gunakan struktur dan format seperti ini:

            ---

            **[Nama Lengkap]**  
            [Alamat lengkap (jika ada)]  
            📞 [Nomor Telepon]  
            📧 [Email Aktif]  
            🔗 [Link LinkedIn dan/atau Portofolio (jika ada)]

            **Kepada Yth.**  
            HR Department  
            [Nama Perusahaan]  
            [Lokasi Perusahaan]

            Dengan hormat,

            Paragraf pembuka: sebutkan nama pelamar, latar belakang pendidikan secara singkat, dan posisi yang dilamar di perusahaan.

            Paragraf kedua: jelaskan pengalaman, keahlian teknis, proyek atau aplikasi yang pernah dikembangkan, tools atau teknologi yang pernah digunakan, serta relevansinya dengan posisi yang dilamar.

            Paragraf ketiga: tampilkan keahlian yang sesuai dengan kebutuhan perusahaan (berdasarkan lowongan), serta tunjukkan motivasi untuk belajar jika ada tools yang belum dikuasai.

            Paragraf keempat: gambarkan soft skill, pengalaman kerja tim, komunikasi, atau peran tambahan seperti asisten dosen atau mentor jika ada.

            Paragraf penutup: nyatakan antusiasme terhadap perusahaan dan posisi tersebut, serta harapan untuk diberi kesempatan wawancara.

            Hormat saya,  
            **[Nama Lengkap]**

            ---

            Gunakan data berikut untuk menyusun cover letter:

            - **Informasi CV**:
            Informasi CV:
            ${cv}

            Informasi Lowongan Kerja:
            ${JSON.stringify(job, null, 2)}

            Tolong hasilkan cover letter yang sesuai dengan struktur di atas, bahasa formal namun tidak kaku, dan langsung mengisi placeholder seperti nama perusahaan dan posisi yang dilamar. Jangan munculkan placeholder seperti [Nama Perusahaan] atau [Posisi yang dilamar] dalam hasil akhir.`
          }]
      }
    ],
  });

  // console.log(response.text);
  const result = response.text;

  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
}