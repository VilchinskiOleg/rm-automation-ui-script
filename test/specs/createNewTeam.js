
describe('Create_new_Team_in_Responsibility_Management', () => {

    const manageTeamsWebPageIdPrefix = '#application-TeamAsResponsible-maintain-component---';
    const teamData = require("../data/inputData.json");

    it('Go_to_Menage_Teams_and_Responsibility', async () => {

        await browser.url(teamData.targetResponsibleUrl);
        const goToMenageTeamsAndResponsibilityLink = await $('#__tile9');
        await goToMenageTeamsAndResponsibilityLink.click();
    });

    it('Go_to_create_new_Team_window', async () => {

        const createBtn = await $(manageTeamsWebPageIdPrefix + 'ListPageView--teamCreate');
        await createBtn.click();
    });

    it('Fill_General_Information', async () => {

        const globalIdInput = await $(manageTeamsWebPageIdPrefix + 'ObjectPage--teamGlblInput-inner');
        const descriptionInput = await $(manageTeamsWebPageIdPrefix + 'ObjectPage--teamDescInput-inner');
        await globalIdInput.setValue(teamData.generalInformation.globalID);
        await descriptionInput.setValue(teamData.generalInformation.description);

        // choose team Status:
        const applyPopup = await $(manageTeamsWebPageIdPrefix + 'ObjectPage--statusSelect-arrow');
        await applyPopup.click();
        const statusPopup = await $('#__list16').$('li=' + teamData.generalInformation.status);
        await statusPopup.click();

        // choose team Type:
        const typeInput = await $(manageTeamsWebPageIdPrefix + 'ObjectPage--teamTypeInput-vhi');
        await typeInput.click();
        const searchTypeInput = await $('#__field0-I');
        await searchTypeInput.setValue(teamData.generalInformation.type);
        const searchTypeBtn = await $('#__field0-search');
        await searchTypeBtn.click();
        await browser.pause(500);
        const rowResult = await $('#__dialog0-table-table').$('tbody').$$('tr')[0];
        await rowResult.click();
    });

    it('Scroll_down_to_Responsibility_Definitions', async () => {

        await $(manageTeamsWebPageIdPrefix + 'ObjectPage--teamRespyDef-title').scrollIntoView();
    });

    it('Fill_Responsibility_Definitions', async () => {

        const plantInput = await $(manageTeamsWebPageIdPrefix + 'ObjectPage--multiInput-application-TeamAsResponsible-maintain-component---ObjectPage--attributeTable-0-inner');
        const companyCodeInput = await $(manageTeamsWebPageIdPrefix + 'ObjectPage--multiInput-application-TeamAsResponsible-maintain-component---ObjectPage--attributeTable-1-inner');
        await plantInput.setValue(teamData.responsibilityDefinitions.plant);
        await companyCodeInput.setValue(teamData.responsibilityDefinitions.companyCode);
    });

    it('Scroll_down_to_Team_Owners', async () => {

        await $(manageTeamsWebPageIdPrefix + 'ObjectPage--teamOwner-title').scrollIntoView();
    });

    it('Add_Owners', async () => {

        const createOwnerBtn = await $(manageTeamsWebPageIdPrefix + 'ObjectPage--teamOwnerCreate');
        await createOwnerBtn.click();
        const ownerKeys = teamData.teamOwnersKeys;
        for (const ownerKey of ownerKeys) {
            const searchOwnerInput = await $('#__field1-I');
            await searchOwnerInput.setValue(ownerKey);
            const searchOwnerBtn = await $('#__field1-search');
            await searchOwnerBtn.click();

            await browser.pause(500);

            const rowResult = await $('#__dialog1-table-table').$('tbody').$$('tr')[0];
            await rowResult.click();
        }
        let saveOwnersBtn = await $('#__dialog1-ok');
        await saveOwnersBtn.click();
    });

    it('Add_Members_and_Functions_for_them', async () => {

        const members = teamData.teamMembers;
        let dialogWindowIndex = 2;
        let memberRowIndex = 0;

        for (const member of members) {

            const createMemberBtn = await $(manageTeamsWebPageIdPrefix + 'ObjectPage--teamMemberCreate');
            await createMemberBtn.click();
            const searchMemberInput = await $('#__field' + dialogWindowIndex + '-I');
            await searchMemberInput.setValue(member.displayName);
            const searchMemberBtn = await $('#__field' + dialogWindowIndex + '-search');
            await searchMemberBtn.click();

            await browser.pause(500);

            const rowResult = await $('#__dialog' + dialogWindowIndex + '-table-table').$('tbody').$$('tr')[0];
            await rowResult.click();

            const saveMemberBtn = await $('#__dialog' + dialogWindowIndex + '-ok');
            await saveMemberBtn.click();
            ++dialogWindowIndex;

            // add fun for member:
            const memberRow = await $(manageTeamsWebPageIdPrefix + 'ObjectPage--idTeamsMemberTable-listUl').$('tbody').$$('tr')[memberRowIndex++];
            const inputFunCell = await memberRow.$$('td')[4];
            await inputFunCell.click()

            await browser.pause(500);

            const allFunRows = await $('#__dialog' + dialogWindowIndex + '-table-table').$('tbody').$$('tr');
            for (const row of allFunRows) {
                const funName = await row.$$('td')[0].$('div').$('span').getText();
                if (member.functions.includes(funName)) await row.click();
            }

            let saveFunBtn = await $('#__dialog' + dialogWindowIndex + '-ok');
            await saveFunBtn.click();
            ++dialogWindowIndex;
        }
    });

    it('Save_Team', async () => {

        const saveTeamBtn = await $(manageTeamsWebPageIdPrefix + 'ObjectPage--objectPageSave')
        await saveTeamBtn.click();
    });
});