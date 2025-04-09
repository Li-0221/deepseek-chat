# 第一阶段：构建阶段
FROM node:20-alpine AS build-stage

WORKDIR /app
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

RUN npm config set registry https://registry.npmmirror.com

COPY .npmrc package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

#========================================



# 第二阶段：生产阶段
FROM nginx:stable-alpine AS production-stage

# 将构建的文件 /app/dist 复制到nginx的 /usr/share/nginx/html 目录
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
