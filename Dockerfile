FROM node:20-slim

# Sistem bağımlılıklarını başta kur → cache avantajı olur
RUN apt-get update && apt-get install -y \
    libnss3 \
    libatk-bridge2.0-0 \
    libgtk-3-0 \
    libxss1 \
    libasound2 \
    libxshmfence1 \
    libxrandr2 \
    libgbm1 \
    libxdamage1 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libcairo2 \
    libatspi2.0-0 \
    libdrm2 \
    libxcomposite1 \
    libxfixes3 \
    fonts-liberation \
    libappindicator3-1 \
    xdg-utils \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Uygulama klasörünü oluştur
RUN mkdir /app
WORKDIR /app

# Sadece package bağımlılıklarını yüklemek için önce requirements dosyasını kopyala
COPY requirements.txt ./

# Bağımlılıkları yükle
RUN npm install -D $(cat requirements.txt) --force

# Geri kalan tüm kaynak kodunu kopyala
COPY . .

# Playwright için browser bağımlılıklarını kur
RUN npx playwright install --with-deps

# Testleri çalıştır
CMD ["npx", "playwright", "test"]
