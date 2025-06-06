import { Bootstrap } from "./infrastructure/bootstrap";

(async () => {
  await new Bootstrap().startApp();
})();