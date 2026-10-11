import config from "@payload-config";
import { getPayload } from "payload";
import { seedExistingContent } from "../src/cms/seed";

// npm run cms:seed – spielt die Beiträge der Altseite ein, falls das CMS noch leer ist
const payload = await getPayload({ config });
await seedExistingContent(payload);
process.exit(0);
