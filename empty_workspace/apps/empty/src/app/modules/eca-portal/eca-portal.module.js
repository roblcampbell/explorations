"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var eca_portal_component_1 = require("./eca-portal.component");
var EcaPortalModule = /** @class */ (function () {
    function EcaPortalModule() {
    }
    EcaPortalModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule
                    ],
                    declarations: [eca_portal_component_1.EcaPortalComponent],
                    exports: [eca_portal_component_1.EcaPortalComponent],
                },] },
    ];
    return EcaPortalModule;
}());
exports.EcaPortalModule = EcaPortalModule;
//# sourceMappingURL=eca-portal.module.js.map