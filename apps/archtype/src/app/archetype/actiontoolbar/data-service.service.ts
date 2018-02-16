import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataServiceService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  _baseUrl: string = '';

  // For Using Fake API by Using It's URL
  constructor(private http: Http) {
    this._baseUrl = 'https://jsonplaceholder.typicode.com/';
  }

  MyDataSource: any = [
    {
      'account_code': '200',
      'account_name': 'Sales',
      'account_details': 'Income from any bu...',
      'account_group': 'Income',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '260',
      'account_name': 'Other Revenue',
      'account_details': 'Any other income that does...',
      'account_group': 'Income',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '270',
      'account_name': 'Interest Income',
      'account_details': 'Interest Income',
      'account_group': 'Income',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '310',
      'account_name': 'Cost of Goods Sold',
      'account_details': 'Cost of goods sold by',
      'account_group': 'Cost of Goods Sold',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '400',
      'account_name': 'Advertising',
      'account_details': 'Expenses incurred for adve...',
      'account_group': 'Expense',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '404',
      'account_name': 'Bank Fees',
      'account_details': 'Fees charged by your bank...',
      'account_group': 'Expense',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '408',
      'account_name': 'Cleaning',
      'account_details': 'Expenses incurred for clea...',
      'account_group': 'Expense',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '310',
      'account_name': 'Cost of Goods Sold',
      'account_details': 'Cost of goods sold by',
      'account_group': 'Cost of Goods Sold',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '400',
      'account_name': 'Advertising',
      'account_details': 'Expenses incurred for adve...',
      'account_group': 'Expense',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '404',
      'account_name': 'Bank Fees',
      'account_details': 'Fees charged by your bank...',
      'account_group': 'Expense',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '408',
      'account_name': 'Cleaning',
      'account_details': 'Expenses incurred for clea...',
      'account_group': 'Expense',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '310',
      'account_name': 'Cost of Goods Sold',
      'account_details': 'Cost of goods sold by',
      'account_group': 'Cost of Goods Sold',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '400',
      'account_name': 'Advertising',
      'account_details': 'Expenses incurred for adve...',
      'account_group': 'Expense',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '404',
      'account_name': 'Bank Fees',
      'account_details': 'Fees charged by your bank...',
      'account_group': 'Expense',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '408',
      'account_name': 'Cleaning',
      'account_details': 'Expenses incurred for clea...',
      'account_group': 'Expense',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '310',
      'account_name': 'Cost of Goods Sold',
      'account_details': 'Cost of goods sold by',
      'account_group': 'Cost of Goods Sold',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '400',
      'account_name': 'Advertising',
      'account_details': 'Expenses incurred for adve...',
      'account_group': 'Expense',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '404',
      'account_name': 'Bank Fees',
      'account_details': 'Fees charged by your bank...',
      'account_group': 'Expense',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '408',
      'account_name': 'Cleaning',
      'account_details': 'Expenses incurred for clea...',
      'account_group': 'Expense',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '310',
      'account_name': 'Cost of Goods Sold',
      'account_details': 'Cost of goods sold by',
      'account_group': 'Cost of Goods Sold',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '400',
      'account_name': 'Advertising',
      'account_details': 'Expenses incurred for adve...',
      'account_group': 'Expense',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '404',
      'account_name': 'Bank Fees',
      'account_details': 'Fees charged by your bank...',
      'account_group': 'Expense',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '408',
      'account_name': 'Cleaning',
      'account_details': 'Expenses incurred for clea...',
      'account_group': 'Expense',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '310',
      'account_name': 'Cost of Goods Sold',
      'account_details': 'Cost of goods sold by',
      'account_group': 'Cost of Goods Sold',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '400',
      'account_name': 'Advertising',
      'account_details': 'Expenses incurred for adve...',
      'account_group': 'Expense',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '404',
      'account_name': 'Bank Fees',
      'account_details': 'Fees charged by your bank...',
      'account_group': 'Expense',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    },
    {
      'account_code': '408',
      'account_name': 'Cleaning',
      'account_details': 'Expenses incurred for clea...',
      'account_group': 'Expense',
      'master_type': 'General Ledger',
      'balance': '10000.00',
      'status': 'Active'

    }
  ];

  // To fill the Datatable for Default Table [Dummy Data]
  public GetAllRecords() {
    return this.http.get(this._baseUrl + 'posts')
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  // To fill the Datatable with Comments [Dummy Data]
  public GetAllComments() {
    return this.http.get(this._baseUrl + 'comments')
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  // To fill the Datatable with Photos [Dummy Data]
  public GetAllPhotos() {
    return this.http.get(this._baseUrl + 'albums/1/photos')
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  // To fill the Datatable with Albums [Dummy Data]
  public GetAllAlbums() {
    return this.http.get(this._baseUrl + 'albums')
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.handleError);
  }

  // To fill the Datatable with Todos [Dummy Data]
  public GetAllTodos() {
    return this.http.get(this._baseUrl + 'todos')
      .map((res: Response) => {
        return this.MyDataSource;
      })
      .catch(this.handleError);

    // return this.MyDataSource;
  }

  // To provide error description - Manav
  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
