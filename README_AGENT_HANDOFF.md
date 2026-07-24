# 人类文明沙盒二次开发交接文档

> 更新日期：2026-07-24  
> 工作目录：`/home/wangy/sandboxels`  
> 当前状态：可在浏览器中试玩，自动化测试 97/97 通过，改动尚未提交到 Git。

## 1. 文档用途

这是基于 Sandboxels 1.13.2 的人类文明沙盒分支。原版仍负责像素、温度、反应、重力、存档和画布渲染；本分支在其上加入人类、聚落、领地、职业、资源物流、建筑、科技、战争、人物历史以及通用重叠规则。

本文是给后续 Agent 的主要交接入口。修改前请先阅读本文、相关测试和目标代码，不要根据残留的兼容字段推断当前玩法。

## 2. 启动与验证

项目不需要构建，也没有项目级 `package.json`。必须通过 HTTP 打开，不能只双击 HTML：

```bash
cd /home/wangy/sandboxels
python3 -m http.server 8000 --bind 127.0.0.1
```

浏览器打开：<http://127.0.0.1:8000/>

完整验证命令：

```bash
node --check scripts/human_society.js
git diff --check
node --test \
  tests/human_society_core.test.js \
  tests/human_society_world.test.js \
  tests/human_society_tech_data.test.js \
  tests/human_society_integration.test.js \
  tests/engine_overlap_speed.test.js
```

当前基线是 97 项测试全部通过。涉及 UI、渲染、存档或引擎重叠时，还应至少做一次桌面和移动端浏览器冒烟测试，并检查 `console` 和 `pageerror`。

## 3. Git 与工作区状态

当前人类文明实现是未提交工作，不能执行 `git reset --hard`、`git checkout --` 或删除未跟踪文件。交接时的预期状态是：

```text
 M README.md
 M index.html
 M lang/zh_cn.json
?? README_AGENT_HANDOFF.md
?? scripts/human_society.js
?? scripts/human_society_core.js
?? scripts/human_society_tech_data.js
?? scripts/human_society_world.js
?? tests/
```

`README.md` 现在还会因交接入口而显示为已修改，`README_AGENT_HANDOFF.md` 为新增文件。后续工作应在这些改动上继续，不要还原上游版本。

## 4. 代码地图

| 文件 | 职责 |
| --- | --- |
| `index.html` | 原版单页引擎；本分支在这里修改树木生长、像素辅助层、移动/碰撞、保存加载、1/2/3/5 倍速和元素交互设置 UI |
| `scripts/human_society_core.js` | 可脱离浏览器测试的纯规则：寿命、职业配额、时代晋级、研究选择、外交、投降、攻击意图、视线等 |
| `scripts/human_society_tech_data.js` | JSON 友好的六时代、48 项科技、条件、效果、燃料、配方和远程武器数据 |
| `scripts/human_society_world.js` | 领地列索引、建筑 3x3 贴图几何、资源预留、背包、人口目标、战争辅助和现实时间日志 |
| `scripts/human_society.js` | 浏览器适配和主要运行时：人物、聚落、AI、采集、树木、建筑、科技、战争、UI、日志、公开 API |
| `lang/zh_cn.json` | 本分支增加的中文文本；文明 UI 仍有部分中文直接写在 JS 中 |
| `tests/human_society_core.test.js` | 纯规则测试 |
| `tests/human_society_world.test.js` | 领地、建筑几何、资源选择、背包、人口和战争辅助测试 |
| `tests/human_society_tech_data.test.js` | 时代、科技图、材料门槛、燃料和配方数据测试 |
| `tests/human_society_integration.test.js` | 浏览器适配层的模拟集成测试 |
| `tests/engine_overlap_speed.test.js` | 引擎辅助层、重叠、关系移动、保存加载、倍速和树生长源码测试 |

浏览器脚本加载顺序固定，位于 `index.html` 尾部：

