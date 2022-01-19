let i = 1
while (i<1111) {
  // console.log(Math.random())
  let x = Math.floor(Math.random()*101)
  console.log(x)
  i += 1
  if (x === 100) {
    console.log(i +" "+ "WIN !!")
    return
  }
}
