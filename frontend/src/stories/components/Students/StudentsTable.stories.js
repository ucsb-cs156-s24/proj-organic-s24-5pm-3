import React from 'react';
import studentsTable from 'main/components/Students/StudentsTable';
import { studentsFixture } from 'fixtures/studentsFixtures';
import { currentUserFixtures } from 'fixtures/currentUserFixtures';
import { rest } from "msw";

export default {
    title: 'components/Students/StudentsTable',
    component: studentsTable
};

const Template = (args) => {
    return (
        <studentsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    students: []
};

export const ThreeItemsOrdinaryUser = Template.bind({});

ThreeItemsOrdinaryUser.args = {
    students: studentsFixture.threeStudents,
    currentUser: currentUserFixtures.userOnly,
};

export const ThreeItemsAdminUser = Template.bind({});
ThreeItemsAdminUser.args = {
    students: studentsFixture.threeStudents,
    currentUser: currentUserFixtures.adminUser,
}

ThreeItemsAdminUser.parameters = {
    msw: [
        rest.delete('/api/course/students/all', (req, res, ctx) => {
            window.alert("DELETE: " + JSON.stringify(req.url));
            return res(ctx.status(200),ctx.json({}));
        }),
    ]
};