```text
human_society_core.js
human_society_tech_data.js
human_society_world.js
human_society.js
```

不要把 `human_society.js` 提前，否则依赖的三个全局对象尚未建立。

## 5. 当前有效玩法规则

### 5.1 人类、寿命与人口

- 玩家放置 `civilized_human` 后，会生成具有同一 `humanId` 的 `civ_head` 和 `civ_body` 关系对象。
- 至少两名相邻且稳定落地的人类经过 60 tick 会自主形成聚落，并立即建立城镇中心 `civ_banner`。
- 已取消饱食度，人不会饿死。
- 每个人出生年龄为 0，寿命均匀分布在 50 至 60 岁之间。`TICKS_PER_YEAR = 240`，即自然寿命为 12000 至 14400 模拟 tick。
- 没有“新生儿等待成年”的阶段。每个新人口生成后立即分配职业并工作。
- 每个聚落独立补充人口，只检查食物、时代目标人口和合法生成位置。每人消耗 2 食物，无出生冷却，不要求父母、住房或全局人口上限。
- 六个时代的理想人口依次为 6、8、12、16、20、24。单次文明结算会连续补充，直到达到目标、食物不足或没有位置。
- `civ_child` 仅用于加载旧存档；运行后会立即转换成统一工作人口并保留身份与历史。不要重新引入儿童阶段。

### 5.2 工作与职业

- 人物不会以 `idle` 作为稳定状态。任务结束后进入 `planning`，找不到目标时转为搜索、探索或巡逻。
- 采集者持续寻找并采集对应资源；背包满后运回相应设施，若地图上没有更多目标则会运回未满的部分背包。
- 建造者没有工地时巡逻；守卫持续在领地内巡逻；战士持续寻找敌人；设施职业在设施附近工作或巡逻。
- 当前主要职业包括 `food`、`wood`、`miner`、`builder`、`farmer`、`forester`、`hunter`、`artisan`、`industry`、`scholar`、`merchant`/`artisan_trade`、`guard`、`warrior` 和兜底 `worker`。
- 时代职业权重定义在 `human_society_tech_data.js` 和 `human_society_world.js`；配额使用确定性的最大余数法。

### 5.3 资源与物流

- AI 使用全图资源索引，不依赖局部“发现”才能知道资源位置。
- 采集优先级为本阵营领地，其次无主之地；不会主动采集其他阵营领地内的资源。
- 采集本质是破坏原方块并写入采集者背包。初始共享携带上限为 4，相关科技可提高到 6。
- 食物、木头、石头和矿物均需带回设施。木材通常送往伐木场，其他资源由对应仓储或城镇中心接收。
- 聚落库存可在文明面板的“资源”页强制修改，所有数值均限制为非负值。
- 首次实际采集到一种资源时立即写聚落日志，不必等资源送达。

### 5.4 树木与树苗

- `sapling`、`pinecone` 和 `bamboo_plant` 生长时不会产生任何树根。
- 新树在树干、树枝和树叶间传播 `treeId`/树种身份，接触的树冠仍能保持为不同树。
- 伐木工采集树的逻辑基点时会砍倒整棵树：树干、树枝、树叶和派生物全部消失。
- 每个木质树像素生成一个实体 `civ_wood_resource`；叶片不产木材。
- 收集每个实体木材时，基础 20% 概率获得对应抽象树苗资源：普通树苗、松树苗或竹苗。托管林业的相对 +25% 加成会使概率达到 25%。
- 每个实际进入人物背包的木材单位还会独立以 50% 概率获得 1 食物；砍树生成掉落和把木材运回仓库本身不会触发。背包已满时奖励食物会在采集点生成掉落。
- 树苗保存在 `stock.treeSaplings`，不再作为树木被砍时直接掉落的像素。
- 旧存档的树苗库存会从 `stock.seeds` 迁移。识别到的旧树正下方旧 `root`/`fiber` 网络会一次性转换为 `dirt`。
- 代码中的 `tree.root` 仍是兼容旧调用的“树逻辑基点”别名，不代表世界中存在树根像素。

