import { async, TestBed } from '@angular/core/testing';
import { DiagnosisHistoryComponent } from './diagnosis-history.component';
describe('DiagnosisHistoryComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [DiagnosisHistoryComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(DiagnosisHistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=diagnosis-history.component.spec.js.map