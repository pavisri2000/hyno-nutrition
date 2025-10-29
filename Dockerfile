# Build React app
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

# Serve with nginx
FROM nginx:stable-alpine
# Ensure curl is available for healthchecks inside the nginx container
RUN apk add --no-cache curl
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
