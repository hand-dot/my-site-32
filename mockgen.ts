import ts from 'typescript';
import prettier from 'prettier';
import fs from 'fs';
import path from 'path';

/*
The current script has the following issues:
- The mock of the generated file is not complete.
- It does not correctly mock modules that are not default exports, such as `import { triggeredEmails } from 'wix-crm-backend'`.
- It fails to mock nested methods within the module while maintaining the correct nested structure.
*/ 

const dirPath = path.join(__dirname, '.wix/types/wix-code-types/dist/types/common');
const moduleFiles = [
    'wix-activity-counters.v2.d.ts',
    'wix-animations-frontend.d.ts',
    'wix-auth.d.ts',
    'wix-billing-backend.d.ts',
    'wix-blog-backend.d.ts',
    'wix-bookings-frontend.d.ts',
    'wix-bookings.v1.d.ts',
    'wix-bookings.v2.d.ts',
    'wix-bookings-backend.d.ts',
    'wix-business-tools.v2.d.ts',
    'wix-captcha.v2.d.ts',
    'wix-captcha-backend.d.ts',
    'wix-chat-backend.d.ts',
    'wix-comments.v2.d.ts',
    'wix-configs-backend.d.ts',
    'wix-crm-frontend.d.ts',
    'wix-crm.v2.d.ts',
    'wix-crm-backend.d.ts',
    'wix-dashboard.d.ts',
    'wix-data.d.ts',
    'wix-data.v2.d.ts',
    'wix-dataset.d.ts',
    'wix-ecom.v2.d.ts',
    'wix-ecom-backend.d.ts',
    'wix-email-marketing.v2.d.ts',
    'wix-events-frontend.d.ts',
    'wix-events.v2.d.ts',
    'wix-events-backend.d.ts',
    'wix-fetch.d.ts',
    'wix-forms.v2.d.ts',
    'wix-forum.v2.d.ts',
    'wix-forum-backend.d.ts',
    'wix-groups.v2.d.ts',
    'wix-groups-backend.d.ts',
    'wix-http-functions.d.ts',
    'wix-inbox.v2.d.ts',
    'wix-location-frontend.d.ts',
    'wix-loyalty.v2.d.ts',
    'wix-marketing-backend.d.ts',
    'wix-marketing.v2.d.ts',
    'wix-marketing-tags.v2.d.ts',
    'wix-media-backend.d.ts',
    'wix-media.v2.d.ts',
    'wix-members-frontend.d.ts',
    'wix-members.v2.d.ts',
    'wix-members-backend.d.ts',
    'wix-notifications.v2.d.ts',
    'wix-pay-frontend.d.ts',
    'wix-pay-backend.d.ts',
    'wix-pricing-plans-frontend.d.ts',
    'wix-pricing-plans.v2.d.ts',
    'wix-pricing-plans-backend.d.ts',
    'wix-pro-gallery-backend.d.ts',
    'wix-realtime-frontend.d.ts',
    'wix-realtime-backend.d.ts',
    'wix-reviews.v2.d.ts',
    'wix-router.d.ts',
    'wix-search.d.ts',
    'wix-secrets-backend.d.ts',
    'wix-secrets-backend.v2.d.ts',
    'wix-seo-frontend.d.ts',
    'wix-site-frontend.d.ts',
    'wix-site-backend.d.ts',
    'wix-storage-frontend.d.ts',
    'wix-stores-frontend.d.ts',
    'wix-stores.v2.d.ts',
    'wix-stores-backend.d.ts',
    'wix-table-reservations.v2.d.ts',
    'wix-web-module.d.ts',
    'wix-window-frontend.d.ts',
    'wix-editor.d.ts',
    'wix-widget.d.ts',
    'wix-application.d.ts',
    'wix-payment-provider-backend.d.ts',
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
        const visit = (node: ts.Node, depth: number = 0) => {
            // if (depth > 4) {
            //     return;
            // }

            const getNameIfPresent = (node: ts.Node): string => {
                return (node as any).name ? (node as any).name.getText(sourceFile) : '!';
            };

            const addMockIfApplicable = (condition: boolean, nodeName: string | null) => {
                if (condition && nodeName) {
                    mocks += `${nodeName}: vi.fn(),\n`;
                }
            };

            const nodeName = getNameIfPresent(node);
            addMockIfApplicable(ts.isFunctionDeclaration(node), nodeName);
            addMockIfApplicable(ts.isPropertySignature(node), nodeName);
            addMockIfApplicable(ts.isMethodSignature(node), nodeName);
            addMockIfApplicable(ts.isModuleDeclaration(node), nodeName);
            addMockIfApplicable(ts.isVariableDeclaration(node), nodeName);

            ts.forEachChild(node, childNode => visit(childNode, depth + 1));
        };
        ts.forEachChild(sourceFile, visit);

        const moduleName = moduleFile.replace('.d.ts', '');
        const mockCode = `vi.mock('${moduleName}', () => ({__esModule: true,default: {${mocks}}}));`;
        fileContent += mockCode + '\n';
    }
    const formattedCode = await prettier.format(fileContent, { parser: "typescript" });

    fs.writeFileSync(path.join(__dirname, 'test-setup.js'), formattedCode);
})()