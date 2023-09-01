import { getProjects } from "../components/pages/Projects/getProjects";

// Get Project
// Returns the list of projects with the following properties:
// Title, Description, Badges, Url, Github, Readmore
describe("Get Projects", () => {
    const result = getProjects();
    it("Sould Return an Array", () => {
        expect(Array.isArray(result)).toBe(true);
    });

    it("Should Return an Array with Length Greater than 0", () => {
        expect(result.length).toBeGreaterThan(0);
    });

    it("Should Have Title, Description and Badges Property", () => {
        const props = ["title", "description", "badges"];
        result.forEach((project) =>
            props.forEach((prop) => expect(project).toHaveProperty(prop))
        );
    });

    it("Should Have Unique Title Properties", () => {
        const titles = result.map((t) => t.title);
        const unique = new Set(titles);
        expect(titles.length).toBe(unique.size);
    });

    it("Should Have Valid GitHub and URL Strings if Provided", () => {
        const urlRegExp =
            /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
        result.forEach((project) => {
            if (project.github) expect(project.github).toMatch(urlRegExp);
            if (project.url) expect(project.url).toMatch(urlRegExp);
        });
    });

    it("Should Have a Badge Property of Array with at Least One Property", () => {
        result.forEach((project) => {
            expect(project.badges.length).toBeGreaterThan(0);
        });
    });
});
