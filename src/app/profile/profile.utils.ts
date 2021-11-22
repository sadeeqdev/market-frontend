export function accountInitials(address: string) {
    let first = ''
    let last = ''
    if (address.toLowerCase().startsWith('0x') && address.length > 2) {
      first = address[2]
    }
    if (address.length > 0) {
      last = address[address.length-1]
    }
    if (first && last) {
      return `${first}${last}`
    } else {
      return '0X'
    }
}