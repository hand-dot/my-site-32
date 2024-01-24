import members from 'wix-members-backend';
import crm from 'wix-crm-backend';

export const emailCurrentMember = async (emailId) => {
    const member = await members.currentMember.getMember({ fieldsets: ['FULL'] })
    const memberId = member._id;
    const options = {
        variables: {
            firstName: member.contactDetails.firstName,
            lastName: member.contactDetails.lastName,
        }
    }

    return crm.triggeredEmails.emailMember(emailId, memberId, options);
}
