export default function (value) {
  let r = value / 1000
  return isNaN(r) ? 0 : r
}
