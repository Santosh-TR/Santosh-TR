/**
 * 🌱 Seed Script - Add Sample Skills to Sanity
 * Run: node --env-file=.env.local scripts/seed-skills.js
 */

import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    token: process.env.SANITY_API_TOKEN, // You'll need to add this
    useCdn: false,
});

// Sample Skills Data
const sampleSkills = [
    {
        _type: 'skill',
        name: 'React',
        category: 'frontend',
        proficiency: 95,
        yearsExperience: 5,
        description: 'Expert in React 18+ with hooks, context, and performance optimization. Built 20+ production apps.',
        order: 1,
    },
    {
        _type: 'skill',
        name: 'TypeScript',
        category: 'frontend',
        proficiency: 92,
        yearsExperience: 4,
        description: 'Strong typing, generics, and advanced TypeScript patterns for scalable applications.',
        order: 2,
    },
    {
        _type: 'skill',
        name: 'Next.js',
        category: 'frontend',
        proficiency: 90,
        yearsExperience: 3,
        description: 'Full-stack Next.js development with App Router, SSR, ISR, and API routes.',
        order: 3,
    },
    {
        _type: 'skill',
        name: 'Node.js',
        category: 'backend',
        proficiency: 85,
        yearsExperience: 4,
        description: 'Backend development with Express, REST APIs, authentication, and database integration.',
        order: 4,
    },
    {
        _type: 'skill',
        name: 'GSAP',
        category: 'tools',
        proficiency: 80,
        yearsExperience: 2,
        description: 'Advanced animations with GSAP, ScrollTrigger, and timeline-based interactions.',
        order: 5,
    },
    {
        _type: 'skill',
        name: 'Tailwind CSS',
        category: 'design',
        proficiency: 88,
        yearsExperience: 3,
        description: 'Utility-first CSS with custom configurations, dark mode, and responsive design.',
        order: 6,
    },
    {
        _type: 'skill',
        name: 'JavaScript',
        category: 'frontend',
        proficiency: 93,
        yearsExperience: 6,
        description: 'ES6+, async/await, functional programming, and modern JavaScript patterns.',
        order: 7,
    },
];

async function seedSkills() {
    console.log('🌱 Starting skill seed...\n');

    try {
        // Create all skills
        const createdSkills = [];

        for (const skill of sampleSkills) {
            console.log(`Creating: ${skill.name}...`);
            const result = await client.create(skill);
            createdSkills.push(result);
            console.log(`✅ Created: ${skill.name} (${result._id})\n`);
        }

        // Now add relationships (related skills)
        console.log('\n🔗 Adding skill relationships...\n');

        // Find skill IDs
        const reactId = createdSkills.find(s => s.name === 'React')?._id;
        const tsId = createdSkills.find(s => s.name === 'TypeScript')?._id;
        const nextId = createdSkills.find(s => s.name === 'Next.js')?._id;
        const nodeId = createdSkills.find(s => s.name === 'Node.js')?._id;
        const jsId = createdSkills.find(s => s.name === 'JavaScript')?._id;
        const tailwindId = createdSkills.find(s => s.name === 'Tailwind CSS')?._id;

        // Add relationships
        const relationships = [
            { id: reactId, related: [tsId, nextId, jsId] },
            { id: tsId, related: [reactId, nextId, nodeId] },
            { id: nextId, related: [reactId, tsId, nodeId] },
            { id: nodeId, related: [tsId, jsId] },
            { id: jsId, related: [reactId, tsId] },
        ];

        for (const rel of relationships) {
            if (rel.id && rel.related.every(id => id)) {
                await client
                    .patch(rel.id)
                    .set({
                        relatedSkills: rel.related.map(id => ({
                            _type: 'reference',
                            _ref: id,
                        })),
                    })
                    .commit();
                console.log(`✅ Added relationships for: ${createdSkills.find(s => s._id === rel.id)?.name}`);
            }
        }

        console.log('\n✨ Seed completed successfully!');
        console.log(`\nCreated ${createdSkills.length} skills with connections.`);
        console.log('\n🔗 View at: http://localhost:3001/studio');
        console.log('👀 See live: http://localhost:3001\n');

    } catch (error) {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    }
}

// Run seed
seedSkills();
