# 🎮 Minecraft 自动寻怪导航脚本

一个基于 **mineflayer** 的 Minecraft Java 版本自动寻怪机器人，支持公网服务器连接，能够自动检测、定位和导航到附近的怪物。

## ✨ 功能特性

- ✅ 自动连接公网 Minecraft 服务器
- ✅ 实时扫描并检测附近的怪物
- ✅ 智能寻路导航到目标怪物
- ✅ 可配置的怪物类型过滤
- ✅ 支持自动攻击功能
- ✅ 实时日志输出
- ✅ 聊天命令交互

## 📋 系统要求

- **Node.js**: v14.0.0 或更高版本
- **npm**: v6.0.0 或更高版本
- **Minecraft Java 版本**: 1.12.x - 1.20.x
- **网络**: 能够访问你的 Minecraft 服务器

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/shengchenzxc/minecraft-auto-mob-hunter.git
cd minecraft-auto-mob-hunter
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置服务器信息

编辑 `config.js` 文件，填入你的服务器信息：

```javascript
server: {
  host: 'your-server-address.com',  // 你的服务器地址
  port: 25565,                       // 服务器端口（默认 25565）
  username: 'your-username',         // 你的游戏用户名
  auth: 'microsoft',                 // 认证方式
}
```

### 4. 启动脚本

```bash
npm start
```

## ⚙️ 配置说明

### 服务器配置

```javascript
server: {
  host: 'play.example.com',     // Minecraft 服务器地址
  port: 25565,                  // 服务器端口
  username: 'YourUsername',     // 游戏用户名
  auth: 'microsoft',            // 认证类型
}
```

**auth 认证方式选项：**
- `'microsoft'` - 正版 Microsoft 账户登录（推荐）
- `'offline'` - 离线模式（仅限离线服务器）

### 寻怪配置

```javascript
mobHunter: {
  detectionRange: 64,           // 怪物检测范围（方块）
  targetMobs: [...],            // 目标怪物类型
  ignoreMobs: [...],            // 忽略的怪物类型
  approachDistance: 5,          // 接近距离（方块）
  autoAttack: false,            // 是否自动攻击
  updateInterval: 500,          // 更新频率（毫秒）
}
```

## 🎯 支持的怪物类型

脚本默认支持以下怪物：

- 爬行者 (creeper)
- 僵尸 (zombie)
- 骷髅 (skeleton)
- 蜘蛛 (spider)
- 末影人 (enderman)
- 女巫 (witch)
- 史莱姆 (slime)
- 恶魂 (ghast)
- 烈焰人 (blaze)
- 岩浆怪 (magma_cube)
- 凋灵骷髅 (wither_skeleton)
- 守卫者 (guardian)
- 远古守卫者 (elder_guardian)

你可以在 `config.js` 中修改 `targetMobs` 数组来自定义目标怪物。

## 💬 聊天命令

在 Minecraft 中，其他玩家可以发送以下命令与机器人交互：

| 命令 | 功能 |
|------|------|
| `!help` | 显示帮助信息 |
| `!status` | 显示当前状态和目标 |
| `!stop` | 停止寻怪 |
| `!start` | 启动寻怪 |

## 📊 日志输出示例

```
[INFO] ✓ 已成功连接到服务器
[INFO] 📍 玩家: YourUsername
[INFO] 🎮 维度: minecraft:overworld
[INFO] ✓ 玩家已生成
[INFO] 🔍 开始扫描怪物...
[INFO] 🎯 发现目标: Creeper (距离: 25.3格)
[INFO] ✓ 已到达目标位置
```

## 🔧 常见问题

### Q1: 连接超时？
- 确保服务器地址和端口正确
- 检查网络连接是否正常
- 确保服务器允许你的 IP 连接

### Q2: 认证失败？
- 如果使用 `microsoft` 认证，确保账户登录信息正确
- 对于离线服务器，改用 `offline` 认证方式
- 首次使用 Microsoft 认证可能需要浏览器验证

### Q3: 机器人无法找到怪物？
- 检查 `detectionRange` 设置是否过小
- 确认 `targetMobs` 列表包含你想要的怪物
- 查看控制台日志了解怪物检测情况

### Q4: 路径寻找失败？
- 怪物可能位于无法到达的位置（如高空、深洞）
- 尝试增加 `approachDistance` 值
- 确保地形足够复杂以支持寻路

## 📚 依赖库

- **mineflayer** - Minecraft 机器人框架
- **mineflayer-pathfinder** - 路径寻找插件
- **mineflayer-physics-util** - 物理工具库

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## ⚠️ 免责声明

- 使用本脚本前，请确保已获得服务器管理员的授权
- 不同服务器可能有不同的规则，请遵守服务器条款
- 本脚本仅供学习和研究使用
- 使用本脚本造成的任何后果由用户自行承担

## 📞 支持

如有问题，请在 GitHub 上提交 Issue。

---

**祝你游戏愉快！** 🎮✨
