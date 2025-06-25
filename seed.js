const mongoose = require('mongoose');
const User = require('./models/User');
const Project = require('./models/Project');
const Assignment = require('./models/Assignment');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/erms';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected for seeding'))
    .catch((err) => console.error('MongoDB connection error:', err));

const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Project.deleteMany({});
        await Assignment.deleteMany({});

        // Create users
        const users = await User.create([
            {
                email: 'john@company.com',
                name: 'John Smith',
                role: 'engineer',
                skills: ['React', 'Node.js', 'TypeScript'],
                seniority: 'senior',
                maxCapacity: 100,
                department: 'Frontend'
            },
            {
                email: 'sarah@company.com',
                name: 'Sarah Johnson',
                role: 'engineer',
                skills: ['Python', 'Django', 'PostgreSQL'],
                seniority: 'mid',
                maxCapacity: 100,
                department: 'Backend'
            },
            {
                email: 'mike@company.com',
                name: 'Mike Chen',
                role: 'engineer',
                skills: ['React', 'JavaScript', 'CSS'],
                seniority: 'junior',
                maxCapacity: 50,
                department: 'Frontend'
            },
            {
                email: 'lisa@company.com',
                name: 'Lisa Brown',
                role: 'manager',
                skills: ['Project Management', 'Agile'],
                seniority: 'senior',
                maxCapacity: 100,
                department: 'Management'
            }
        ]);

        // Create projects
        const projects = await Project.create([
            {
                name: 'E-commerce Platform',
                description: 'Build a modern e-commerce platform with React and Node.js',
                startDate: new Date('2024-01-01'),
                endDate: new Date('2024-06-30'),
                requiredSkills: ['React', 'Node.js', 'TypeScript'],
                teamSize: 5,
                status: 'active',
                managerId: users[3]._id
            },
            {
                name: 'Mobile App',
                description: 'Develop a cross-platform mobile app using React Native',
                startDate: new Date('2024-03-01'),
                endDate: new Date('2024-08-31'),
                requiredSkills: ['React Native', 'JavaScript'],
                teamSize: 3,
                status: 'planning',
                managerId: users[3]._id
            },
            {
                name: 'Data Analytics Dashboard',
                description: 'Create a dashboard for data visualization and analytics',
                startDate: new Date('2024-02-01'),
                endDate: new Date('2024-05-31'),
                requiredSkills: ['Python', 'Django', 'PostgreSQL'],
                teamSize: 4,
                status: 'active',
                managerId: users[3]._id
            }
        ]);

        // Create assignments
        await Assignment.create([
            {
                engineerId: users[0]._id,
                projectId: projects[0]._id,
                allocationPercentage: 60,
                startDate: new Date('2024-01-01'),
                endDate: new Date('2024-06-30'),
                role: 'Tech Lead'
            },
            {
                engineerId: users[0]._id,
                projectId: projects[1]._id,
                allocationPercentage: 40,
                startDate: new Date('2024-03-01'),
                endDate: new Date('2024-08-31'),
                role: 'Developer'
            },
            {
                engineerId: users[1]._id,
                projectId: projects[2]._id,
                allocationPercentage: 80,
                startDate: new Date('2024-02-01'),
                endDate: new Date('2024-05-31'),
                role: 'Backend Developer'
            },
            {
                engineerId: users[2]._id,
                projectId: projects[0]._id,
                allocationPercentage: 50,
                startDate: new Date('2024-01-01'),
                endDate: new Date('2024-06-30'),
                role: 'Frontend Developer'
            }
        ]);

        console.log('Seed data created successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData(); 