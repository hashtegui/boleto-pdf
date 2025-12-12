import formatDate from '../../commons/utils/format-date.js'

/**
 * Renderiza o cabeçalho do boleto do Banco Sicoob
 *
 * @param {Object} doc - Instância do PDFDocument
 * @param {Object} _ref - Dados do boleto
 * @param {Object} _ref2 - Configurações de layout
 */
export default function(doc, _ref, _ref2) {
  var digitableLine = _ref.digitableLine,
    paymentPlace = _ref.paymentPlace,
    beneficiary = _ref.beneficiary,
    beneficiaryAddress = _ref.beneficiaryAddress,
    agency = _ref.agency,
    agencyDigit = _ref.agencyDigit,
    account = _ref.account,
    accountDigit = _ref.accountDigit,
    expirationDay = _ref.expirationDay,
    documentDate = _ref.documentDate,
    processingDate = _ref.processingDate,
    card = _ref.card,
    documentNumber = _ref.documentNumber,
    formatedOurNumber = _ref.formatedOurNumber,
    formatedValue = _ref.formatedValue,
    descountValue = _ref.descountValue,
    otherDiscounts = _ref.otherDiscounts,
    feeValue = _ref.feeValue,
    outherFees = _ref.outherFees,
    chargeValue = _ref.chargeValue,
    recibo = _ref.recibo,
    payer = _ref.payer,
    guarantor = _ref.guarantor,
    bank = _ref.bank
  var startY = _ref2.startY,
    startX = _ref2.startX,
    smallGutterY = _ref2.smallGutterY,
    smallGutterX = _ref2.smallGutterX,
    line = _ref2.line,
    tableLimit = _ref2.tableLimit,
    lineColor = _ref2.lineColor,
    boxHeight = _ref2.boxHeight,
    gutterX = _ref2.gutterX,
    gutterY = _ref2.gutterY,
    smallFontSize = _ref2.smallFontSize,
    fontSize = _ref2.fontSize,
    largefontSize = _ref2.largefontSize,
    mediumFontSize = _ref2.mediumFontSize,
    fontBold = _ref2.fontBold,
    fontRegular = _ref2.fontRegular,
    logo = _ref2.logo

  doc.image(logo, startX + smallGutterX, startY + boxHeight, {
    height: 23
  })

  doc.rect(startX + 120, startY + boxHeight, line, boxHeight).fill(lineColor)

  doc
    .fontSize(largefontSize)
    .font(fontBold)
    .text(bank, startX + 130, startY + 8 + boxHeight)

  doc.rect(startX + 170, startY + boxHeight, line, boxHeight).fill(lineColor)

  doc
    .fontSize(largefontSize)
    .text('RECIBO DO SACADO', startX + 400, startY + 8 + boxHeight)

  doc.rect(startX, startY + boxHeight, tableLimit, line).fill(lineColor)

  // Box
  //doc.rect(startX, startY + boxHeight, tableLimit, boxHeight).lineWidth(line).stroke(lineColor);

  //doc.fontSize(smallFontSize).font(fontRegular).text('Local de Pagamento', startX + smallGutterX, startY + boxHeight + smallGutterY);

  //doc.fontSize(fontSize).font(fontBold).text(recibo.paymentPlace, startX + gutterX, startY + boxHeight + gutterY);

  doc
    .rect(startX, startY + boxHeight * 2, tableLimit * (2 / 4), boxHeight)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Cedente',
      startX + smallGutterX,
      startY + boxHeight * 2 + smallGutterY
    )

  doc
    .fontSize(8)
    .font(fontBold)
    .text(beneficiary, startX + 40, startY + boxHeight * 2 + smallGutterY)

  doc
    .fontSize(smallFontSize)
    .font(fontBold)
    .text(recibo.beneficiaryAddress, startX + 20, startY + boxHeight * 2 + 15)

  doc
    .rect(
      startX + tableLimit * (2 / 4),
      startY + boxHeight * 2,
      tableLimit * (1 / 4),
      boxHeight
    )
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Agência / Código do Cedente',
      startX + tableLimit * (2 / 4) + smallGutterX,
      startY + boxHeight * 2 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      `${recibo.agency}${recibo.agencyDigit} / ${account}${accountDigit}`,
      startX + tableLimit * (2 / 4) + 50,
      startY + boxHeight * 2 + gutterY
    )

  doc
    .rect(
      startX + tableLimit * (3 / 4),
      startY + boxHeight * 2,
      tableLimit * (1 / 4),
      boxHeight
    )
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Data de Vencimento',
      startX + tableLimit * (3 / 4) + smallGutterX,
      startY + boxHeight * 2 + smallGutterY
    )

  doc
    .fontSize(mediumFontSize)
    .font(fontBold)
    .text(
      formatDate(recibo.expirationDay),
      startX + tableLimit * (3 / 4) + 65,
      startY + boxHeight * 2 + 7
    )

  // Next line table
  doc
    .rect(startX, startY + boxHeight * 3, tableLimit * (1.5 / 10), boxHeight)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Data do Documento',
      startX + smallGutterX,
      startY + boxHeight * 3 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      formatDate(recibo.documentDate),
      startX + gutterX,
      startY + boxHeight * 3 + gutterY
    )

  doc
    .rect(
      startX + tableLimit * (1.5 / 10),
      startY + boxHeight * 3,
      tableLimit * (1.5 / 10),
      boxHeight
    )
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Data do Processamento',
      startX + tableLimit * (1.5 / 10) + smallGutterX,
      startY + boxHeight * 3 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      formatDate(recibo.processingDate),
      startX + tableLimit * (1.5 / 10) + gutterX,
      startY + boxHeight * 3 + gutterY
    )

  doc
    .rect(
      startX + tableLimit * (3 / 10),
      startY + boxHeight * 3,
      tableLimit * (0.6 / 10),
      boxHeight
    )
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Carteira',
      startX + tableLimit * (3 / 10) + smallGutterX,
      startY + boxHeight * 3 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      recibo.card,
      startX + tableLimit * (3 / 10) + gutterX,
      startY + boxHeight * 3 + gutterY
    )

  doc
    .rect(
      startX + tableLimit * (3.6 / 10),
      startY + boxHeight * 3,
      tableLimit * (2 / 10),
      boxHeight
    )
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'N° documento',
      startX + tableLimit * (3.6 / 10) + smallGutterX,
      startY + boxHeight * 3 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      recibo.documentNumber,
      startX + tableLimit * (3.6 / 10) + gutterX,
      startY + boxHeight * 3 + gutterY
    )

  doc
    .rect(
      startX + tableLimit * (5.6 / 10),
      startY + boxHeight * 3,
      tableLimit * (2.2 / 10),
      boxHeight
    )
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Nosso Número',
      startX + tableLimit * (5.6 / 10) + smallGutterX,
      startY + boxHeight * 3 + smallGutterY
    )

  doc
    .fontSize(mediumFontSize)
    .font(fontBold)
    .text(
      recibo.formatedOurNumber,
      startX + tableLimit * (5.6 / 10) + gutterX,
      startY + boxHeight * 3 + gutterY
    )

  doc
    .rect(
      startX + tableLimit * (7.8 / 10),
      startY + boxHeight * 3,
      tableLimit * (2.2 / 10),
      boxHeight
    )
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      '(=) Valor do documento',
      startX + tableLimit * (7.8 / 10) + smallGutterX,
      startY + boxHeight * 3 + smallGutterY
    )

  doc.fontSize(mediumFontSize).font(fontBold)

  var widthStringValue = doc.widthOfString(recibo.formatedValue)

  doc.text(
    recibo.formatedValue,
    startX + tableLimit - widthStringValue - 10,
    startY + boxHeight * 3 + 9
  )

  // New line
  doc
    .rect(startX, startY + boxHeight * 4, tableLimit * (1 / 5), boxHeight)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      '(-) Desconto / Abatimento',
      startX + smallGutterX,
      startY + boxHeight * 4 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      recibo.descountValue,
      startX + gutterX,
      startY + boxHeight * 4 + gutterY
    )

  doc
    .rect(
      startX + tableLimit * (1 / 5),
      startY + boxHeight * 4,
      tableLimit * (1 / 5),
      boxHeight
    )
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      '(-) Outras deduções',
      startX + tableLimit * (1 / 5) + smallGutterX,
      startY + boxHeight * 4 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      recibo.otherDiscounts,
      startX + tableLimit * (1 / 5) + gutterX,
      startY + boxHeight * 4 + gutterY
    )

  doc
    .rect(
      startX + tableLimit * (2 / 5),
      startY + boxHeight * 4,
      tableLimit * (1 / 5),
      boxHeight
    )
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      '(+) Mora / Multa',
      startX + tableLimit * (2 / 5) + smallGutterX,
      startY + boxHeight * 4 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      recibo.feeValue,
      startX + tableLimit * (2 / 5) + gutterX,
      startY + boxHeight * 4 + gutterY
    )

  doc
    .rect(
      startX + tableLimit * (3 / 5),
      startY + boxHeight * 4,
      tableLimit * (1 / 5),
      boxHeight
    )
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      '(-) Outros Acrécimos',
      startX + tableLimit * (3 / 5) + smallGutterX,
      startY + boxHeight * 4 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      recibo.outherFees,
      startX + tableLimit * (3 / 5) + gutterX,
      startY + boxHeight * 4 + gutterY
    )

  doc
    .rect(
      startX + tableLimit * (4 / 5),
      startY + boxHeight * 4,
      tableLimit * (1 / 5),
      boxHeight
    )
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      '(=) Valor cobrado',
      startX + tableLimit * (4 / 5) + smallGutterX,
      startY + boxHeight * 4 + smallGutterY
    )

  doc.fontSize(mediumFontSize).font(fontBold)

  var widthOfStringCharge = doc.widthOfString(recibo.chargeValue)

  doc.text(
    recibo.chargeValue,
    tableLimit - widthOfStringCharge + gutterX,
    startY + boxHeight * 4 + gutterY
  )

  // Payer info box
  doc
    .rect(startX, startY + boxHeight * 5, tableLimit, boxHeight * 3)
    .stroke(lineColor)

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Sacado',
      startX + smallGutterX,
      startY + boxHeight * 5 + smallGutterY
    )

  doc
    .fontSize(fontSize)
    .font(fontBold)
    .text(
      recibo.payer.name + ' - ' + recibo.payer.registerNumber,
      startX + 30,
      startY + boxHeight * 5 + 3
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      recibo.payer.street +
        ', ' +
        recibo.payer.number +
        ' ' +
        recibo.payer.complement +
        ' - ' +
        recibo.payer.district,
      startX + 30,
      startY + boxHeight * 5 + 13
    )

  doc
    .fontSize(fontSize)
    .font(fontRegular)
    .text(
      recibo.payer.city +
        ' - ' +
        recibo.payer.state +
        ' - CEP: ' +
        recibo.payer.postalCode,
      startX + 30,
      startY + boxHeight * 5 + 23
    )

  if (guarantor) {
    doc
      .fontSize(smallFontSize)
      .font(fontRegular)
      .text(
        'Sacador/Cedente',
        startX + smallGutterX,
        startY + boxHeight * 5 + 40
      )

    doc
      .fontSize(7)
      .font(fontRegular)
      .text(
        recibo.guarantor.name + ' - ' + recibo.guarantor.registerNumber,
        startX + 50,
        startY + boxHeight * 5 + 43
      )

    doc
      .fontSize(7)
      .font(fontRegular)
      .text(
        recibo.guarantor.street +
          ', ' +
          recibo.guarantor.number +
          ', ' +
          recibo.guarantor.district,
        startX + 50,
        startY + boxHeight * 5 + 53
      )

    doc
      .fontSize(7)
      .font(fontRegular)
      .text(
        recibo.guarantor.city +
          ' - ' +
          recibo.guarantor.state +
          ' - CEP: ' +
          recibo.guarantor.postalCode,
        startX + 50,
        startY + boxHeight * 5 + 63
      )
  }

  doc
    .fontSize(smallFontSize)
    .font(fontRegular)
    .text(
      'Autenticação Mecânica - Recibo',
      tableLimit - 70,
      startY + boxHeight * 8 + 5
    )
}
