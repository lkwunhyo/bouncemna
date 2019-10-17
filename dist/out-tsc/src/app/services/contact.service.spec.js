import { TestBed } from '@angular/core/testing';
import { ContactService } from './contact.service';
describe('ContactService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ContactService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=contact.service.spec.js.map