import { Component, OnInit, ViewChild } from '@angular/core';
import { SexualHistoryService } from '../services/sexual-history.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-sexual-history',
  templateUrl: './sexual-history.component.html',
  styleUrls: ['./sexual-history.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class SexualHistoryComponent implements OnInit {

  public activitylist = [];
  public partnerslist = [];
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns = ['dateEncounter'];
  expandedItem;
  deleteActivityForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(private _sexualHistoryService: SexualHistoryService,
    private router: Router, private formBuilder: FormBuilder,
    private _route: ActivatedRoute, private _router: Router
    ) {
    this.deleteActivityForm = this.formBuilder.group({
      deleteDiagnosis: new FormControl([])
    });
  }

  public convertDate(date) {
    var sqlDate = new Date(date);
    return (sqlDate.getMonth() + 1) + '/' + sqlDate.getDate() + '/' + sqlDate.getFullYear();
  }

  ngOnInit() {
    this._sexualHistoryService.getActivity()
          .subscribe((res: any[]) => {
              console.log(res);
              //this.activitylist = res;

              if (res != null) {  // If the database is empty
                this.dataSource = new MatTableDataSource<any>(res);
              }
              setTimeout(() => this.dataSource.paginator = this.paginator);

          });
    
  }

  onSubmit() {
    this.deleteActivityForm = this.formBuilder.group({
      deleteActivity: new FormControl(
        this.expandedItem
      )
    });
    this._sexualHistoryService.deleteactivity(this.expandedItem).subscribe(
      data => {
        console.log('Success!', data);
        location.reload();
      },
      error => console.error('Error!', error)
    );

    //console.log(this.expandedItem[0]);
  }

}
