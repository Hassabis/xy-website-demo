# 光隙摄影 Lumen Studio

摄影工作室单页官网（Next.js 16 + Motion + Lenis）。

## 本地运行

```bash
npm install
npm run dev     # http://localhost:3000
```

## 修改内容

- **所有文案**：`lib/content.ts`（名字、邮箱、作品、服务、价格、数据、社交链接）
- **照片**：放进 `public/photos/`，在 `lib/content.ts` 的 `photos` 里改文件名和宽高
  - 建议长边 1800–2400px，JPG 即可，Next.js 会自动压缩成 AVIF/WebP
- **配色**：`app/globals.css` 顶部的 `:root` 变量（`--accent` 是主强调色）

## 部署到 Vercel

1. 推送到 GitHub
2. 在 vercel.com → Add New Project → 导入仓库 → Deploy（无需任何配置）
3. 在 Project → Settings → Domains 绑定自己的域名

## 演示内容与素材

本站保留原设计的演示品牌、联系方式、价格和业务数据。正式商用前请替换 `lib/content.ts` 中的资料；社交链接目前为占位链接。照片来源、作者和授权见 [IMAGE-CREDITS.md](IMAGE-CREDITS.md)，网页底部也提供来源页。
