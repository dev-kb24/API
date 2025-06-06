"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bootstrap_1 = require("./infrastructure/bootstrap");
(async () => {
    await new bootstrap_1.Bootstrap().startApp();
})();