### 5.5 建筑与领地

- 所有文明建筑只有一个 1x1 逻辑核心，画面贴图是阵营色 3x3 纯色方格。
- 逻辑核心位于 3x3 贴图的第三行第二列，即下边中间。默认贴图显示在普通像素之上。
- 擦除贴图覆盖区域不会删除建筑；必须擦除逻辑核心。删除核心后贴图永久消失，不会被重建。
- 建筑核心默认可与非建筑像素重叠，但两个新建筑核心不能占据同一位置。
- 建筑之间至少需要在一个轴向留出两个空格。
- 每个建筑核心贡献横向 `x - 11` 到 `x + 11`、纵向无限的领地列。不同阵营按先到先得占领列，不重叠；同阵营建筑可以叠加领地声明。
- 建筑被删除后释放其声明；后来的声明可接管释放的列。
- 已实现的建筑核心包括城镇中心、房屋、农场、工坊、火塘、采石场、粮仓、窑、铸造厂、锻造厂、城堡、攻城工坊、图书馆、市场、塔、伐木场和城门。

### 5.6 通用重叠与显示层

- 引擎增加了辅助像素层，使多个允许重叠的对象不必替换 `pixelMap` 中的基础像素。
- 文明人类彼此默认可以无限重叠；高大植被和树木不会阻挡生物移动。
- 设置菜单提供“元素交互”编辑器，可按元素名设置：
  - 重叠：默认、允许、禁止。
  - 同种类重叠：默认、允许、禁止。
  - 允许同时重叠的多个元素名；任一方列出另一方即可生效。
  - 显示层：默认、最上层、普通层。
- 冲突判定优先级为：任意一方显式禁止 > 同类显式禁止 > 全局允许 > 同类允许 > 多元素允许列表 > 引擎默认规则。
- 设置应用后立即处理现有像素冲突，并将冲突对象移动到最近的合法位置。
- 规则写入 `settings.elementInteractions`，既持久化到本地设置，也属于存档的 `vitalSettings`。
- 建筑也服从该编辑器；把建筑设为普通层后，其 3x3 贴图会在普通像素之前绘制。

### 5.7 移动与挖洞

- 高层任务规划仍按 10 tick 进行，但已经进入任务的人物每 2 tick 最多执行一步位移；采集、建设等工作效率不随位移频率同步加速。
- 一格台阶优先通过一次斜向上关系移动直接踏上，不再先原地悬停一个思考周期。
- 所有文明成人都可无限沿有效固体墙面攀爬并翻越墙顶；攀爬依赖身体或头部左右侧墙面，不支持吸附天花板或倒挂移动。
- 文明成人 relation 使用自身托管重力；引擎通用 relation 重力不会在攀爬间隔把人物拉回地面。墙面支撑消失后，人物会重新受重力影响。
- 普通人物的移动不再自动破坏墙体；永久 `miner` 以及明确的石矿采集任务仍可把挖洞作为最终路径方案。只有矿工会收集挖出的石头和矿物。
- 人类在 `civ_tunnel` 中不下落，移动速度与平地相同。
- `TUNNEL_UNLOCK_ERA` 和旧临时矿工字段仍可能存在于兼容代码或保存白名单中，但不是当前规则。

### 5.8 科技与时代

