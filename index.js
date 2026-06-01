/**
 * Minecraft 自动寻怪导航脚本
 * 主程序入口
 */

const mineflayer = require('mineflayer');
const { pathfinder, Movements } = require('mineflayer-pathfinder');
const config = require('./config');

// 创建 bot 实例
const bot = mineflayer.createBot({
  host: config.server.host,
  port: config.server.port,
  username: config.server.username,
  auth: config.server.auth,
});

// 加载 pathfinder 插件
bot.loadPlugin(pathfinder);

// ==================== 日志工具 ====================
const logger = {
  debug: (msg) => config.logging.enabled && config.logging.level === 'debug' && console.log(`[DEBUG] ${msg}`),
  info: (msg) => config.logging.enabled && ['debug', 'info'].includes(config.logging.level) && console.log(`[INFO] ${msg}`),
  warn: (msg) => config.logging.enabled && ['debug', 'info', 'warn'].includes(config.logging.level) && console.log(`[WARN] ${msg}`),
  error: (msg) => config.logging.enabled && console.log(`[ERROR] ${msg}`),
};

// ==================== 事件监听 ====================

bot.on('login', () => {
  logger.info('✓ 已成功连接到服务器');
  logger.info(`📍 玩家: ${bot.username}`);
  logger.info(`🎮 维度: ${bot.game.dimension}`);
});

bot.on('spawn', () => {
  logger.info('✓ 玩家已生成');
  logger.info('🔍 开始扫描怪物...');
  
  // 设置默认移动速度
  const movements = new Movements(bot);
  movements.allowSprinting = true;
  movements.allowParkour = true;
  bot.pathfinder.setMovements(movements);

  // 启动寻怪循环
  startMobHunting();
});

bot.on('end', () => {
  logger.warn('✗ 已断开连接');
  process.exit(0);
});

bot.on('error', (err) => {
  logger.error(`连接错误: ${err.message}`);
  process.exit(1);
});

// ==================== 寻怪核心逻辑 ====================

let isHunting = false;
let currentTarget = null;

/**
 * 启动寻怪循环
 */
function startMobHunting() {
  setInterval(() => {
    if (isHunting) {
      return; // 已有目标在处理中
    }

    // 查找最近的怪物
    const nearestMob = findNearestMob();

    if (nearestMob) {
      isHunting = true;
      currentTarget = nearestMob;
      navigateToMob(nearestMob);
    } else {
      logger.debug('当前范围内没有目标怪物');
    }
  }, config.mobHunter.updateInterval);
}

/**
 * 查找最近的怪物
 * @returns {Object|null} 最近的怪物对象或 null
 */
function findNearestMob() {
  let nearestMob = null;
  let nearestDistance = config.mobHunter.detectionRange;

  // 遍历所有实体
  for (const entity of Object.values(bot.entities)) {
    // 跳过玩家和非怪物实体
    if (entity.type !== 'mob' && entity.type !== 'hostile') {
      continue;
    }

    // 获取怪物名称
    const mobName = entity.name ? entity.name.toLowerCase() : '';

    // 检查是否是目标怪物
    const isTargetMob = config.mobHunter.targetMobs.some(target => 
      mobName.includes(target.toLowerCase())
    );

    // 检查是否是忽略的怪物
    const isIgnoredMob = config.mobHunter.ignoreMobs.some(ignored => 
      mobName.includes(ignored.toLowerCase())
    );

    if (!isTargetMob || isIgnoredMob) {
      continue;
    }

    // 计算距离
    const distance = bot.player.entity.position.distanceTo(entity.position);

    // 更新最近的怪物
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestMob = entity;
    }
  }

  return nearestMob;
}

/**
 * 导航到怪物
 * @param {Object} mob - 目标怪物对象
 */
function navigateToMob(mob) {
  const mobName = mob.name || '未知怪物';
  const distance = bot.player.entity.position.distanceTo(mob.position);

  logger.info(`🎯 发现目标: ${mobName} (距离: ${distance.toFixed(1)}格)`);

  // 如果已经很近了，取消导航
  if (distance <= config.mobHunter.approachDistance) {
    logger.info(`✓ 已到达目标位置`);
    isHunting = false;
    
    if (config.mobHunter.autoAttack) {
      bot.attack(mob);
      logger.info(`⚔️ 开始攻击 ${mobName}`);
    }
    return;
  }

  // 使用 pathfinder 导航
  bot.pathfinder.goto(mob.position.plus(new (require('prismarine-vec3'))()).offset(0, 0, 0))
    .then(() => {
      logger.info(`✓ 已到达怪物位置`);
      
      if (config.mobHunter.autoAttack) {
        bot.attack(mob);
        logger.info(`⚔️ 开始攻击 ${mobName}`);
      }
      
      isHunting = false;
    })
    .catch((err) => {
      logger.warn(`⚠️ 导航失败: ${err.message}`);
      isHunting = false;
    });
}

// ==================== 辅助命令 ====================

/**
 * 聊天命令处理
 */
bot.on('chat', (username, message) => {
  if (username === bot.username) return; // 忽略自己的消息

  const command = message.trim().toLowerCase();

  switch (command) {
    case '!help':
      sendChat('📖 可用命令: !status, !stop, !start');
      break;

    case '!status':
      const targetInfo = currentTarget 
        ? `当前目标: ${currentTarget.name} (距离: ${bot.player.entity.position.distanceTo(currentTarget.position).toFixed(1)}格)`
        : '当前无目标';
      sendChat(`📊 状态: ${isHunting ? '搜索中' : '待机'} | ${targetInfo}`);
      break;

    case '!stop':
      isHunting = false;
      bot.pathfinder.stop();
      sendChat('⏸️ 寻怪已停止');
      break;

    case '!start':
      sendChat('▶️ 寻怪已启动');
      break;

    default:
      break;
  }
});

/**
 * 发送聊天消息
 * @param {string} message - 要发送的消息
 */
function sendChat(message) {
  bot.chat(message);
}

// ==================== 主程序入口 ====================

logger.info('🚀 Minecraft 自动寻怪机器人启动中...');
logger.info(`📌 连接到服务器: ${config.server.host}:${config.server.port}`);
logger.info(`👤 用户名: ${config.server.username}`);
