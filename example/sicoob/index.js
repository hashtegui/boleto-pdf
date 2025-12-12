const fs = require('fs')
const path = require('path')
const sicoobPDF = require('../../dist/index').sicoob

// Dados do boleto já prontos para gerar o PDF
const boleto = {
  barcodeData: '75691726700000125001234567890123456789012',
  digitableLine: '75691.23456 67890.123458 67890.123456 1 72670000125000',
  paymentPlace: 'Pagável em qualquer banco até o vencimento.',
  beneficiary: 'COOPERATIVA EXEMPLO LTDA - CNPJ: 12.345.678/0001-90',
  beneficiaryAddress:
    'Av das Cooperativas, 500 - Centro - Brasília/DF - CEP 70000-000',
  instructions:
    'Após o vencimento cobrar multa de 2,00%, mais juros ao mês de 1,00%.',
  bank: '756',
  agency: '4321',
  agencyDigit: '0',
  account: '98765',
  accountDigit: '4',
  expirationDay: new Date(2024, 11, 31), // 31/12/2024
  documentDate: new Date(2024, 11, 1), // 01/12/2024
  processingDate: new Date(2024, 11, 1), // 01/12/2024
  card: '1',
  documentNumber: '12345-6',
  formatedOurNumber: '1/98765432-1',
  formatedValue: 'R$ 1.250,00',
  documentType: 'DM',
  accept: 'N',
  currencyType: 'Real (R$)',
  amount: ' ',
  billValue: ' ',
  valueOf: ' ',
  descountValue: ' ',
  otherDiscounts: ' ',
  feeValue: ' ',
  outherFees: ' ',
  chargeValue: ' ',
  payer: {
    name: 'Maria dos Santos Silva',
    registerNumber: '987.654.321-00',
    street: 'Rua das Acácias',
    number: '456',
    complement: 'Casa 2',
    district: 'Jardim Europa',
    city: 'Brasília',
    state: 'DF',
    postalCode: '70000-100'
  },
  guarantor: {
    name: 'Empresas Associadas Ltda',
    registerNumber: '11.222.333/0001-44',
    street: 'Av Principal',
    number: '1000',
    district: 'Centro',
    complement: 'Sala 201',
    city: 'Brasília',
    state: 'DF',
    postalCode: '70000-200'
  },
  recibo: {
    beneficiaryAddress:
      'Av das Cooperativas, 500 - Centro - Brasília/DF - CEP 70000-000',
    agency: '4321',
    agencyDigit: '0',
    expirationDay: new Date(2024, 11, 31), // 31/12/2024
    documentDate: new Date(2024, 11, 1), // 01/12/2024
    processingDate: new Date(2024, 11, 1), // 01/12/2024
    card: '1',
    documentNumber: '12345-6',
    formatedOurNumber: '1/98765432-1',
    formatedValue: 'R$ 1.250,00',
    descountValue: ' ',
    otherDiscounts: ' ',
    feeValue: ' ',
    outherFees: ' ',
    chargeValue: ' ',
    payer: {
      name: 'Maria dos Santos Silva',
      registerNumber: '987.654.321-00',
      street: 'Rua das Acácias',
      number: '456',
      complement: 'Casa 2',
      district: 'Jardim Europa',
      city: 'Brasília',
      state: 'DF',
      postalCode: '70000-100'
    },
    guarantor: {
      name: 'Empresas Associadas Ltda',
      registerNumber: '11.222.333/0001-44',
      street: 'Av Principal',
      number: '1000',
      district: 'Centro',
      complement: 'Sala 201',
      city: 'Brasília',
      state: 'DF',
      postalCode: '70000-200'
    }
  }
}

// Gerar PDF do boleto Sicoob
sicoobPDF(boleto)
  .then(pdf => {
    const outputPath = path.join(__dirname, 'boleto-sicoob.pdf')
    fs.writeFile(outputPath, pdf, 'binary', err => {
      if (err) {
        console.log('Erro ao salvar PDF:', err)
        return
      }
      console.log('Boleto Sicoob gerado com sucesso: ' + outputPath)
    })
  })
  .catch(err => {
    console.log('Erro ao gerar boleto Sicoob:', err)
  })
