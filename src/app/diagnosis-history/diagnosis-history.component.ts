import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { DiagnosisHistoryService } from '../services/diagnosis-history.service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import {MatSort} from '@angular/material/sort';

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
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns = ['Diagnosis', 'Diagnosis Date', 'Date Alerted'];
  expandedItem;
  deleteDiagnosisForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _diagnosisHistoryService: DiagnosisHistoryService, 
    private router: Router, private formBuilder: FormBuilder,
    private _route: ActivatedRoute, private _router: Router) { 

    this.deleteDiagnosisForm = this.formBuilder.group({
      deleteDiagnosis: new FormControl([])
    });
  }

  ngOnInit() {
    /* Retrieving Diagnosis History from Database */
    this._diagnosisHistoryService.getDiagnosis()
          .subscribe((res: any[]) => {
              console.log(res);
              if (res != null) {  // If the database is empty
                var sorted = res.sort(function(a, b) {
                  var a1 = 0;
                  var b1 = 0;
                  if (a["Diagnosis Date"]) {
                    a1 = Number(a["Diagnosis Date"].replace(/-/g, ""));
                  }
                  if (b["Diagnosis Date"]) {
                    b1 = Number(b["Diagnosis Date"].replace(/-/g, ""));
                  }
                  return b1 - a1
                });
                this.dataSource = new MatTableDataSource<any>(sorted);
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

  /* On Submit Functionality for Deleting Diagnosis */
  onSubmit() {
    /* Delete Diagnosis FormBuilder */
    this.deleteDiagnosisForm = this.formBuilder.group({
      deleteContact: new FormControl(
        this.expandedItem
      )
    });

    /* Calling Diagnosis Service */
    this._diagnosisHistoryService.deleteDiagnosis(this.expandedItem).subscribe(
      data => console.log('Success!', data),
      error => console.error('Error!', error)
    );

    console.log(this.expandedItem);
  }


}