- 共六个时代：部落、石器、农业、青铜、铁器、城堡。
- 每个时代固定 8 项科技，分生产、建设、社会、军事四个领域；共 48 项。
- 当前时代研发至少 6/8，即 75%，才能进入下一个时代。进入新时代理论上解锁新一层科技图。
- 科技具有知识成本、前置科技、资源/人口/里程碑等条件和实际效果。青铜、铁、钢路线包含不可绕过的材料门槛。
- 文明面板“科技”页显示所有时代、每项科技的条件、当前值、知识进度和研究状态。
- 未研发科技支持“未研发”和“标记重点”；重点研究队列可调整顺序。
- 玩家可强制完成科技，强制完成不消耗资源或知识。无论强制还是自然完成，科技均不可降级或改回其他状态。
- 同领域经验最多降低 25% 研究成本。
- 数据层只放 JSON 友好的声明，运行时注册和效果应用在 `human_society.js`。

### 5.9 战争与战斗

- 开战只有两条正式路径：玩家在文明面板强制宣战，或领地/无主地的不可再生资源持续枯竭后自动宣战。普通冲突和敌意记录不会自动开战。
- 战争不会签和平协议，会持续到一方因力量悬殊而被吞并。
- 战时军队规模以和平常备军的两倍为目标，并分为进攻兵和防守兵。进攻兵耗尽后，防守兵转为下一波进攻兵；新人口优先补充防守力量。
- 防守兵只在己方领地内追杀敌人；进攻兵优先消灭敌方防守兵，再攻击其他单位和建筑。
- 连续 180 tick 保持至少 3:1 的军事力量差距后，弱方加入强方。胜方获得弱方一半知识和一半科技进度，但不会因此直接解锁科技。
- 所有人都有徒手武器，遭受攻击会立即锁定攻击者进行反击。
- 徒手攻击覆盖以身体为中心的 3x3 范围；更长武器和远程武器使用各自范围与视线规则。
- 攻击锁定后在下一 tick 结算；只要发起时有效，即使目标随后离开范围仍会结算。所有有效攻击固定 50% 命中率。
- 当前没有攻击速度冷却；有效范围内可以连续发起攻击。
- 文明面板战争页提供三档和平模式：正常、仅禁止新战争、完全和平。仅禁止新战争会让既有战争继续；完全和平会暂停既有战争、攻击、反击和吞并，关闭后原战争继续且暂停时间不计入投降计时。
- 完全和平不阻止火焰、温度、自然老死等环境伤害，也不限制玩家直接擦除世界元素。
- 命中会产生至少一格击退；目标身后被不可重叠障碍物阻挡时不会穿透。
- 同 tick 攻击先聚合再结算，允许双方互相击杀。

### 5.10 日志、观察和管理 UI

- 顶部“文明”按钮打开文明面板，包含资源、科技、战争、日志和地图页。
- 聚落日志使用现实世界的本地年月日时分秒，记录出生、科技、时代、首次资源、建筑、战争、资源强改等事件；每个聚落保留最近 2000 条。
- 顶部“人物”按钮打开实时人物观察器，可筛选现存/逝者、阵营、聚落、职业和活动。
- 每个人记录当前语义任务、任务目标、进度、角色变更、移动、采集、建造、战斗等历史。每人保留最近 500 个已结束任务会话。
- 每个聚落保留最近 500 名逝者档案；重建索引和重复死亡处理不会重复归档。
- 点击人物可聚焦其世界位置。人物面板约每 250 ms 刷新一次。
- 人物列表行和详情都会显示背包中每种资源的数量以及当前总量/容量。
- 现存成人详情提供持续指挥按钮。开启后人物上方和目标位置会显示箭头/连线，右键可移动、采集合法资源或向本聚落合法设施归还全部资源，左键可攻击战争敌人或合法反击目标；指挥期间相关点击不会绘制或擦除，按 Esc 或再次点击按钮退出。
- 手动命令优先于日常 AI；人物背包满时会先归还，遭到攻击时可先自卫，随后重新验证并恢复原命令。移动命令复用原有攀爬和挖洞能力。
- 文明面板可强制改库存、设置科技状态、调整研究重点、强制宣战和开关领地/资源叠加层。

### 5.11 模拟速度

