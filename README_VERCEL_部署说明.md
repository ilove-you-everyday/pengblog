# HALCYON · 参考界面重做版部署说明

## 本版界面

- 手机端顶部为带品牌、主题切换和菜单按钮的悬浮胶囊；页面向下滚动后胶囊收窄。
- 首页使用大标题、文章数/分类数、Clawd 吉祥物和大圆角文章卡片。
- Clawd 无外框、无底色卡片；点击时不会出现浏览器默认蓝色触摸高亮或指针焦点框，键盘焦点提示仍保留。
- 已移除标签导航、标签区和文章卡片标签展示。文章可选填写 `category` 分类。
- 关于页面底部显示 `@pwhilove@gmail.com` 与 `This is whhblog`。
- 没有内置示例文章和公开管理员入口。

## 自己写文章

参考 `文章怎么写.md`。新建 `content/posts/your-slug.md`，填写标题、唯一 slug、日期和可选分类，然后写 Markdown 正文。保存后重新部署。`published: false` 可用作草稿；没有文章时首页会保留空状态，不会生成示例内容。

## Vercel 配置

项目根目录必须包括 `package.json`、`public/`、`api/`、`scripts/`、`content/` 和 `vercel.json`。

- Framework Preset：Other
- Install Command：`npm install`
- Build Command：`npm run build`
- Output Directory：`dist`

项目根目录应直接对应 Git 仓库根目录，避免额外嵌套一层。无需 MongoDB 或管理员令牌。Twikoo 评论适配接口保留；真实生产评论是否可用取决于外部评论服务配置。

## 本地验证

- `npm test`：运行项目自动检查与 Twikoo 适配器测试。
- `npm run build`：通过检查后，从 Markdown 生成 `dist/`。

当前源码包已在本地完成自动检查和构建；这不代表它已经部署到正式域名。
