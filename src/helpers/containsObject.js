const containsObject = (obj, list) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i]._id === obj._id)
      return true
  }

  return false
}

export default containsObject