import path from 'path'
import PDFDocument from 'pdfkit'
import {barcode} from '../commons/utils/barcode'
import cutSeparator from '../commons/utils/cut-separator'

import body from './sections/body'
import header from './sections/header'

export default function (bill) {
  return new Promise((resolve, reject) => {
    const buffers = []
    const MARGIN = 25
    const realStartY = 110
    const doc = new PDFDocument({
      autoFirstPage: false
    })
    doc.addPage({
      size: 'A4',
      margin: MARGIN
    })

    const config = {
      startY: realStartY,
      startX: MARGIN,
      smallGutterY: 3,
      smallGutterX: 3,
      line: 0.3,
      tableLimit: doc.page.width - MARGIN - MARGIN,
      lineColor: '#000',
      boxHeight: 25,
      gutterX: 10,
      gutterY: 12,
      smallFontSize: 5.8,
      fontSize: 9,
      largefontSize: 12,
      mediumFontSize: 11,
      fontBold: path.join(__dirname, 'fonts/roboto-regular.ttf'),
      fontRegular: path.join(__dirname, 'fonts/roboto-regular.ttf'),
      logo: path.join(__dirname, 'logos/logo-bb.png'),
      bodyStarY: realStartY + 25 * 13
    }

    try {
      header(doc, bill, config)
      cutSeparator(doc, realStartY + 25 * 12 + 10)
      body(doc, bill, config)
      barcode(doc, MARGIN, realStartY + 25 * 27, bill.barcodeData)
    } catch (err) {
      reject(err)
    }

    doc.on('data', buffers.push.bind(buffers))
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers)
      resolve(pdfData)
    })

    doc.end()
  })
}
