import { TestBed } from '@angular/core/testing';
import { ContactFormService } from './contact-form.service';
describe('ContactFormService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ContactFormService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=contact-form.service.spec.js.map