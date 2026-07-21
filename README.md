# 📅 Daily AI Planner

Daily AI Planner, dağınık ve belirsiz günlük planlarınızı, hedeflerinizi ve yapılacaklar listelerinizi analiz ederek mantıklı, gerçekçi ve saatlere bölünmüş bir zaman çizelgesine (timeline) dönüştüren yapay zeka destekli bir asistan uygulamasıdır. 
## 🚀 Proje Hakkında

Bu proje, kullanıcı tarafından girilen doğal dildeki görevleri alır ve Google Gemini tabanlı yapay zeka sayesinde aşağıdaki şekilde yapılandırılmış bir günlük plan oluşturur:

- Görevleri saat bloklarına ayırır
- Büyük görevleri mantıklı alt görevlere böler
- Mola araları önerir
- Önceliklendirme yapar (High/Medium/Low)

## ⚙️ Özellikler

- FastAPI tabanlı backend
- Gemini yapay zeka entegrasyonu
- CORS desteğiyle frontend bağlantısı
- JSON formatında yapılandırılmış günlük plan çıktısı

## 📁 Proje Yapısı

- `main.py`: FastAPI uygulaması ve temel route tanımları
- `app/ai_service.py`: Yapay zeka API çağrısı ve cevap işleme
- `app/prompts.py`: Gemini modeline gönderilen sistem promptu
- `frontend/`: Basit HTML/JS/CSS ön yüz örneği

## 🧩 Nasıl Çalışır

1. Kullanıcı `POST /plan` isteği ile günlük plan içeriğini gönderir.
2. Backend `generate_daily_plan` fonksiyonunu çağırır.
3. Fonksiyon Gemini modeline kullanıcı girdisini ve sistem promptunu gönderir.
4. Modelden dönen JSON yanıt, frontend veya başka bir istemciye iletilir.

## 💻 Kurulum

1. Depoyu klonlayın
```bash
git clone <repo-url>
cd Daily-AI-Planner
```

2. Sanal ortam oluşturun ve aktivasyon yapın
```bash
python -m venv venv
source venv/bin/activate
```

3. Gereksinimleri yükleyin
```bash
pip install -r requirements.txt
```

4. `.env` dosyasına Gemini API anahtarını ekleyin
```
GEMINI_API_KEY=your_api_key_here
```

5. Uygulamayı başlatın
```bash
uvicorn main:app --reload
```

## 🧪 Kullanım

- API root: `http://127.0.0.1:8000/`
- Plan oluşturma endpointi: `POST http://127.0.0.1:8000/plan`
- Gönderilecek veri tipi: `string` (metin olarak günlük plan)

Örnek `curl` isteği:
```bash
curl -X POST "http://127.0.0.1:8000/plan" -H "Content-Type: application/json" -d '{"user_input":"Sabah ofise git, toplantı yap, proje taslağını hazırla, spor yap"}'
```

## 📝 Önerilen Geliştirmeler

- Frontend için kullanıcı dostu bir arayüz ekleme
- Daha fazla yapı şeması ve doğrulama sağlama
- Zaman dilimi ve tarih desteği ekleme
- Kullanıcı hesabı ve kişiselleştirme özellikleri

## 📌 Notlar

- Proje Gemini API anahtarı gerektirir.
- Model yanıtları JSON formatında olmalıdır.
- `app/prompts.py` içindeki `SYSTEM_PROMPT` metnini ihtiyaçlara göre özelleştirebilirsiniz.

## 📜 Lisans

Bu proje MIT lisansı altında yayımlanmıştır. Detaylar için `LICENSE` dosyasına bakabilirsiniz.