- TPS 控件按 1x、2x、3x、5x 循环，最高硬限制为 5x。
- 寿命、研究、战争等都按模拟 tick 计算，因此加速会同步加快这些系统的现实时间进度。

## 6. 公开调试 API

浏览器控制台可通过 `window.HumanSociety` 使用以下接口：

```text
config
registerResource(elementName, descriptor)
registerWeapon(id, descriptor)
registerEra(era)
registerTechnology(tech)
damageActor(actor, damage, source)
damageStructure(building, damage, source)
recordIncident(...)
atWar(factionA, factionB)
addKnowledge(factionId, amount, domain)
setResearchFocus(...)
setTechnologyState(factionId, techId, state)
moveResearchPriority(factionId, techId, newIndex)
setSettlementResources(factionId, settlementId, patch)
getFactionSnapshot(factionId, settlementId)
getFactionChronicle(factionId, options)
getPeopleSnapshot(options)
getPersonSnapshot(humanId)
getPersonHistory(humanId, options)
getWarSnapshot(factionId)
getPeaceMode()
setPeaceMode(mode)
declareWar(factionA, factionB, reason)
setMapOverlay(name, value)
getElementInteractionSettings(element)
setElementInteractionSettings(element, settings)
resetElementInteractionSettings(element)
getBuildingById(buildingId)
getBuildingCoreAt(x, y)
getTreeAt(x, y)
fellTreeAt(x, y, actor)
buildingVisualAt(x, y)
destroyBuilding(building, cause)
territoryOwnerAt(x, y)
openCivilizationPanel(factionId)
openPeoplePanel(humanId)
closePeoplePanel()
focusPerson(humanId)
setCommandPerson(humanId)
cancelPersonCommand()
issuePersonCommandAt(humanId, button, x, y)
getPersonCommandState()
forceReindex()
getDebugSnapshot()
```

常用示例：

```js
HumanSociety.getDebugSnapshot();
HumanSociety.getFactionSnapshot(1);
HumanSociety.setSettlementResources(1, 1, {
  food: 100,
  wood: 100,
  stone: 100,
  treeSaplings: { sapling: 10, pinecone: 10, bamboo_plant: 10 }
});
HumanSociety.setTechnologyState(1, "organized_gathering", "researched");
HumanSociety.setElementInteractionSettings("rock", {
  overlap: "allow",
  renderLayer: "normal"
});
```

实际函数签名以 `scripts/human_society.js` 末尾的 `Object.freeze` 导出为准。

## 7. 存档兼容与迁移

- 人物身份、关系、寿命、任务历史、阵营、聚落、建筑、研究、领地顺序和资源携带数据均通过像素元数据保存。
- 辅助重叠层会与主 `pixelMap` 一起保存和恢复，并在加载后重建关系和索引。
- 旧儿童转换为工作人口时保留 `humanId`、年龄和历史，并写一条迁移日志。
- 旧树苗库存迁移到 `stock.treeSaplings`。
- 旧树下的根网迁移为泥土，每棵树只处理一次。
- 元素重叠/层级设置保存在 `settings.elementInteractions`，同时进入关键设置存档。
- `forceReindex()` 可用于手工触发加载后索引修复，但正常流程会按周期自动重建。

## 8. 重要实现约束

1. 建筑 3x3 只是 Canvas 贴图，不是九个建筑像素。不要为贴图格创建实体，否则会破坏擦除、领地和碰撞语义。
2. 人类由头和身体组成一个关系。移动必须走关系级原子移动并支持失败回滚，不能分别移动两块像素。
3. `pixelMap` 只保存基础像素；允许重叠的对象可能在辅助层。查询、删除、替换、存档和移动必须同时考虑两层。
4. 新树依靠身份追踪整棵树。不要退回“相邻同类型像素全算一棵树”的算法，否则相接树冠会连锁消失。
5. `civ_child`、出生冷却、住房限制、全局人口上限和时代挖洞门槛是旧设计痕迹，不是当前玩法。
6. 科技完成不可逆；强制完成也必须走统一解锁和时代晋级逻辑。
7. 战争只能由资源枯竭或玩家命令开始。受击反击不等于宣战。
8. 领地按横向列计算且纵向无限，不要改成圆形或矩形局部区域。
9. 聚落日志用现实时间；寿命、研究、人口、战争和 AI 使用模拟 tick。不要混用两种时间。
10. 当前 UI 有中文硬编码和语言表并存的技术债。扩展时优先复用 `civilizationText()`，但不要在功能改动中顺手进行大规模国际化重构。

