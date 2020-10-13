import { saveAs } from 'file-saver';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { from, ObservableInput } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorService {
  constructor(private http: HttpClient) {}

  generate(data) {
    this.http
      .get('/assets/certificate.pdf', { responseType: 'arraybuffer' })
      .pipe(
        catchError(this.handleError),
        switchMap((pdfBuffer: ArrayBuffer) =>
          from(PDFDocument.load(pdfBuffer))
        ),
        switchMap(async (doc: PDFDocument) => {
          const font = await doc.embedFont(StandardFonts.Helvetica);
          const page = doc.getPage(0);
          const draw = ((p, f) => (text, x, y) => {
            p.drawText(text, {
              x,
              y,
              size: 11,
              font: f,
              color: rgb(1, 0, 0),
            });
          })(page, font);

          draw('Hello World', 105, 650);
          draw('Hello Motto', 105, 630);

          return doc.save();
        })
      )
      .subscribe((pdfBytes) => {
        saveAs(new Blob([pdfBytes]), 'attestation.pdf');
      });
  }

  private handleError(err): ObservableInput<any> {
    console.log(err);
    return err;
  }
}
