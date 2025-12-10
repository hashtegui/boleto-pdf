import crypto from 'crypto'
import MockDate from 'mockdate'
import generatePDF from '../../src/safra/generate-pdf'

describe('generatePdf main functionality', () => {
  beforeEach(() => {
    MockDate.set(1434319925275)

    global.Math.random = () => 0.5
  })

  it('generatePdf should generate a valid pdf file', async () => {
    const boleto = {
      barcodeData: '42291234500000125001234567890123456789012',
      digitableLine: '42299.12345 67890.123456 78901.234567 9 12345000012500',
      paymentPlace: 'Pagável em qualquer banco até o vencimento.',
      beneficiary: 'EMPRESA TESTE LTDA - CNPJ: 12.345.678/0001-90',
      beneficiaryAddress:
        'Av Paulista, 1000 - Bela Vista - São Paulo/SP - CEP 01310-100',
      instructions:
        'Após o vencimento cobrar multa de 2,00%, mais juros ao mês de 1,00%.',
      bank: '422-7',
      agency: '0123',
      agencyDigit: '4',
      account: '12345',
      accountDigit: '6',
      expirationDay: new Date(2017, 7, 30), // 30/08/2017
      documentDate: new Date(2017, 7, 18), // 18/08/2017
      processingDate: new Date(2017, 7, 18), // 18/08/2017
      card: '101',
      documentNumber: '98765-4',
      formatedOurNumber: '000012345678-9',
      formatedValue: 'R$ 9,90',
      documentType: 'DM',
      accept: 'N',
      currencyType: 'R$',
      amount: ' ',
      billValue: ' ',
      valueOf: ' ',
      descountValue: ' ',
      otherDiscounts: ' ',
      feeValue: ' ',
      outherFees: ' ',
      chargeValue: ' ',
      payer: {
        name: 'João da Silva Santos',
        registerNumber: '123.456.789-00',
        street: 'Rua das Flores',
        number: '123',
        complement: 'Apto 45',
        district: 'Centro',
        city: 'São Paulo',
        state: 'SP',
        postalCode: '01000-000'
      },
      guarantor: {
        name: 'Tech Solutions Ltda',
        registerNumber: '98.765.432/0001-10',
        street: 'Av Faria Lima',
        number: '500',
        district: 'Pinheiros',
        complement: 'Sala 1001',
        city: 'São Paulo',
        state: 'SP',
        postalCode: '01452-000'
      },
      recibo: {
        payer: {
          name: 'João da Silva Santos',
          registerNumber: '123.456.789-00',
          street: 'Rua das Flores',
          number: '123',
          complement: 'Apto 45',
          district: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          postalCode: '01000-000'
        },
        guarantor: {
          name: 'Tech Solutions Ltda',
          registerNumber: '98.765.432/0001-10',
          street: 'Av Faria Lima',
          number: '500',
          district: 'Pinheiros',
          complement: 'Sala 1001',
          city: 'São Paulo',
          state: 'SP',
          postalCode: '01452-000'
        },
        agency: '0123',
        agencyDigit: '4',
        expirationDay: new Date(2017, 7, 30),
        documentDate: new Date(2017, 7, 18),
        processingDate: new Date(2017, 7, 18),
        card: '101',
        documentNumber: '98765-4',
        formatedOurNumber: '000012345678-9',
        formatedValue: 'R$ 9,90',
        descountValue: ' ',
        otherDiscounts: ' ',
        feeValue: ' ',
        outherFees: ' ',
        chargeValue: ' ',
        beneficiaryAddress:
          'Av Paulista, 1000 - Bela Vista - São Paulo/SP - CEP 01310-100'
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