## 9. 已知风险与后续建议

- `human_society.js` 已超过 6400 行，是当前最大维护风险。新功能达到稳定边界后，可按“树木/资源”“建筑/领地”“人口/AI”“战争”“UI”逐步拆模块，但必须保持现有加载顺序和公开 API。
- 自动化测试覆盖规则和关键适配路径，但不能完全替代长时间涌现模拟。调整人口、路径、战争或资源优先级后，应至少运行一次多聚落、5x 速度的长时间试玩。
- 旧树没有原生 `treeId`，兼容识别采用有限邻接启发式；新生成树可靠，极端旧存档中相连树冠仍值得人工观察。
- 大人口、许多建筑、全图资源叠加和人物观察器同时开启时可能有性能压力。可用 `HumanSociety.getDebugSnapshot()` 查看平均和最大文明 tick 耗时。
- 当前理想人口 6 至 24 是刻意规则，不应被遗留的 `AUTONOMOUS_POPULATION_CAP = 120` 误导。
- 资源平衡和科技成本已经具备框架，但仍属于需要持续试玩调参的内容，不宜在没有数据的情况下大幅重写。

## 10. 后续 Agent 工作流程

1. 先运行完整测试，确认基线仍为 92/92。
2. 阅读与需求最接近的测试，再定位 `core`、`world`、`tech_data` 或浏览器适配层。
3. 纯规则优先放在可测试模块，不要继续把所有逻辑堆进 `human_society.js`。
4. 修改引擎重叠、移动或存档前，先理解 `pixelMap` 与辅助像素层的双层模型。
5. 为行为变化增加聚焦测试；不要删掉只因新实现“不方便通过”的回归测试。
6. 运行 `node --check`、`git diff --check` 和完整测试。
7. 启动 localhost，验证实际放置人类、形成聚落、面板交互、保存加载和控制台无错误。
8. 更新本文中的状态、测试数量、规则和已知风险，使下一位 Agent 不必从 Git diff 反推设计。

## 11. 当前验收基线

在继续新增功能前，以下行为应保持成立：

- 放置文明人类能形成头身关系，两名人类能建立聚落和城镇中心。
- 人口没有饥饿、出生即工作、寿命为 50 至 60 岁、无冷却补充到时代目标。
- 工人持续工作，人类和植被/其他人类重叠时不会堵死。
- 树不长根，整树砍伐后按木质格掉落木材，收集木材可能得到对应树苗。
- 建筑保持 1x1 核心、3x3 贴图、下中核心、顶层显示和按列领地。
- 所有人能挖洞，只有矿工收集洞中的石矿并完成运送后续作。
- 科技按 6/8 晋级，强制科技不可逆且免费，条件和当前值可见。
- 战争只由两种原因开始；和平模式三档切换、50% 命中、立即反击、击退和 3:1 吞并仍有效。
- 人物持续指挥可移动、采集、归还和合法攻击，且指挥点击不会触发普通绘制/擦除。
- 木材实际进入背包时以 50% 概率得到食物，人物列表与详情都显示逐项携带数量。
- 文明日志和人物当前/历史活动可实时查看。
- 元素重叠与显示层设置可立即生效、持久化并正确处理既有冲突。
- 速度只在 1x、2x、3x、5x 间切换，不能超过 5x。
