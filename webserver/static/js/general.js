const colors = {
    green: {
      default: "rgba(101, 207, 15, 1)",
      half: "rgba(101, 207, 15, 0.45)",
      quarter: "rgba(101, 207, 15, 0.25)",
      zero: "rgba(101, 207, 15, 0)"
    }
  }

const getOpposite = (arr) => {
  const largest = Math.max(...arr);
  const oppositeArr = []
  arr.forEach(element => oppositeArr.push(largest - element))
  return oppositeArr
}