# CONTRIBUTING

## 开发

### 安装依赖

```bash
npm i
```

### 本地开发

```bash
npm run dev
```

### 目录结构

```text
├── docs // 组件文档与 demos
├── script // 构建代码
├── src // 组件代码
├── test // 测试文件
```



### md 文件 demo 引用

文档 demo 排列与 common 仓库中的 UI demo 展示一致

```text
::: demo <demo 路径如：demos/base> [demo标题] [--dev 是否只在开发环境插入]
[demo 描述（可不填）]
:::
```


### 单元测试 & e2e 测试文档

[组件测试文档](./test.md)


## git

### 分支

主仓库遵循使用 `git flow` 规范，新组件分支从 `develop checkout`：[https://nvie.com/posts/a-successful-git-branching-model/](https://nvie.com/posts/a-successful-git-branching-model/)

如果是贡献组件，则从 `develop checkout` 分支如：`feature/button`，记得如果同时要在子仓库开发 UI，子仓库也要 `checkout` 同名分支

> 关于fork

以下内容处理 `fork` 仓库后，远端仓库的更新如何同步到 `fork` 仓库

```bash
# 建立 upstream remote
git remote add upstream git@github.com:jiangxd2016/eurus-ui.git

# 更新 upstream
git fetch upstream develop

# 合并 upstream develop 到本地
git checkout develop

git merge upstream/develop
```

## 提交说明

项目使用基于 angular 提交规范：[https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)

每次提交会自动触发提交验证

- 使用工具 commitizen 协助规范 git commit 信息
- fix & feat 的提交会被用来生成 changelog
- 提交会触发 git pre-commit 检查，修复提示的 eslint 错误，

