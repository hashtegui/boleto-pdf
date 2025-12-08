import path from 'path'
import PDFDocument from 'pdfkit'
import header from './sections/header.js'
import body from './sections/body.js'
import {barcode} from '../commons/utils/barcode.js'
import cutSeparator from '..//commons/utils/cut-separator.js'

export default function(bill) {
  return new Promise(function(resolve, reject) {
    var buffers = []
    var MARGIN = 25
    var realStartY = 170
    var doc = new PDFDocument({
      autoFirstPage: false
    })

    doc.addPage({
      size: 'A4',
      margin: MARGIN
    })

    //var filial = bill.filial
    //var fill = 'logos/motobrasil/filial'+filial+'.jpg'

    var config = {
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
      logo: path.join(__dirname, 'logos/logo-itau.jpg'),
      //logomarca: path.join(__dirname, fill),
      bodyStarY: realStartY + 25 * 10
    }

    console.log(path.join(__dirname, 'logos/logo-itau.jpg'))
    try {
      header(doc, bill, config)
      cutSeparator(doc, realStartY + 25 * 9 + 10)
      body(doc, bill, config)
      barcode(doc, MARGIN, realStartY + 25 * 24, bill.barcodeData)
    } catch (err) {
      reject(err)
    }

    doc.on('data', buffers.push.bind(buffers))
    doc.on('end', function() {
      var pdfData = Buffer.concat(buffers)
      resolve(pdfData)
    })

    doc.end()
  })
}
