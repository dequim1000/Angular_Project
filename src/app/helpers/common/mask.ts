export function maskNumber(value: string, mask: string): string {
  let maskedValue: string = '';
  let index: number = 0;

  if (value == undefined || value == null || value.trim() == '') {
    return '';
  }

  if (mask == undefined || mask == null || mask.trim() == '') {
    return value;
  }

  value = value.replace(/\D+/g, '');
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === '0' && index < value.length) {
      maskedValue += value[index];
      index++;
    } else if (mask[i] !== '0') {
      maskedValue += mask[i];
    }
  }

  return maskedValue;
}
