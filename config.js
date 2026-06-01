/**
 * 配置文件 - 修改这里来连接你的服务器
 */

module.exports = {
  // 服务器配置
  server: {
    host: 'your-server-address.com',  // 服务器地址，如: play.example.com
    port: 25565,                        // 服务器端口，默认 25565
    username: 'your-username',          // 你的游戏用户名
    auth: 'microsoft',                  // 认证方式: 'microsoft' 或 'offline'
    // 如果使用 offline 模式，需要设置为 'offline'
    // 如果使用正版登录，设置为 'microsoft'
  },

  // 寻怪配置
  mobHunter: {
    // 检测范围（方块）
    detectionRange: 64,
    
    // 优先寻找的怪物类型（可以根据需要修改）
    targetMobs: [
      'creeper',           // 爬行者
      'zombie',            // 僵尸
      'skeleton',          // 骷髅
      'spider',            // 蜘蛛
      'enderman',          // 末影人
      'witch',             // 女巫
      'slime',             // 史莱姆
      'ghast',             // 恶魂
      'blaze',             // 烈焰人
      'magma_cube',        // 岩浆怪
      'wither_skeleton',   // 凋灵骷髅
      'guardian',          // 守卫者
      'elder_guardian'     // 远古守卫者
    ],

    // 忽略的怪物类型
    ignoreMobs: [
      'bat',               // 蝙蝠（不伤人）
      'pig',               // 猪（非怪物）
      'cow',               // 牛（非怪物）
      'sheep',             // 羊（非怪物）
      'chicken',           // 鸡（非怪物）
      'horse',             // 马（非怪物）
    ],

    // 导航到怪物时的最小接近距离（方块）
    approachDistance: 5,

    // 是否在找到怪物后自动攻击
    autoAttack: false,

    // 更新频率（毫秒）
    updateInterval: 500,
  },

  // 日志配置
  logging: {
    enabled: true,
    level: 'info',  // 'debug', 'info', 'warn', 'error'
  }
};
