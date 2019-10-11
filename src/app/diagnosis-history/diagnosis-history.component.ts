import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { DiagnosisHistoryService } from '../services/diagnosis-history.service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-diagnosis-history',
  templateUrl: './diagnosis-history.component.html',
  styleUrls: ['./diagnosis-history.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DiagnosisHistoryComponent implements OnInit {

  //dataSource = [];
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns = ['Diagnosis', 'Diagnosis Date', 'Date Alerted'];//, 'Anonymity'];
  //displayedColumns = ['diagnosis', 'datediagnosed', 'datesent'];
  expandedItem;
  deleteDiagnosisForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _diagnosisHistoryService: DiagnosisHistoryService, 
    private router: Router, private formBuilder: FormBuilder,
    private _route: ActivatedRoute, private _router: Router) { 

    this.deleteDiagnosisForm = this.formBuilder.group({
      deleteDiagnosis: new FormControl([])
    });
  }

  ngOnInit() {
    //this.dataSource.paginator = this.paginator;

    this._diagnosisHistoryService.getDiagnosis()
          .subscribe((res: any[]) => {
              console.log("Diagnosis: " + res);
              if (res != null) {  // If the database is empty
                this.dataSource = new MatTableDataSource<any>(res);
              }
              setTimeout(() => this.dataSource.paginator = this.paginator);
          });
  }

  navigateToParam(itemId: number){
    // changes the route without moving from the current view or
    // triggering a navigation event,
    console.log("logged id: ", itemId);
    this._router.navigate([], {
     relativeTo: this._route,
     queryParams: {
       alertid: String(itemId)
     },
     queryParamsHandling: 'merge',
   });
  }

  onSubmit() {
    this.deleteDiagnosisForm = this.formBuilder.group({
      deleteContact: new FormControl(
        this.expandedItem
      )
    });
    this._diagnosisHistoryService.deleteDiagnosis(this.expandedItem).subscribe(
      data => console.log('Success!', data),
      error => console.error('Error!', error)
    );

    console.log(this.expandedItem);
    //console.log(this.expandedItem.alertid);
  }


}
/*
export interface Diagnosis {
  startdate: string;
  diagnosis: string;
  enddate: string;
  abstinencedate: string;
}

const DIAGNOSIS_DATA: Diagnosis[] = [
  {startdate: '12/05/2019', diagnosis: 'Gonorrhoea', enddate: '12/11/2019', abstinencedate: '12/03/2020'},
  {startdate: '12/05/2015', diagnosis: 'Chlamydia', enddate: '12/11/2016', abstinencedate: '12/03/2017'},
  {startdate: '12/05/2012', diagnosis: 'Genital Herpes', enddate: '12/11/2013', abstinencedate: '12/03/2014'},
  {startdate: '12/05/2011', diagnosis: 'Genital Warts', enddate: '12/11/2012', abstinencedate: '12/03/2012'},
  {startdate: '12/05/2010', diagnosis: 'Syphilis', enddate: '12/11/2019', abstinencedate: '12/03/2011'},
  {startdate: '12/05/2007', diagnosis: 'Hepatitis B', enddate: '12/11/2016', abstinencedate: '12/03/2008'},
  {startdate: '12/05/2002', diagnosis: 'AIDS', enddate: '12/11/2013', abstinencedate: '12/03/2003'},
  {startdate: '12/05/2000', diagnosis: 'HIV', enddate: '12/11/2012', abstinencedate: '12/03/2001'}
];
*/
