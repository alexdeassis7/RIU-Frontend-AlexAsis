# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine

# ✅ Copiamos solo la parte del navegador
COPY --from=build /app/dist/riu-heroes-frontend-alex-/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
