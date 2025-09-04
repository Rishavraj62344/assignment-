export const DESIGNATION_OPTIONS = [
    { value: '1', label: 'Developer' },
    { value: '2', label: 'Manager' },
    { value: '3', label: 'System Admin' },
    { value: '4', label: 'Team Lead' },
    { value: '5', label: 'PM' },
] as const;

export const SKILL_OPTIONS = [
    'Java',
    'Angular',
    'CSS',
    'HTML',
    'JavaScript',
    'UI',
    'SQL',
    'React',
    'PHP',
    'GIT',
    'AWS',
    'Python',
    'Django',
    'C',
    'C++',
    'C#',
    'Unity',
    'R',
    'AI',
    'NLP',
    'Photoshop',
    'Node.js',
] as const;

export const MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
] as const;

export const YEARS = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);
