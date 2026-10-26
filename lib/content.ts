// 网站所有文案和图片都在这里改。
// 换成自己的照片：把图片放进 public/photos/，然后修改下面 photos 里的文件名和宽高。

export type Photo = { src: string; width: number; height: number; alt: string };

const photo = (file: string, width: number, height: number, alt: string): Photo => ({
  src: `/photos/${file}`,
  width,
  height,
  alt,
});

export const photos = {
  sea: photo('01.jpg', 1800, 1200, '黄昏的海面与落日'),
  dusk: photo('02.jpg', 1440, 1800, '暮色中层叠的山脊'),
  commercial: photo('03.jpg', 1440, 1800, '暗调光影中的香水瓶静物'),
  dunes: photo('04.jpg', 1800, 1200, '夕阳下的沙丘'),
  forest: photo('05.jpg', 1200, 1800, '晨雾中的树林'),
  portrait: photo('06.jpg', 1440, 1800, '阳光和树叶阴影中的女性人像'),
  aurora: photo('07.jpg', 1800, 1200, '雪夜水面上空的绿色极光'),
  wedding: photo('08.jpg', 1200, 1600, '婚礼当天的新人与香水细节'),
  lake: photo('09.jpg', 1800, 1200, '湖面倒映的远山'),
  photographer: photo('11.jpg', 1440, 1800, '逆光中手持相机的摄影师剪影'),
  neon: photo('10.jpg', 1200, 1600, '雨夜的霓虹灯'),
};

export const site = {
  brand: 'LUMEN',
  brandCn: '光隙',
  fullName: '光隙摄影 Lumen Studio',
  photographer: '林屿',
  photographerEn: 'Lin Yu',
  city: '上海',
  cityEn: 'Shanghai',
  timeZone: 'Asia/Shanghai',
  since: '2018',
  email: 'hello@lumen.studio',
  address: '上海市徐汇区武康路',
  hours: '周二至周日 10:00 — 20:00',
  availability: '2026 档期开放预约中',
  socials: [
    { label: '小红书', href: '#' },
    { label: '微博', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'Behance', href: '#' },
  ],
};

export const nav = [
  { label: '作品', en: 'Works', href: '#works' },
  { label: '服务', en: 'Services', href: '#services' },
  { label: '关于', en: 'About', href: '#about' },
  { label: '联系', en: 'Contact', href: '#contact' },
];

export const heroTrail = [
  photos.sea,
  photos.portrait,
  photos.aurora,
  photos.dusk,
  photos.neon,
  photos.dunes,
  photos.wedding,
  photos.lake,
  photos.commercial,
  photos.forest,
];

export const works = [
  { title: '潮汐之间', en: 'Between Tides', place: '安娜玛丽亚岛', year: '2018', category: '风光', photo: photos.sea },
  { title: '光影之间', en: 'Light & Shadow', place: '光影习作', year: '2026', category: '人像', photo: photos.portrait },
  { title: '暮色山脊', en: 'Dusk Ridge', place: '高尾山', year: '2025', category: '风光', photo: photos.dusk },
  { title: '极光之夜', en: 'Aurora Night', place: '瑞典', year: '2026', category: '旅拍', photo: photos.aurora },
  { title: '雨夜霓虹', en: 'Neon Rain', place: '大阪', year: '2025', category: '街头', photo: photos.neon },
  { title: '沙丘絮语', en: 'Dune Whispers', place: 'NEOM', year: '2023', category: '旅拍', photo: photos.dunes },
  { title: '雾林', en: 'Into the Mist', place: '瑞士', year: '2026', category: '风光', photo: photos.forest },
  { title: '镜湖', en: 'Mirror Lake', place: '班夫', year: '2022', category: '风光', photo: photos.lake },
];

export const services = [
  {
    title: '人像写真',
    en: 'Portrait',
    desc: '个人形象照、情侣写真、毕业照。自然光或棚拍，全程引导，不会摆姿势也能自然出片。',
    price: '¥ 899 起',
    photo: photos.portrait,
  },
  {
    title: '婚礼纪实',
    en: 'Wedding',
    desc: '不打扰的跟拍方式，记录仪式之外那些真实的眼泪、拥抱和笑声。',
    price: '¥ 6,800 起',
    photo: photos.wedding,
  },
  {
    title: '商业品牌',
    en: 'Commercial',
    desc: '产品、空间、品牌形象大片。从创意构思到成片交付，为品牌找到属于它的光。',
    price: '按需报价',
    photo: photos.commercial,
  },
  {
    title: '旅行跟拍',
    en: 'Travel',
    desc: '国内外目的地跟拍，路线规划与机位踩点全包，你只需要享受旅程。',
    price: '¥ 2,400 / 天起',
    photo: photos.dunes,
  },
];

export const about = {
  statement:
    '我相信好照片不是“拍”出来的，而是在光线、情绪和人恰好相遇的那一瞬间，被温柔地留住的。',
  bio: [
    '我是林屿，一名常驻上海的独立摄影师。2018 年辞去设计工作，背着相机走过了 36 座城市，也认识了上千位愿意把故事交给我的人。',
    '我偏爱自然光、真实的情绪和留白。比起完美的姿势，我更想拍下你放松时的样子：那才是你最好看的时候。',
  ],
  stats: [
    { value: 8, suffix: '+', label: '年拍摄经验' },
    { value: 1200, suffix: '+', label: '位合作客户' },
    { value: 36, suffix: '', label: '座城市足迹' },
    { value: 98, suffix: '%', label: '客户好评率' },
  ],
};

export const process = [
  { title: '沟通', en: 'Talk', desc: '聊聊你想要的感觉、场景和用途，确定拍摄方向与预算。' },
  { title: '策划', en: 'Plan', desc: '提供参考图、服装建议和场地方案，提前把每个细节想好。' },
  { title: '拍摄', en: 'Shoot', desc: '轻松的现场氛围，全程引导，你只需要做自己。' },
  { title: '交付', en: 'Deliver', desc: '7–14 天交付精修，原片全送，支持线上相册与印刷。' },
];
