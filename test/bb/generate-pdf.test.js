import crypto from 'crypto'
import MockDate from 'mockdate'
import generatePDF from '../../src/bb/generate-pdf'

describe('genaratePdf main functionality', () => {
  beforeEach(() => {
    MockDate.set(1434319925275)

    global.Math.random = () => 0.5
  })

  it('generatePdf should generate a valid pdf file', async () => {
    const boleto = {
      barcodeData: '00190000090000000001234567890123456789012',
      digitableLine: '00190.00009 00000.000018 23456.789018 2 00000000001000',
      paymentPlace: 'PAGÁVEL EM QUALQUER BANCO ATÉ O VENCIMENTO.',
      beneficiary: 'EMPRESA TESTE LTDA - CNPJ 12.345.678/0001-90',
      beneficiaryAddress: 'AV PRINCIPAL, 1000 - CENTRO - BELO HORIZONTE/MG',
      instructions:
        'Após o vencimento cobrar multa de 2% e juros de 1% ao mês.',
      agency: '1234',
      agencyDigit: '5',
      account: '12345',
      accountDigit: '6',
      bank: '001-9',
      expirationDay: new Date(2017, 7, 30), // 30/08/2017
      documentDate: new Date(2017, 7, 18), // 18/08/2017
      processingDate: new Date(2017, 7, 18), // 18/08/2017
      card: '17',
      documentNumber: '12345-1',
      formatedOurNumber: '00000000001-2',
      formatedValue: 'R$ 1.000,00',
      documentType: 'DM',
      accept: 'N',
      currencyType: 'Real (R$)',
      amount: ' ',
      valueOf: ' ',
      descountValue: ' ',
      otherDiscounts: ' ',
      feeValue: ' ',
      outherFees: ' ',
      chargeValue: ' ',
      qrcode: '',
      payer: {
        name: 'CLIENTE TESTE LTDA',
        registerNumber: '12.345.678/0001-90',
        street: 'RUA TESTE',
        number: '100',
        complement: ' ',
        district: 'CENTRO',
        city: 'BELO HORIZONTE',
        state: 'MG',
        postalCode: '30000-000'
      },
      guarantor: {
        name: 'AVALISTA TESTE LTDA',
        registerNumber: '98.765.432/0001-10',
        street: 'AV TESTE',
        number: '200',
        district: 'CENTRO',
        complement: ' ',
        city: 'BELO HORIZONTE',
        state: 'MG',
        postalCode: '30000-000'
      }
    }

    const blob = await generatePDF(boleto)
    const tree = blob.toString()

    const hash = crypto
      .createHash('sha1')
      .update(tree)
      .digest('hex')

    expect(hash).toMatchSnapshot()
  })
})
