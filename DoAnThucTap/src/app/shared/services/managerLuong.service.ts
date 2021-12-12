import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Luong } from '../../model/Account/luong.model'

const apiUrl = {
  urlGetAllLuong: 'luongs/getall',
  urlGetLuongDetail: 'luongs/getdetail/{0}',
  urlUpdateLuong: 'RegularExpression/regular-expression/update',
  urlDeleteById: 'RegularExpression/regular-expression/{0}',
};
@Injectable({
  providedIn: 'root',
})
export class LuongService {
  constructor(private httpClient: HttpClient) {}

  public getAllLuong() {
    return this.httpClient.get(apiUrl.urlGetAllLuong);
  }

//   public getRegularExpressionById(idRegex: number) {
//     const requestUrl = String.Format(apiUrl.urlGetRegularExpressionById, idRegex);
//     return this.httpClient.get(requestUrl);
//   }

//   public createRegularExpression(data: SuggestionRegular) {
//     return this.httpClient.post(apiUrl.urlCreateRegularExpression, data);
//   }

//   public importRegex(formData) {
//     return this.httpClient.post(apiUrl.urlImportRegex, formData);
//   }

//   public exportMultiTemplate(listId: number[]) {
//     return this.httpClient.post(apiUrl.urlExportMultipleRegex, listId, {
//       responseType: 'blob',
//     });
//   }

//   public deleteMultiTemplate(listId: number[]) {
//     return this.httpClient.post<boolean>(apiUrl.urlDeleteMultipleTemplate, listId);
//   }

//   public updateRegularExpression(data: SuggestionRegular) {
//     return this.httpClient.post(apiUrl.urlUpdateRegularExpression, data);
//   }

//   public deleteRegularExpression(idRegex: number) {
//     const requestUrl = String.Format(apiUrl.urlDeleteRegularExpressionById, idRegex);
//     return this.httpClient.get(requestUrl);
//   }
}
