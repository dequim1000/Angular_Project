export function isValidEmail(email: string) {
  const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  return emailRegex.test(email);
}

export function isValidPhone(phoneNumber: string) {
  const phoneRegex = new RegExp(
    /^(?:(?:\+|00)?(55)\s?)?(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/
  );
  return phoneRegex.test(phoneNumber);
}

export function isValidName(name: string) {
  const nameRegex = new RegExp(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ'\s]+$/);
  return nameRegex.test(name);
}

export function isValidCpf(cpf: string): boolean {
  if (!cpf) {
    return false;
  }

  let cpfNumero: string = cpf.replace(/[^\d.-]/g, '');
  if (cpfNumero != cpf) {
    return false;
  }

  cpf = cpf.replace(/[.-]/g, '');
  if (cpf.length !== 11) {
    return false;
  }

  let numeros: string;
  let digitos, soma, i, resultado, digitosIguais: number;
  digitosIguais = 1;

  for (i = 0; i < cpf.length - 1; i++) {
    if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
      digitosIguais = 0;
      break;
    }
  }

  if (!digitosIguais) {
    numeros = cpf.substring(0, 9);
    digitos = cpf.substring(9);
    soma = 0;
    for (i = 10; i > 1; i--) {
      soma += parseInt(numeros.charAt(10 - i)) * i;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    if (resultado !== parseInt(digitos.charAt(0))) {
      return false;
    }

    numeros = cpf.substring(0, 10);
    soma = 0;

    for (i = 11; i > 1; i--) {
      soma += parseInt(numeros.charAt(11 - i)) * i;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    if (resultado !== parseInt(digitos.charAt(1))) {
      return false;
    }

    return true;
  }

  return false;
}

export function isValidCnpj(cnpj: string): boolean {
  if (!cnpj) {
    return false;
  }

  let cnpjNumero: string = cnpj.replace(/[^\d.\-\/]/g, '');
  if (cnpjNumero != cnpj) {
    return false;
  }

  cnpj = cnpj.replace(/[.\-\/]/g, '');
  if (cnpj.length !== 14) {
    return false;
  }

  let soma = 0;
  let peso = 5;

  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj.charAt(i)) * peso--;
    if (peso < 2) {
      peso = 9;
    }
  }

  let digito = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (digito !== parseInt(cnpj.charAt(12))) {
    return false;
  }

  soma = 0;
  peso = 6;

  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpj.charAt(i)) * peso--;
    if (peso < 2) {
      peso = 9;
    }
  }

  digito = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (digito !== parseInt(cnpj.charAt(13))) {
    return false;
  }

  return true;
}

export function isValidCEP(cep: string): boolean {
  if (!cep) {
    return false;
  }

  let cepNumero: string = cep.replace(/[^\d.\-\/]/g, '');
  if (cepNumero != cep) {
    return false;
  }

  cep = cep.replace(/[.-]/g, '');
  if (cep.length !== 8) {
    return false;
  }

  return true;
}
