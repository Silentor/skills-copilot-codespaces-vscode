// Description: Create a function that returns an object with the following properties: name, age, skills, addSkill, removeSkill, listSkills.
function skillsMember() {
    const skills = ['JavaScript', 'Python', 'Java', 'C++'];
    const member = {
        name: 'John Doe',
        age: 30,
        skills: skills,
        addSkill: function(skill) {
            this.skills.push(skill);
        },
        removeSkill: function(skill) {
            const index = this.skills.indexOf(skill);
            if (index > -1) {
                this.skills.splice(index, 1);
            }
        },
        listSkills: function() {
            return this.skills.join(', ');
        }
    };

    return member;
}