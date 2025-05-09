FROM node:23-slim

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
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala (cache avantajı için önce bu adım)
COPY package*.json ./

# Tüm bağımlılıkları kur
RUN npm install --force

# Geri kalan tüm kaynak kodunu kopyala
COPY . .

# Playwright için browser bağımlılıklarını kur
RUN npx playwright install --with-deps

# Testleri çalıştır
CMD ["npx", "playwright", "test"]
