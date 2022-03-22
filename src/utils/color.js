// hex颜色转rgb颜色
export function HexToRgb(str) {
  str = str.replace('#', '')
  let hxs = str.match(/../g)
  for (let i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16)
  return hxs
}

// rgb颜色转hex颜色
export function RgbToHex(a, b, c) {
  let hexs = [a.toString(16), b.toString(16), c.toString(16)]
  for (let i = 0; i < 3; i++) {
    if (hexs[i].length == 1) hexs[i] = '0' + hexs[i]
  }
  return '#' + hexs.join('');
}

// 加深
export function darken(color, level) {
  let rgbc = HexToRgb(color)
  for (let i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level))
  return RgbToHex(rgbc[0], rgbc[1], rgbc[2])
}

// 变淡
export function lighten(color, level) {
  let rgbc = HexToRgb(color)
  for (let i = 0; i < 3; i++) rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i])
  return RgbToHex(rgbc[0], rgbc[1], rgbc[2])
}