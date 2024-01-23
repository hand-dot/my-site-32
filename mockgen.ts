import ts from 'typescript';
import prettier from 'prettier';
import fs from 'fs';
import path from 'path';

const dirPath = path.join(__dirname, '.wix/types/wix-code-types/dist/types/common');
const moduleFiles = [
    'wix-activity-counters.v2.d.ts',
    'wix-animations-frontend.d.ts',
    'wix-animations.d.ts',
    'wix-application-backend.d.ts',
    'wix-application.d.ts',
    'wix-auth.d.ts',
    'wix-authentication-management.v2.d.ts',
    'wix-billing-backend.d.ts',
    'wix-blog-backend.d.ts',
    'wix-bookings-backend.d.ts',
    'wix-bookings-frontend.d.ts',
    'wix-bookings.d.ts',
    'wix-bookings.v1.d.ts',
    'wix-bookings.v2.d.ts',
    'wix-business-tools.v2.d.ts',
    'wix-captcha-backend.d.ts',
    'wix-captcha.v2.d.ts',
    'wix-chat-backend.d.ts',
    'wix-comments.v2.d.ts',
    'wix-configs-backend.d.ts',
    'wix-crm-backend.d.ts',
    'wix-crm-frontend.d.ts',
    'wix-crm.d.ts',
    'wix-crm.v2.d.ts',
    'wix-dashboard.d.ts',
    'wix-data.d.ts',
    'wix-data.v2.d.ts',
    'wix-dataset.d.ts',
    'wix-ecom-backend.d.ts',
    'wix-ecom.v2.d.ts',
    'wix-editor.d.ts',
    'wix-email-marketing.v2.d.ts',
    'wix-events-backend.d.ts',
    'wix-events-frontend.d.ts',
    'wix-events.d.ts',
    'wix-events.v2.d.ts',
    'wix-fetch.d.ts',
    'wix-forms.v2.d.ts',
    'wix-forum-backend.d.ts',
    'wix-forum.v2.d.ts',
    'wix-groups-backend.d.ts',
    'wix-groups.v2.d.ts',
    'wix-http-functions.d.ts',
    'wix-inbox.v2.d.ts',
    'wix-location-frontend.d.ts',
    'wix-location.d.ts',
    'wix-loyalty.v2.d.ts',
    'wix-marketing-backend.d.ts',
    'wix-marketing-tags.v2.d.ts',
    'wix-marketing.v2.d.ts',
    'wix-media-backend.d.ts',
    'wix-media.v2.d.ts',
    'wix-members-backend.d.ts',
    'wix-members-frontend.d.ts',
    'wix-members.d.ts',
    'wix-members.v2.d.ts',
    'wix-notifications.v2.d.ts',
    'wix-packages.d.ts',
    'wix-paid-plans-backend.d.ts',
    'wix-paid-plans.d.ts',
    'wix-pay-backend.d.ts',
    'wix-pay-frontend.d.ts',
    'wix-pay.d.ts',
    'wix-payment-provider-backend.d.ts',
    'wix-pricing-plans-backend.d.ts',
    'wix-pricing-plans-frontend.d.ts',
    'wix-pricing-plans.d.ts',
    'wix-pricing-plans.v2.d.ts',
    'wix-pro-gallery-backend.d.ts',
    'wix-realtime-backend.d.ts',
    'wix-realtime-frontend.d.ts',
    'wix-realtime.d.ts',
    'wix-redirects-api.v1.d.ts',
    'wix-reviews.v2.d.ts',
    'wix-router.d.ts',
    'wix-search.d.ts',
    'wix-secrets-backend.d.ts',
    'wix-secrets-backend.v2.d.ts',
    'wix-seo-frontend.d.ts',
    'wix-seo.d.ts',
    'wix-site-backend.d.ts',
    'wix-site-frontend.d.ts',
    'wix-site.d.ts',
    'wix-storage-frontend.d.ts',
    'wix-storage.d.ts',
    'wix-stores-backend.d.ts',
    'wix-stores-frontend.d.ts',
    'wix-stores.d.ts',
    'wix-stores.v2.d.ts',
    'wix-table-reservations.v2.d.ts',
    'wix-users-backend.d.ts',
    'wix-users.d.ts',
    'wix-web-module.d.ts',
    'wix-widget.d.ts',
    'wix-window-frontend.d.ts',
    'wix-window.d.ts',
    'wix-workflows.v2.d.ts'
]

let fileContent = `import { beforeEach, vi } from 'vitest';

beforeEach(() => {
    vi.resetAllMocks();
});


`;


(async () => {
    for (const moduleFile of moduleFiles) {
        const filePath = path.join(dirPath, moduleFile);
        const sourceFile = ts.createSourceFile(
            filePath,
            fs.readFileSync(filePath).toString(),
            ts.ScriptTarget.Latest
        );

        let mocks = '';
        const visit = (node: ts.Node) => {
            if (ts.isFunctionDeclaration(node) && node.name) {
                const functionName = node.name.getText(sourceFile);
                mocks += `${functionName}: vi.fn(),\n`;
            } else if (ts.isPropertySignature(node) && node.name) {
                const propertyName = node.name.getText(sourceFile);
                mocks += `${propertyName}: vi.fn(),\n`;
            }
            ts.forEachChild(node, visit);
        };
        ts.forEachChild(sourceFile, visit);

        const moduleName = moduleFile.replace('.d.ts', '');
        const mockCode = `vi.mock('${moduleName}', () => ({__esModule: true,default: {${mocks}}}));`;
        const formattedCode = await prettier.format(mockCode, { parser: "typescript" });
        fileContent += formattedCode + '\n';
    }
    fs.writeFileSync(path.join(__dirname, 'test-setup.js'), fileContent);
})()