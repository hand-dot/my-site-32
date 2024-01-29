import { currentMember } from 'wix-members-backend';
import { triggeredEmails } from 'wix-crm-backend';

export const emailCurrentMember = async (emailId) => {
    const member = await currentMember.getMember({ fieldsets: ['FULL'] })
    const memberId = member._id;
    const options = {
        variables: {
            firstName: member.contactDetails.firstName,
            lastName: member.contactDetails.lastName,
        }
    }

    return triggeredEmails.emailMember(emailId, memberId, options);
}
